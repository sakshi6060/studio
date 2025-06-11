
'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    // Replace with your Formspree endpoint
    const formspreeEndpoint = 'https://formspree.io/f/yourFormId'; 

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          toast({
            title: 'Error Sending Message',
            description: data.errors.map((error: any) => error.message).join(', '),
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error Sending Message',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error Sending Message',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-background dark:bg-card/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
          Get In Touch
        </h2>
        <Card className="max-w-2xl mx-auto shadow-xl dark:shadow-primary/10">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send me a message</CardTitle>
            <CardDescription>I'm always open to discussing new projects, creative ideas or opportunities.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-medium">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">Your Email</Label>
                <Input
                  id="email"
                  name="_replyto" // For Formspree to set reply-to
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="message" className="font-medium">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Let's talk about..."
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
