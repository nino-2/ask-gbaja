import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { allowed } from '@/lib/limit';
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anon';
  if (!(await allowed('contact:' + ip)))
    return NextResponse.json({ error: 'slow_down' }, { status: 429 });
  const b = await req.json().catch(() => ({}));
  const message = String(b.message ?? '')
    .trim()
    .slice(0, 2000);
  if (!message) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const { error } = await db.from('contact_messages').insert({
    name: String(b.name ?? '').slice(0, 100),
    email: String(b.email ?? '').slice(0, 150),
    message,
  });
  return error
    ? NextResponse.json({ error: 'failed' }, { status: 500 })
    : NextResponse.json({ ok: true });
}
