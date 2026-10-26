'use client';

import { useApp } from '@/context/Providers';
import { LANGS, Lang } from '@/lib/i18n';
import { control } from '@/lib/styles';

export default function LanguageSelect() {
  const { lang, setLang } = useApp();

  return (
    <select
      className={control}
      aria-label="Language"
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
    >
      {Object.entries(LANGS).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
