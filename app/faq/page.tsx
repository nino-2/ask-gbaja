import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { FAQS } from '@/data/faqs';

export const metadata = { title: 'FAQ | Ask Gbaja' };

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        sub="About this platform, and what the administration has done and why."
      />

      <Section>
        <div className="grid gap-10">
          {FAQS.map((group) => (
            <div key={group.group}>
              <h2 className="mb-3 text-2xl font-bold">{group.group}</h2>

              <div className="grid max-w-[820px] gap-2.5">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-line bg-card px-4 py-3.5"
                  >
                    <summary className="cursor-pointer font-bold group-open:mb-2 group-open:text-brand">
                      {item.q}
                    </summary>
                    <p className="text-mute">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
