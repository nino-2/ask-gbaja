'use client';

import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useApp } from '@/context/Providers';

export default function CtaBand() {
  const { t } = useApp();

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-brand p-9 text-on-brand">
        <div>
          <h2 className="text-2xl font-bold">{t.h1}</h2>
          <p className="mt-1 opacity-90">{t.sub}</p>
        </div>
        <Button href="/get-started" variant="light">
          {t.start}
        </Button>
      </div>
    </Section>
  );
}
