/**
 * Text-to-speech provider. Only ever used with a voice that its owner has authorised.
 * Swap this one function to change provider (check the provider supports Yorùbá, Hausa and Igbo).
 */
export async function synthesize(text: string): Promise<Buffer> {
  const {
    TTS_API_KEY,
    TTS_VOICE_ID,
    TTS_MODEL_ID = 'eleven_multilingual_v2',
  } = process.env;

  if (!TTS_API_KEY || !TTS_VOICE_ID) {
    throw new Error('Set TTS_API_KEY and TTS_VOICE_ID in .env.local');
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${TTS_VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': TTS_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({ text, model_id: TTS_MODEL_ID }),
  });

  if (!res.ok) {
    throw new Error(`Text-to-speech failed (${res.status}): ${await res.text()}`);
  }

  return Buffer.from(await res.arrayBuffer());
}
