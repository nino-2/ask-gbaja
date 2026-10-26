// import { NextResponse } from 'next/server';
// import { aiEnabled, answerWithAi } from '@/lib/ai';
// import { db } from '@/lib/db';
// import { getReviewedAnswer } from '@/lib/facts';
// import { allowed, allowedAi } from '@/lib/limit';
// import { Answer } from '@/lib/types';

// const LANGS = ['en', 'pcm', 'yo', 'ha', 'ig'];
// const DAILY_AI_CAP = Number(process.env.AI_DAILY_CAP ?? 2000);

// /** Hard stop on spend: no more AI answers today once the cap is reached. */
// async function underDailyCap() {
//   const startOfDay = new Date();
//   startOfDay.setUTCHours(0, 0, 0, 0);

//   const { count } = await db
//     .from('query_log')
//     .select('id', { count: 'exact', head: true })
//     .eq('ai', true)
//     .gte('created_at', startOfDay.toISOString());

//   return (count ?? 0) < DAILY_AI_CAP;
// }

// export async function POST(req: Request) {
//   const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anon';

//   if (!(await allowed(ip))) {
//     return NextResponse.json({ error: 'slow_down' }, { status: 429 });
//   }

//   const body = await req.json().catch(() => ({}));
//   const lang = LANGS.includes(body.lang) ? body.lang : 'en';
//   const question = String(body.q ?? '')
//     .slice(0, 300)
//     .trim();
//   const slug = typeof body.slug === 'string' ? body.slug : null;

//   let answer: Answer = { found: false };
//   let usedAi = false;

//   if (slug) {
//     // Topic buttons: always the human-reviewed text (and approved voice clip, if any).
//     answer = await getReviewedAnswer(slug, lang);
//   } else if (question) {
//     if (aiEnabled() && (await allowedAi(ip)) && (await underDailyCap())) {
//       usedAi = true;
//       answer = await answerWithAi(question, lang);
//     } else {
//       // No AI available: fall back to simple keyword matching on reviewed text.
//       const { data: matched } = await db.rpc('match_topic', { q: question });
//       if (matched) answer = await getReviewedAnswer(matched, lang);
//     }
//   }

//   db.from('query_log')
//     .insert({
//       lang,
//       question: question || slug,
//       slug,
//       answered: answer.found,
//       ai: usedAi,
//     })
//     .then(() => {});

//   return NextResponse.json(answer);
// }
