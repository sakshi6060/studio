'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AboutProps {
  summary: string; // Or a dedicated 'aboutMe' field from portfolio.json
}

export function About({ summary }: AboutProps) {
  // For a more dedicated "About Me", you might want a separate field in portfolio.json
  // This uses the summary for now.
  const aboutText = summary;

  return (
    <motion.section
      id="about"
      className="bg-background dark:bg-card/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0">
            <Image
              src="https://placehold.co/600x600.png" // Replace with your actual image
              alt="Gaurav Suryavanshi"
              fill
              className="rounded-lg shadow-xl object-cover"
              data-ai-hint="professional portrait"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-primary">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutText}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or enjoying a good book on
              philosophy and science fiction. I believe in lifelong learning and
              continuously strive to expand my skillset.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
