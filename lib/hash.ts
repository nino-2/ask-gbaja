import { createHash } from 'node:crypto';

/**
 * Fingerprint of an approved answer. A voice clip only plays if its fingerprint matches
 * the current text, so editing an answer automatically retires its old audio.
 */
export function answerHash(lang: string, text: string) {
  return createHash('sha256').update(`${lang}:${text}`).digest('hex');
}
