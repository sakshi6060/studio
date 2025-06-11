
// Using .js extension as per prompt, but .ts would be fine too.
// Default data from portfolio.json will be used if available, otherwise these fallbacks.
const defaultTitle = 'Gaurav Suryavanshi | AI Developer & Full-Stack Engineer';
const defaultDescription = 'Portfolio of Gaurav Suryavanshi, an AI Developer & Full-Stack Engineer with over 3 years of experience in building AI-powered applications and robust full-stack solutions.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com'; // Replace with your actual domain

/** @type {import('next-seo').DefaultSeoProps} */
const SEO_CONFIG = {
  title: defaultTitle,
  description: defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: siteUrl,
    site_name: 'Gaurav Suryavanshi Portfolio',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Create an OG image and place it in public folder
        width: 1200,
        height: 630,
        alt: 'Gaurav Suryavanshi Portfolio',
      },
    ],
  },
  twitter: {
    handle: '@yourtwitterhandle', // Replace with your Twitter handle
    site: '@yourtwitterhandle',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    // Favicon will be handled by Next.js if present in src/app/ directory
    // or if defined in src/app/layout.tsx metadata.
    // You can add more link tags here, e.g., for apple-touch-icon
  ],
};

export default SEO_CONFIG;
