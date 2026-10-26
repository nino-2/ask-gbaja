'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LanguageSelect from '@/components/ui/LanguageSelect';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Container from '@/components/ui/Container';
import { useApp } from '@/context/Providers';
import { cx } from '@/lib/cx';
import { control } from '@/lib/styles';

const LINKS = [
  ['/', 'home'],
  ['/policies', 'policies'],
  ['/faq', 'faq'],
  ['/about', 'about'],
  ['/contact', 'contact'],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 shadow-md border-brand bg-bg">
      <Container className="flex flex-wrap items-center gap-4 py-3">
        <Link href="/" className="mr-auto flex items-center gap-3 no-underline">
          <Image src="/logo.png" alt="" width={48} height={48} className="rounded-xl" />
          <span>
            <b className="block text-[26px] leading-none font-extrabold">Ask Gbaja</b>
            <small className="text-xs font-semibold text-brand">
              Friends of Femi Gbajabiamila
            </small>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className={cx(
            'order-last w-full flex-col gap-1 text-[15px] font-semibold',
            'md:order-none md:flex md:w-auto md:flex-row',
            open ? 'flex' : 'hidden',
          )}
        >
          {LINKS.map(([href, key]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? 'page' : undefined}
              className={cx(
                'px-3 py-2 text-mute no-underline hover:bg-bg2 hover:text-ink',
                'aria-[current=page]:text-ink aria-[current=page]:shadow-[inset_0_-3px_0_var(--acc)]',
              )}
            >
              {t[key]}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <LanguageSelect />
          <ThemeToggle />
          <button
            className={cx(control, 'md:hidden')}
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        <Link
          href="/get-started"
          className="hidden rounded-[10px] bg-brand px-[18px] py-2.5 font-bold text-on-brand no-underline md:inline-block"
        >
          {t.start}
        </Link>
      </Container>
    </header>
  );
}
