'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import { useApp } from '@/context/Providers';
import { WORKS } from '@/data/works';

const GAP = 16;

export default function WorksCarousel() {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const slideWidth = () =>
    (trackRef.current?.firstElementChild?.clientWidth ?? 300) + GAP;
  const scroll = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({ left: direction * slideWidth(), behavior: 'smooth' });

  // Auto-advance, looping back to the start. Skipped for people who prefer reduced motion.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track || paused) return;

      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
    }, 3500);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <Section>
      <div className="mb-5 flex items-end justify-between gap-3">
        <h2 className="text-[clamp(24px,3.4vw,32px)] leading-tight font-bold">
          {t.worksH}
        </h2>

        <div className="flex gap-2">
          {(['Previous', 'Next'] as const).map((label, i) => (
            <button
              key={label}
              aria-label={label}
              onClick={() => scroll(i === 0 ? -1 : 1)}
              className="size-10 rounded-full border border-line bg-card text-lg"
            >
              {i === 0 ? '‹' : '›'}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {WORKS.map((work) => (
          <Link
            key={work.slug}
            href={`/works#${work.slug}`}
            className="relative block aspect-[4/3] shrink-0 basis-[min(78%,420px)] snap-start overflow-hidden rounded-2xl text-white no-underline"
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              sizes="420px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-3.5 font-bold">
              {work.title}
              <small className="block font-normal opacity-85">{work.date}</small>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
