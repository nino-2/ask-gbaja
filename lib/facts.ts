import { db } from './db';
import { answerHash } from './hash';
import { Answer } from './types';

/**
 * Returns the human-reviewed answer for a topic. Falls back to English (and says so)
 * if the chosen language has no approved text yet.
 */
export async function getReviewedAnswer(slug: string, lang: string): Promise<Answer> {
  const { data } = await db
    .from('topic_texts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'approved')
    .in('lang', [lang, 'en']);

  const row = data?.find((r) => r.lang === lang) ?? data?.find((r) => r.lang === 'en');
  if (!row) return { found: false };

  // Audio plays only if a person approved it AND it reads exactly this version of the text.
  const { data: clip } = await db
    .from('voice_clips')
    .select('audio_url, voice_label')
    .eq('slug', slug)
    .eq('lang', row.lang)
    .eq('text_hash', answerHash(row.lang, row.answer))
    .eq('status', 'approved')
    .maybeSingle();

  return {
    found: true,
    fallback: row.lang !== lang,
    text: row.answer,
    sources: [{ label: row.source_label, url: row.source_url, date: row.verified_on }],
    audio: clip?.audio_url,
    voiceBy: clip?.voice_label,
  };
}
