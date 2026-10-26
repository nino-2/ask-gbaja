'use client';

import InfoCard from '@/components/ui/InfoCard';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { useApp } from '@/context/Providers';
import { GBAJA_ROLE, PRIORITIES } from '@/data/policies';

const GRID = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4';

export default function PoliciesPage() {
  const { t, tr } = useApp();

  return (
    <>
      <PageHeader
        title={t.policies}
        sub="The Renewed Hope priorities and the role of Femi Gbajabiamila."
      />

      <Section>
        <h2 className="mb-5 text-[28px] font-bold">Renewed Hope priorities</h2>
        <div className={GRID}>
          {PRIORITIES.map((item, i) => (
            <InfoCard
              key={i}
              number={i + 1}
              title={tr(item.title)}
              text={tr(item.text)}
            />
          ))}
        </div>
      </Section>

      <Section alt>
        <h2 className="mb-5 text-[28px] font-bold">Femi Gbajabiamila</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GBAJA_ROLE.map((item, i) => (
            <InfoCard key={i} title={tr(item.title)} text={tr(item.text)} />
          ))}
        </div>
      </Section>
    </>
  );
}
