/**
 * Creates audio for every approved answer that does not have a clip yet.
 * New clips are saved as 'pending'. Nothing plays on the site until a person listens
 * and approves it (see README).
 *
 * Run:  npm run audio
 */
import { db } from '../lib/db';
import { answerHash } from '../lib/hash';
import { synthesize } from '../lib/tts';

const DEFAULT_LABEL = 'AI-generated voice, approved by Femi Gbajabiamila’s office';

async function main() {
  const consentRef = process.env.VOICE_CONSENT_REF;

  if (!consentRef) {
    console.error(
      'Set VOICE_CONSENT_REF in .env.local to a reference for the signed permission ' +
        '(for example "Consent letter, 12 Nov 2026"). Audio is not generated without it.',
    );
    process.exit(1);
  }

  const label = process.env.VOICE_LABEL ?? DEFAULT_LABEL;

  // Safe to run repeatedly: an existing bucket just returns an error we ignore.
  await db.storage.createBucket('voice', { public: true });

  const { data: rows, error } = await db
    .from('topic_texts')
    .select('slug, lang, answer')
    .eq('status', 'approved');

  if (error) throw error;

  for (const row of rows ?? []) {
    const hash = answerHash(row.lang, row.answer);

    const { data: existing } = await db
      .from('voice_clips')
      .select('id')
      .eq('slug', row.slug)
      .eq('lang', row.lang)
      .eq('text_hash', hash)
      .maybeSingle();

    if (existing) continue;

    const audio = await synthesize(row.answer);
    const path = `${row.slug}/${row.lang}-${hash.slice(0, 12)}.mp3`;

    const upload = await db.storage
      .from('voice')
      .upload(path, audio, { contentType: 'audio/mpeg', upsert: true });
    if (upload.error) throw upload.error;

    const { data: publicFile } = db.storage.from('voice').getPublicUrl(path);

    const { error: insertError } = await db.from('voice_clips').insert({
      slug: row.slug,
      lang: row.lang,
      text_hash: hash,
      audio_url: publicFile.publicUrl,
      provider: 'elevenlabs',
      voice_label: label,
      consent_ref: consentRef,
    });
    if (insertError) throw insertError;

    console.log(`Created (pending approval): ${path}`);
  }

  console.log('Done. Listen to the clips, then approve them in Supabase.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
