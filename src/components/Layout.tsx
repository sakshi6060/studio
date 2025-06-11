'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/useTheme';
import { Sun, Moon } from 'lucide-react'; // Using Lucide for consistency
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'contact', label: 'Contact' },
];

export function Layout({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 backdrop-blur-md bg-background/80 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/#hero"
            className="text-xl font-headline font-bold text-primary"
          >
            PortfolioPro
          </Link>
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                asChild
                className="text-sm font-medium"
              >
                <Link href={`#${link.id}`}>{link.label.toUpperCase()}</Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            {/* Mobile menu could be added here */}
          </div>
        </div>
      </header>
      <main className="pt-20 md:pt-24">{children}</main>
      <footer className="py-8 text-center text-muted-foreground">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Gaurav Suryavanshi. All rights
            reserved.
          </p>
          <p>Built with Next.js, Tailwind CSS, and ❤️</p>
        </div>
      </footer>
    </div>
  );
}
