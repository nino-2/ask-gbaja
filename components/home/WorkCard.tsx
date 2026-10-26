import Image from 'next/image';
import { Work } from '@/data/works';

type Props = {
  work: Work;
};

export default function WorkCard({ work }: Props) {
  return (
    <article
      id={work.slug}
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-[14px] border border-line bg-card"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="400px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs text-mute">{work.date}</span>
        <h3 className="text-lg font-bold">{work.title}</h3>
        <p className="text-sm text-mute">{work.summary}</p>

        {work.critics && (
          <p className="border-l-[3px] border-line pl-2.5 text-[13px] text-mute">
            What critics say: {work.critics}
          </p>
        )}

        <p className="text-xs text-mute">
          Sources:{' '}
          {work.sources.map((source, i) => (
            <span key={source.url}>
              {i > 0 && ', '}
              <a href={source.url} target="_blank" rel="noreferrer" className="underline">
                {source.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}
