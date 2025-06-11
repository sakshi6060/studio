
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowRight } from 'lucide-react';

interface Blog {
  title: string;
  date: string; // Assuming YYYY-MM-DD format for sorting
  description: string;
  link: string;
}

interface BlogsProps {
  blogs: Blog[];
}

// Helper to format date nicely
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateString; // fallback to original if parsing fails
  }
};


export default function Blogs({ blogs }: BlogsProps) {
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="blogs" className="bg-secondary/50 dark:bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedBlogs.map((blog, index) => (
            <Card key={index} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:hover:shadow-primary/20">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{blog.title}</CardTitle>
                <CardDescription className="flex items-center text-sm text-muted-foreground pt-1">
                  <CalendarDays className="w-4 h-4 mr-2" /> {formatDate(blog.date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{blog.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0 text-accent hover:text-accent/80">
                  <a href={blog.link} target="_blank" rel="noopener noreferrer">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
