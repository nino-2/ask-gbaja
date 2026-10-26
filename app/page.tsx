import Link from 'next/link';
import CtaBand from '@/components/home/CtaBand';
import Hero from '@/components/home/Hero';
import WorkCard from '@/components/home/WorkCard';
import WorksCarousel from '@/components/home/WorksCarousel';
import Section from '@/components/ui/Section';
import { WORKS } from '@/data/works';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorksCarousel />

      <Section alt>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-[clamp(24px,3.4vw,32px)] leading-tight font-bold">
            Track record
          </h2>
          <Link href="/works" className="font-bold text-brand hover:underline">
            See all works 
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.slice(0, 3).map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
