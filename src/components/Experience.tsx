'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Briefcase,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Award,
  ListChecks,
} from 'lucide-react'; // Using Lucide for icons

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  achievements: string[];
}

interface ExperienceProps {
  experience: ExperienceItemProps[];
}

function ExperienceItem({ exp }: { exp: ExperienceItemProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { opacity: 1, height: 'auto', marginTop: '1rem' },
    closed: { opacity: 0, height: 0, marginTop: '0rem' },
  };

  return (
    <li className="mb-10 ms-8 relative">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary rounded-full -start-4 ring-4 ring-background dark:ring-card">
        <Briefcase className="w-4 h-4 text-primary-foreground" />
      </span>
      <div className="p-4 border border-border rounded-lg shadow-sm bg-card hover:shadow-md transition-shadow">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <div>
            <h3 className="text-lg font-headline font-semibold text-primary">
              {exp.role}
            </h3>
            <p className="text-md text-muted-foreground flex items-center">
              <Building className="w-4 h-4 mr-2" /> {exp.company}
            </p>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <CalendarDays className="w-4 h-4 mr-2" /> {exp.period}
            </p>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-2 flex items-center text-foreground">
                  <ListChecks className="w-4 h-4 mr-2 text-accent" />{' '}
                  Responsibilities:
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <h4 className="text-sm font-semibold mt-4 mb-2 flex items-center text-foreground">
                  <Award className="w-4 h-4 mr-2 text-accent" /> Achievements:
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="bg-secondary/50 dark:bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          Work Experience
        </h2>
        <ol className="relative border-s border-border dark:border-gray-700">
          {experience.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} />
          ))}
        </ol>
      </div>
    </section>
  );
}
