import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg py-6 text-[13px] text-ink">
      <Container className="grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image src="/logo.png" alt="" width={48} height={48} className="rounded-xl" />
            <span>
              <b className="block text-[26px] leading-none font-extrabold">Ask Gbaja</b>
              <small className="text-xs font-semibold text-brand">
                Friends of Femi Gbajabiamila
              </small>
            </span>
          </Link>

          <nav aria-label="Footer" className="flex items-center gap-6 font-semibold">
            <Link href="/policies" className="text-mute no-underline hover:text-ink">
              Policies
            </Link>
            <Link href="/" className="text-mute no-underline hover:text-ink">
              Ask Gbaja
            </Link>
          </nav>
        </div>

        <p className="max-w-[70ch] text-mute">
          Ask Gbaja is an independent initiative by Friends of Femi Gbajabiamila. It is
          not an official government website. Answers come from published sources and may
          not cover every view on a policy.
        </p>

        <p className="text-mute">
          © {new Date().getFullYear()} Friends of Femi Gbajabiamila
        </p>
      </Container>
    </footer>
  );
}
