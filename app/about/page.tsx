import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';

export const metadata = { title: 'About | Ask Gbaja' };

const BLOCKS = [
  {
    title: 'Who it is for',
    text: 'Every Nigerian who wants to understand what government has done and why: students, workers, traders, drivers and families, including people who are more comfortable in Pidgin, Yorùbá, Hausa or Igbo than in English.',
  },
  {
    title: 'What it is',
    text: 'Ask Gbaja is an AI assistant by Friends of Femi Gbajabiamila. It answers questions about the administration’s policies and projects using approved records, and shows the source and date for every answer.',
  },
  {
    title: 'What we are trying to achieve',
    text: 'Clear information that anyone can check. We want people to ask a question in their own language, hear the answer, and follow the source themselves. Where something is disputed, we say so.',
  },
  {
    title: 'Who is behind it',
    text: 'An independent group of supporters of Femi Gbajabiamila, Chief of Staff to the President. This is not an official government website.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Ask Gbaja"
        sub="Plain answers about the Tinubu administration’s work, in the language you speak."
      />

      <Section>
        <div className="grid items-start gap-9 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative aspect-[9/11] overflow-hidden rounded-[18px]">
            <Image
              src="/Gbaja_potrait.jpg"
              alt="Femi Gbajabiamila"
              fill
              sizes="400px"
              priority
              className="object-cover"
            />
          </div>

          <div className="grid gap-6">
            {BLOCKS.map((block) => (
              <div key={block.title}>
                <h2 className="mb-2 text-2xl font-bold">{block.title}</h2>
                <p className="text-mute">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
