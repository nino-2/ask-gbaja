'use client';

import ChatPanel from '@/components/chat/ChatPanel';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { useApp } from '@/context/Providers';

export default function Hero() {
  const { t } = useApp();

  return (
    <Container className="grid items-center gap-9 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-12">
      <div>
        <h1 className="text-[clamp(34px,5vw,54px)] leading-[1.05] font-extrabold tracking-tight">
          {t.h1}
        </h1>
        <p className="mt-4 max-w-[48ch] text-mute">{t.sub}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/#chat">{t.ask}</Button>
          <Button href="/works" variant="ghost">
            {t.more}
          </Button>
        </div>
      </div>

      <ChatPanel />
    </Container>
  );
}
