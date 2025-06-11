'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, HelpCircle } from 'lucide-react'; // Example icons

interface Skill {
  name: string;
  level: string;
  years: number;
  focus: string[];
  questions: string[];
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="bg-secondary/50 dark:bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          My Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="group relative"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.2 }}
              tabIndex={0} // For keyboard focus
            >
              <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl dark:group-hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-xl flex items-center justify-between">
                    {skill.name}
                    <Badge variant="secondary">{skill.level}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {skill.years} years of experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Initial content can be short description or key focus area */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {skill.focus.join(', ')}
                  </p>
                </CardContent>
              </Card>
              {/* Tooltip-like overlay on hover/focus */}
              <div className="absolute inset-0 p-4 bg-background/95 dark:bg-card/95 border border-border rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto flex flex-col overflow-y-auto">
                <h4 className="font-headline text-lg font-semibold mb-2 text-primary">
                  {skill.name}
                </h4>
                <div className="mb-3">
                  <h5 className="text-sm font-medium flex items-center mb-1 text-foreground">
                    <Lightbulb className="w-4 h-4 mr-2 text-accent" />
                    Focus Areas:
                  </h5>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                    {skill.focus.slice(0, 3).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium flex items-center mb-1 text-foreground">
                    <HelpCircle className="w-4 h-4 mr-2 text-accent" />
                    Key Questions:
                  </h5>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                    {skill.questions.slice(0, 2).map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
