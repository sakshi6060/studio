
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com', // Replace with your actual domain
  generateRobotsTxt: true, // (Optional)
  // ...other options
  // Example: exclude some routes
  // exclude: ['/server-sitemap.xml'], // <= exclude here
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     'https://www.yourdomain.com/server-sitemap.xml', // <==== Add here
  //   ],
  // },
};
