'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { useApp } from '@/context/Providers';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD = 'w-full rounded-[10px] border border-line bg-card p-3';

export default function ContactPage() {
  const { t } = useApp();
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const body = JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)));
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    setStatus(res.ok ? 'sent' : 'error');
  }

  return (
    <>
      <PageHeader
        title={t.contact}
        sub="Spotted a wrong answer or want to share a source? Tell us."
      />

      <Section>
        {status === 'sent' ? (
          <p>Thank you. Your message has been received.</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid max-w-[560px] gap-3">
            <input
              name="name"
              placeholder="Your name"
              required
              maxLength={100}
              className={FIELD}
            />
            <input
              name="email"
              type="email"
              placeholder="Email (optional)"
              maxLength={150}
              className={FIELD}
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your message"
              required
              maxLength={2000}
              className={FIELD}
            />

            <button
              disabled={status === 'sending'}
              className="rounded-[10px] bg-brand px-5 py-[11px] font-bold text-on-brand disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'error' && <p role="alert">Could not send. Please try again.</p>}
          </form>
        )}
      </Section>
    </>
  );
}
