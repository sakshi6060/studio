
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'; // Using ShadCN Dialog
import { X, ExternalLink, Tag, Briefcase, HelpCircle } from 'lucide-react'; // Using Lucide for consistency

interface ProjectImpact {
  [key: string]: string;
}

interface Project {
  name: string;
  description: string;
  stack: string[];
  impact: ProjectImpact;
  questions: string[];
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.stack)));
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.stack.includes(filter));

  return (
    <section id="projects" className="bg-background dark:bg-card/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          My Projects
        </h2>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={filter === 'All' ? 'default' : 'outline'}
            onClick={() => setFilter('All')}
            className="rounded-full"
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? 'default' : 'outline'}
              onClick={() => setFilter(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 dark:hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.stack.slice(0, 3).map(tech => (
                       <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                    {project.stack.length > 3 && <Badge variant="secondary">+{project.stack.length - 3}</Badge>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-primary">{selectedProject.name}</DialogTitle>
                <DialogDescription className="pt-2">{selectedProject.description}</DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-md mb-2 flex items-center"><Tag className="w-4 h-4 mr-2 text-accent" /> Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-md mb-2 flex items-center"><Briefcase className="w-4 h-4 mr-2 text-accent" /> Impact Metrics</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {Object.entries(selectedProject.impact).map(([key, value]) => (
                      <li key={key}><span className="font-medium text-foreground">{key}:</span> {value}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-md mb-2 flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-accent" /> Interview Questions</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {selectedProject.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <DialogFooter className="sm:justify-start">
                 <Button type="button" asChild>
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                      View Code <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      </div>
    </section>
  );
}
