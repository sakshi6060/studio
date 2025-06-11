'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Mail, Link as LinkIcon } from 'lucide-react'; // Assuming these icons
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail as MailLucideIcon,
} from 'lucide-react'; // Corrected Mail import

interface ContactInfo {
  email: string;
  website: string;
  linkedin?: string;
  github?: string;
}

interface HeroProps {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
}

export default function Hero({ name, title, summary, contact }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      id="hero"
      className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center py-20 bg-gradient-to-br from-background to-secondary dark:from-background dark:to-primary/10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary dark:text-primary-foreground mb-4"
          variants={itemVariants}
        >
          {name}
        </motion.h1>
        <motion.h2
          className="text-2xl sm:text-3xl font-headline text-foreground/80 dark:text-foreground/70 mb-6"
          variants={itemVariants}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground mb-8"
          variants={itemVariants}
        >
          {summary}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <Button size="lg" asChild>
            <a href={`mailto:${contact.email}`}>
              <MailLucideIcon className="mr-2 h-5 w-5" /> Email Me
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={contact.website} target="_blank" rel="noopener noreferrer">
              Visit Website <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
        <motion.div
          className="mt-10 flex justify-center space-x-6"
          variants={itemVariants}
        >
          {contact.github && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </a>
            </Button>
          )}
          {contact.linkedin && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </a>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
