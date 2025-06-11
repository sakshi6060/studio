'use client';

import Slider from 'react-slick';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TrendingUp, CalendarDays, HelpCircle } from 'lucide-react';

interface Highlight {
  achievement: string;
  date: string;
  metrics: string;
  questions: string[];
}

interface HighlightsProps {
  highlights: Highlight[];
}

export default function Highlights({ highlights }: HighlightsProps) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false, // Using ShadCN or custom arrows might be better for styling
    responsive: [
      {
        breakpoint: 768, // For smaller screens, ensure 1 slide is shown
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <section id="highlights" className="bg-background dark:bg-card/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          Key Achievements
        </h2>
        <Slider {...settings} className="-mx-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="px-4 pb-8">
              {' '}
              {/* Added pb-8 for dots space */}
              <Card className="overflow-hidden shadow-lg dark:shadow-primary/10">
                <CardHeader className="bg-primary/10 dark:bg-primary/20">
                  <CardTitle className="font-headline text-xl text-primary dark:text-primary-foreground">
                    {highlight.achievement}
                  </CardTitle>
                  <CardDescription className="flex items-center text-sm text-muted-foreground pt-1">
                    <CalendarDays className="w-4 h-4 mr-2" /> {highlight.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="text-md font-semibold flex items-center text-foreground mb-1">
                      <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                      Impact & Metrics:
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {highlight.metrics}
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        <div className="flex items-center">
                          <HelpCircle className="w-4 h-4 mr-2 text-accent" />{' '}
                          Interview Questions
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                          {highlight.questions.map((q, j) => (
                            <li key={j}>{q}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
