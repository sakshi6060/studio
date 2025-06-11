
import type { Metadata } from 'next';
import { DefaultSeo } from 'next-seo';
import SEO_CONFIG from '../../next-seo.config';
import './globals.css';
import { Layout } from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
    // apple: '/apple-icon.png', // Example for apple touch icon if you have one
    // shortcut: '/favicon.ico', // For older browsers, often same as icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon links are now primarily managed by the metadata object above */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <DefaultSeo {...SEO_CONFIG} />
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
