/**
 * SEO Metadata Management Utility
 * 
 * Handles page titles, descriptions, Open Graph tags, and structured data
 * for optimal search engine optimization and social media sharing.
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

const BASE_URL = 'https://www.blinkchart.ai';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEO metadata for all pages
 */
export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'BlinkChart – Turn Spreadsheets Into Charts Instantly',
    description: 'Convert Excel and CSV data into beautiful, interactive charts in seconds. BlinkChart is the fastest data visualization tool for spreadsheet users.',
    keywords: [
      'Excel to chart',
      'CSV to chart',
      'data visualization',
      'spreadsheet tool',
      'chart generator',
      'data visualization software',
    ],
    ogTitle: 'BlinkChart – Turn Spreadsheets Into Charts Instantly',
    ogDescription: 'Convert Excel and CSV data into beautiful charts in seconds.',
    ogImage: DEFAULT_IMAGE,
    canonicalUrl: BASE_URL,
  },
  features: {
    title: 'BlinkChart Features – Excel & CSV to Chart Conversion',
    description: 'Discover BlinkChart features for converting Excel and CSV files into interactive charts. Data visualization made simple and fast.',
    keywords: [
      'chart features',
      'data visualization features',
      'Excel to chart features',
      'CSV conversion',
      'spreadsheet visualization',
    ],
    ogTitle: 'BlinkChart Features – Fast Data Visualization',
    ogDescription: 'Convert spreadsheets to charts instantly with BlinkChart features.',
    canonicalUrl: `${BASE_URL}/features`,
  },
  pricing: {
    title: 'BlinkChart Pricing – Affordable Data Visualization',
    description: 'Simple, transparent pricing for BlinkChart. Choose the plan that fits your needs. Start converting spreadsheets to charts today.',
    keywords: [
      'chart generator pricing',
      'data visualization pricing',
      'spreadsheet tool pricing',
      'affordable charts',
    ],
    ogTitle: 'BlinkChart Pricing – Transparent & Affordable',
    ogDescription: 'Check BlinkChart pricing for data visualization and chart generation.',
    canonicalUrl: `${BASE_URL}/pricing`,
  },
  blog: {
    title: 'BlinkChart Blog – Data Visualization & Spreadsheet Tips',
    description: 'Read the latest insights on converting Excel to charts, CSV data visualization, and spreadsheet productivity tips.',
    keywords: [
      'data visualization blog',
      'Excel tips',
      'CSV conversion guide',
      'spreadsheet tutorials',
    ],
    ogTitle: 'BlinkChart Blog – Spreadsheet & Visualization Guides',
    ogDescription: 'Learn how to convert spreadsheets to charts and master data visualization.',
    canonicalUrl: `${BASE_URL}/blog`,
  },
  excelToBlogArticle: {
    title: 'How to Convert Excel to Chart in Seconds – BlinkChart Guide',
    description: 'Step-by-step guide on how to convert Excel spreadsheets into interactive charts in seconds using BlinkChart.',
    keywords: [
      'Excel to chart',
      'convert Excel to chart',
      'Excel visualization',
      'chart from Excel',
      'spreadsheet to chart',
    ],
    ogTitle: 'Convert Excel to Chart in Seconds – Complete Guide',
    ogDescription: 'Master the fastest way to turn Excel spreadsheets into beautiful, interactive charts.',
    canonicalUrl: `${BASE_URL}/blog/excel-to-chart-in-seconds`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-01',
  },
  csvToBlogArticle: {
    title: 'CSV to Chart Generator – Best Tool for Data Visualization',
    description: 'Learn how to convert CSV files into interactive charts. Discover why BlinkChart is the best CSV to chart generator tool.',
    keywords: [
      'CSV to chart',
      'CSV chart generator',
      'CSV data visualization',
      'convert CSV to chart',
      'CSV visualization tool',
    ],
    ogTitle: 'Best CSV to Chart Generator – BlinkChart',
    ogDescription: 'Convert CSV files to interactive charts instantly with BlinkChart.',
    canonicalUrl: `${BASE_URL}/blog/csv-to-chart-generator`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-02',
  },
  excelToChartOnlineFree: {
    title: 'Excel to Chart Online Free – Convert Spreadsheets Instantly',
    description: 'Free online tool to convert Excel spreadsheets into charts. Create beautiful visualizations without installation or downloads.',
    keywords: [
      'Excel to chart online',
      'Excel to chart free',
      'Excel to chart online free',
      'convert spreadsheet to chart',
      'excel chart converter',
      'online spreadsheet visualization',
    ],
    ogTitle: 'Excel to Chart Online Free – BlinkChart',
    ogDescription: 'Convert your Excel spreadsheets to professional charts instantly, completely free, online.',
    canonicalUrl: `${BASE_URL}/blog/excel-to-chart-online-free`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-03',
  },
  csvToChartToolGuide: {
    title: 'CSV to Chart Tool Guide – Complete Tutorial',
    description: 'Master CSV to chart conversion with our complete guide. Learn how to visualize CSV data instantly using BlinkChart.',
    keywords: [
      'CSV to chart tool',
      'CSV chart tool',
      'CSV to graph',
      'convert CSV to graph',
      'CSV data visualization tool',
      'best CSV to chart tool',
    ],
    ogTitle: 'CSV to Chart Tool Guide – Step-by-Step Tutorial',
    ogDescription: 'Learn how to use the best CSV to chart tool for professional data visualization.',
    canonicalUrl: `${BASE_URL}/blog/csv-to-chart-tool-guide`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-04',
  },
  bestChartGeneratorTools: {
    title: 'Best Chart Generator Tools 2026 – Comparison & Analysis',
    description: 'Compare the best chart generator tools available in 2026. Find the perfect tool for your data visualization needs.',
    keywords: [
      'best chart generator',
      'chart generator online',
      'chart generator tool',
      'data visualization tools',
      'chart maker online',
      'best chart maker',
      'online graph generator',
    ],
    ogTitle: 'Best Chart Generator Tools 2026 – Expert Comparison',
    ogDescription: 'Discover and compare the best chart generator tools for creating professional data visualizations.',
    canonicalUrl: `${BASE_URL}/blog/best-chart-generator-tools`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-05',
  },
  howToVisualizeDataFromExcel: {
    title: 'How to Visualize Data from Excel – Beginner Guide',
    description: 'Learn how to create stunning visualizations from your Excel data. Step-by-step guide with examples and best practices.',
    keywords: [
      'visualize Excel data',
      'Excel data visualization',
      'how to visualize data',
      'how to create charts from Excel',
      'Excel chart visualization',
      'spreadsheet visualization tutorial',
    ],
    ogTitle: 'How to Visualize Data from Excel – Complete Guide',
    ogDescription: 'Master data visualization from Excel with our comprehensive beginner-friendly guide.',
    canonicalUrl: `${BASE_URL}/blog/how-to-visualize-data-from-excel`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-06',
  },
  createGraphsFromSpreadsheet: {
    title: 'Create Graphs from Spreadsheet – Quick & Easy Method',
    description: 'Learn how to create professional graphs from your spreadsheet data in seconds. No design experience needed.',
    keywords: [
      'create graphs from spreadsheet',
      'create charts from spreadsheet',
      'graph from spreadsheet',
      'spreadsheet graph generator',
      'create graphs online',
      'make charts from spreadsheet',
    ],
    ogTitle: 'Create Graphs from Spreadsheet – Easy & Fast',
    ogDescription: 'Turn your spreadsheet data into beautiful graphs instantly with BlinkChart.',
    canonicalUrl: `${BASE_URL}/blog/create-graphs-from-spreadsheet`,
    author: 'BlinkChart Team',
    publishedDate: '2026-04-07',
  },
  privacy: {
    title: 'Privacy Policy – BlinkChart',
    description: 'Our privacy policy explains how BlinkChart collects, uses, and protects your data.',
    canonicalUrl: `${BASE_URL}/privacy-policy`,
  },
  terms: {
    title: 'Terms of Service – BlinkChart',
    description: 'Read the terms of service for using BlinkChart data visualization tool.',
    canonicalUrl: `${BASE_URL}/terms`,
  },
  about: {
    title: 'About BlinkChart – Our Mission & Team',
    description: 'Learn about BlinkChart, our mission to simplify data visualization, and meet our team.',
    keywords: ['about us', 'data visualization company', 'BlinkChart team'],
    canonicalUrl: `${BASE_URL}/about`,
  },
  contact: {
    title: 'Contact BlinkChart – Get in Touch',
    description: 'Have questions? Contact the BlinkChart team. We\'re here to help.',
    keywords: ['contact us', 'support', 'BlinkChart help'],
    canonicalUrl: `${BASE_URL}/contact`,
  },
  waitlist: {
    title: 'Join BlinkChart Waitlist – Early Access',
    description: 'Join our waitlist to get early access to BlinkChart and be the first to use our data visualization tool.',
    keywords: ['waitlist', 'early access', 'BlinkChart beta'],
    canonicalUrl: `${BASE_URL}/waitlist`,
  },
};

/**
 * Update document meta tags for a page
 */
export const updatePageMetadata = (metadata: PageMetadata): void => {
  // Update title
  document.title = metadata.title;

  // Update or create meta tags
  updateMetaTag('description', metadata.description);
  updateMetaTag('keywords', metadata.keywords?.join(', ') || '');
  updateMetaTag('author', metadata.author || 'BlinkChart');

  // Open Graph tags
  updateMetaTag('og:title', metadata.ogTitle || metadata.title, 'property');
  updateMetaTag('og:description', metadata.ogDescription || metadata.description, 'property');
  updateMetaTag('og:image', metadata.ogImage || DEFAULT_IMAGE, 'property');
  updateMetaTag('og:url', metadata.canonicalUrl || BASE_URL, 'property');
  updateMetaTag('og:type', 'website', 'property');

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', metadata.ogTitle || metadata.title);
  updateMetaTag('twitter:description', metadata.ogDescription || metadata.description);
  updateMetaTag('twitter:image', metadata.ogImage || DEFAULT_IMAGE);

  // Canonical URL
  if (metadata.canonicalUrl) {
    updateCanonicalLink(metadata.canonicalUrl);
  }

  // Published/Modified dates for blog articles
  if (metadata.publishedDate) {
    updateMetaTag('article:published_time', metadata.publishedDate, 'property');
  }
  if (metadata.modifiedDate) {
    updateMetaTag('article:modified_time', metadata.modifiedDate, 'property');
  }
};

/**
 * Update or create a meta tag
 */
const updateMetaTag = (name: string, content: string, attribute = 'name'): void => {
  if (!content) return;

  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

/**
 * Update canonical link
 */
const updateCanonicalLink = (url: string): void => {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
};

/**
 * Structures Data (JSON-LD) generators
 */

/**
 * Generate Organization structured data
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BlinkChart',
  description: 'Turn Spreadsheets Into Charts Instantly',
  url: BASE_URL,
  logo: `${BASE_URL}/blinkchart-logo.png`,
  sameAs: [
    'https://twitter.com/blinkchart',
    'https://linkedin.com/company/blinkchart',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@blinkchart.ai',
  },
});

/**
 * Generate Website schema
 */
export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BlinkChart',
  description: 'Turn Spreadsheets Into Charts Instantly',
  url: BASE_URL,
  searchAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate FAQ Schema for structured data
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/**
 * Generate Blog Post schema
 */
export const generateBlogPostSchema = (metadata: PageMetadata) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: metadata.title,
  description: metadata.description,
  image: metadata.ogImage || DEFAULT_IMAGE,
  datePublished: metadata.publishedDate || new Date().toISOString(),
  dateModified: metadata.modifiedDate || new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: metadata.author || 'BlinkChart',
  },
  url: metadata.canonicalUrl,
});

/**
 * Add JSON-LD script to document head
 */
export const addJSONLDSchema = (schema: Record<string, unknown>): void => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Clear existing JSON-LD schemas (except initial ones)
 */
export const clearJSONLDSchemas = (): void => {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  // Keep only the first few (organization, website schemas), remove page-specific ones
  if (scripts.length > 2) {
    for (let i = 2; i < scripts.length; i++) {
      scripts[i].remove();
    }
  }
};