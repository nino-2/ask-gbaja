'use client';

import { useApp } from '@/context/Providers';
import { control } from '@/lib/styles';
import  { Moon, Sun } from 'lucide-react';
export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const dark = theme === 'dark';

  return (
    <button
      className={control}
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
