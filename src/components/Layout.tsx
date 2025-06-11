
'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/useTheme';
import { Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import type { ReactNode } from 'react';
import { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation'; // Added import

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      {/* Background Animation Component */}
      <BackgroundAnimation
        beamColor="#00FFFF" // Cyan beams
        gridLineColor="rgba(255, 255, 255, 0.05)" // Very subtle white grid, good for dark themes
        particleDensity={0.0003} // Fewer particles
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 backdrop-blur-md bg-background/80 dark:bg-background/70 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/#hero"
            className="text-xl font-headline font-bold text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
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
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open Mobile Menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background/95 dark:bg-card/95 backdrop-blur-lg">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-primary font-headline">
                      Navigation Menu
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.id}>
                        <Link
                          href={`#${link.id}`}
                          className="text-lg font-medium p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label.toUpperCase()}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-20 md:pt-24 relative z-10">{children}</main> {/* Ensure main content is above background */}
      <footer className="py-8 text-center text-muted-foreground relative z-10"> {/* Ensure footer is above background */}
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
