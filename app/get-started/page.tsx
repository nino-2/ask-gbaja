import Button from '@/components/ui/Button';
import InfoCard from '@/components/ui/InfoCard';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';

export const metadata = { title: 'Get started | Ask Gbaja' };

const STEPS = [
  {
    title: 'Choose your language',
    text: 'Pick English, Pidgin, Yorùbá, Hausa or Igbo. The whole site switches.',
  },
  {
    title: 'Ask by text or voice',
    text: 'Tap a topic, type a question, or tap the microphone and speak.',
  },
  {
    title: 'Check the source',
    text: 'Every answer shows where it came from and when. Tap “Listen” to hear it read aloud.',
  },
];

export default function GetStartedPage() {
  return (
    <>
      <PageHeader title="Get started" sub="Three steps. No account needed." />

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <InfoCard
              key={step.title}
              number={i + 1}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>

        <div className="mt-6">
          <Button href="/#chat">Start asking</Button>
        </div>
      </Section>
    </>
  );
}
