import WorkCard from '@/components/home/WorkCard';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { WORKS } from '@/data/works';

export const metadata = { title: 'Works | Ask Gbaja' };

export default function WorksPage() {
  return (
    <>
      <PageHeader
        title="Works delivered"
        sub="Each entry shows its sources and, where they exist, what critics say."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </Section>
    </>
  );
}
