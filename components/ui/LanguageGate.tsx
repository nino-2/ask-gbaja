'use client';

import { useApp } from '@/context/Providers';
import { LANGS, Lang } from '@/lib/i18n';

/** Shown on the first visit only. The whole site then renders in the chosen language. */
export default function LanguageGate() {
  const { ready, chosen, setLang, t } = useApp();

  if (!ready || chosen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-title"
    >
      <div className="w-full max-w-[420px] rounded-[18px] bg-card p-7">
        <h2 id="language-title" className="mb-1 text-2xl font-bold">
          {t.pick}
        </h2>
        <p className="mb-4 text-mute">{t.pickSub}</p>

        {Object.entries(LANGS).map(([code, name]) => (
          <button
            key={code}
            onClick={() => setLang(code as Lang)}
            className="mt-2 block w-full rounded-[10px] border border-line bg-bg2 p-3 text-left font-bold hover:border-accent"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
