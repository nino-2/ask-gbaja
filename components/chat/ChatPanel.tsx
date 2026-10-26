'use client';

import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/Providers';
import { Lang } from '@/lib/i18n';
import ChatMessage, { Msg } from './ChatMessage';

const SPEECH_LANG: Record<Lang, string> = {
  en: 'en-NG',
  pcm: 'en-NG',
  yo: 'yo-NG',
  ha: 'ha-NG',
  ig: 'ig-NG',
};

export default function ChatPanel() {
  const { lang, t } = useApp();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Chats live on this device only.
  useEffect(() => {
    try {
      setMessages(JSON.parse(localStorage.ag_chat || '[]'));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.ag_chat = JSON.stringify(messages.slice(-60));
    } catch {}
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages]);

  async function ask(text: string, slug?: string) {
    if (!text.trim() && !slug) return;

    setMessages((m) => [...m, { role: 'me', text }]);
    setQuestion('');
    setBusy(true);

    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, slug, lang }),
    });
    const data = await res.json().catch(() => ({}));

    setBusy(false);
    setMessages((m) => [
      ...m,
      data.found
        ? {
            role: 'bot',
            text: data.text,
            sources: data.sources,
            audio: data.audio,
            voiceBy: data.voiceBy,
            fallback: data.fallback,
            ai: data.ai,
          }
        : { role: 'bot', text: t.none },
    ]);
  }

  function listen(msg: Msg) {
    // A recorded, approved clip plays if one exists; otherwise the device voice reads it.
    if (msg.audio) {
      new Audio(msg.audio).play();
      return;
    }
    const speech = new SpeechSynthesisUtterance(msg.text);
    speech.lang = SPEECH_LANG[lang];
    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  }

  function startVoice() {
    const Recognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!Recognition) {
      alert('Voice input works best in Chrome.');
      return;
    }
    const recognition = new Recognition();
    recognition.lang = SPEECH_LANG[lang];
    recognition.onresult = (e: any) => ask(e.results[0][0].transcript);
    recognition.start();
  }

  const shown: Msg[] = messages.length ? messages : [{ role: 'bot', text: t.hello }];

  return (
    <div
      id="chat"
      className="overflow-hidden rounded-[18px] border border-line bg-card shadow-[0_10px_30px_rgba(0,0,0,.08)]"
    >
      <div className="flex items-center justify-between bg-brand px-4 py-3 font-bold text-on-brand">
        <span>Ask Gbaja</span>
        <button
          onClick={() => setMessages([])}
          className="rounded-lg border border-current px-2.5 py-0.5 text-xs"
        >
          {t.clear}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-3 pt-3">
        {Object.entries(t.topics).map(([slug, label]) => (
          <button
            key={slug}
            onClick={() => ask(label as string, slug)}
            className="rounded-full border border-line bg-bubble px-3.5 py-1.5 text-sm font-semibold"
          >
            {label as string}
          </button>
        ))}
      </div>

      <div
        aria-live="polite"
        className="flex h-72 flex-col gap-2.5 overflow-y-auto p-3.5"
      >
        {shown.map((msg, i) => (
          <ChatMessage
            key={i}
            msg={msg}
            fallbackNote={t.fallback}
            aiNote={t.aiNote}
            listenLabel={t.listen}
            onListen={listen}
          />
        ))}
        {busy && (
          <div className="max-w-[88%] self-start rounded-[14px] bg-bubble px-3 py-2">
            …
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <p className="px-3.5 pb-2 text-xs text-mute">{t.saved}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
        className="m-3 flex gap-2 rounded-[14px] border border-line bg-card p-1.5"
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t.ph}
          aria-label={t.ph}
          className="min-w-0 flex-1 bg-transparent px-2.5 py-2 outline-none"
        />
        <button
          type="button"
          onClick={startVoice}
          aria-label="Speak"
          className="w-[42px] rounded-[10px] bg-bg2"
        >
          🎤
        </button>
        <button className="rounded-[10px] bg-brand px-[18px] font-bold text-on-brand">
          {t.ask}
        </button>
      </form>
    </div>
  );
}
