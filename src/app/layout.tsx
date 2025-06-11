import type { Metadata } from 'next';
// Removed: import { DefaultSeo } from 'next-seo';
// Removed: import SEO_CONFIG from '../../next-seo.config';
import './globals.css';
import { Layout } from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com';
const defaultTitle = 'Gaurav Suryavanshi | AI Developer & Full-Stack Engineer';
const defaultDescription =
  'Portfolio of Gaurav Suryavanshi, an AI Developer & Full-Stack Engineer with over 3 years of experience in building AI-powered applications and robust full-stack solutions.';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' }],
    // apple: '/apple-icon.png', // Example for apple touch icon if you have one
  },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: siteUrl,
    siteName: 'Gaurav Suryavanshi Portfolio',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Ensure og-image.png is in public/
        width: 1200,
        height: 630,
        alt: 'Gaurav Suryavanshi Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    // images: [`${siteUrl}/og-image.png`], // Twitter images are often inferred from openGraph or can be added explicitly
    creator: '@yourtwitterhandle',
    site: '@yourtwitterhandle',
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
        {/* Removed: <DefaultSeo {...SEO_CONFIG} /> */}
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
