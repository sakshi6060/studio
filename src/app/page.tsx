import type { PortfolioData } from '@/types/portfolio';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Highlights from '@/components/Highlights';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';
import ContactForm from '@/components/ContactForm';
import { Separator } from '@/components/ui/separator';
import { About } from '@/components/About';

export const dynamic = 'force-static';

async function getPortfolioData(): Promise<PortfolioData> {
  // Dynamically import the JSON data from the public directory
  // The path is relative to this file: src/app/page.tsx
  const dataModule = await import('../../public/data/portfolio.json');
  return dataModule.default as PortfolioData;
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <Hero
        name={data.name}
        title={data.title}
        summary={data.summary}
        contact={data.contact}
      />
      <About summary={data.summary} />
      <Separator className="my-8 md:my-12" />
      <Skills skills={data.skills} />
      <Separator className="my-8 md:my-12" />
      <Highlights highlights={data.highlights} />
      <Separator className="my-8 md:my-12" />
      <Experience experience={data.experience} />
      <Separator className="my-8 md:my-12" />
      <Projects projects={data.projects} />
      <Separator className="my-8 md:my-12" />
      <Blogs blogs={data.blogs} />
      <Separator className="my-8 md:my-12" />
      <ContactForm />
    </>
  );
}
