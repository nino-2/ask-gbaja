import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

function limiter(perMinute: number, prefix: string) {
  return redis
    ? new Ratelimit({ redis, prefix, limiter: Ratelimit.slidingWindow(perMinute, '1 m') })
    : null;
}

const general = limiter(20, 'rl:general');
const ai = limiter(6, 'rl:ai'); // AI answers cost money, so they get a tighter limit

export async function allowed(key: string) {
  return general ? (await general.limit(key)).success : true;
}

export async function allowedAi(key: string) {
  return ai ? (await ai.limit(key)).success : true;
}
