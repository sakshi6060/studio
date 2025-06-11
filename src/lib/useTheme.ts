'use client';

import { useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme };
}
