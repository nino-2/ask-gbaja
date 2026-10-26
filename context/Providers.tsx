'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { EXTRA, Lang, NAV, T, Tr } from '@/lib/i18n';
type Theme = 'light' | 'dark';
type Ctx = {
  lang: Lang;
  chosen: boolean;
  ready: boolean;
  setLang: (l: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: any;
  tr: (x: Tr) => string;
};
const C = createContext<Ctx>(null as any);
export const useApp = () => useContext(C);
export function Providers({ children }: { children: ReactNode }) {
  const [lang, setL] = useState<Lang | ''>('');
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    try {
      setL((localStorage.ag_lang as Lang) || '');
    } catch {}
    const d = document.documentElement.dataset.theme as Theme;
    setTheme(d || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
    setReady(true);
  }, []);
  const l: Lang = lang || 'en';
  const setLang = (x: Lang) => {
    setL(x);
    try {
      localStorage.ag_lang = x;
    } catch {}
    document.documentElement.lang = x === 'pcm' ? 'en' : x;
  };
  const toggleTheme = () => {
    const n = theme === 'dark' ? 'light' : 'dark';
    setTheme(n);
    document.documentElement.dataset.theme = n;
    try {
      localStorage.ag_theme = n;
    } catch {}
  };
  const tr = (x: Tr) => (typeof x === 'string' ? x : (x[l] ?? x.en ?? ''));
  return (
    <C.Provider
      value={{
        lang: l,
        chosen: !!lang,
        ready,
        setLang,
        theme,
        toggleTheme,
        t: { ...T[l], ...NAV[l], ...EXTRA[l] },
        tr,
      }}
    >
      {children}
    </C.Provider>
  );
}
