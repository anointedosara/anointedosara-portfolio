/**
 * Every value here is drawn from the CV and the live deployments — nothing is
 * invented. Screenshots in /public/images/projects are captures of the real
 * sites at 1440x900 (Medium shows the dashboard behind its login wall).
 */

export type ProjectLayout = 'showcase' | 'immersive' | 'editorial' | 'gallery';

export type Project = {
  index: string;
  slug: string;
  name: string;
  kind: string;
  /** Drives a distinct composition per project so no two read as the same card. */
  layout: ProjectLayout;
  summary: string;
  detail: string;
  features: string[];
  stack: string[];
  accent: string;
  /** Tone of the captured screenshot — lets the stage tint itself to the shot. */
  tone: 'dark' | 'light';
  /** The panel colour for this project: a deep, desaturated cast of its accent,
   *  so every card is unmistakably its own product without leaving the dark
   *  palette the rest of the site lives in. */
  panelBg: string;
  /** Where a short frame should crop from. Most sites lead with their header;
   *  Jiwa Space centres its composition, so cropping from the top loses it. */
  focus?: 'top' | 'center';
  image: string;
  live: string;
  code: string;
};

export const projects: Project[] = [
  {
    index: '01',
    slug: 'shoplyft',
    name: 'ShopLyft',
    kind: 'E-Commerce Marketplace',
    layout: 'showcase',
    summary:
      'An online marketplace with category browsing, flash sales, cart, wishlist and user accounts — a fast, conversion-focused and fully responsive storefront.',
    detail:
      'Millions of products across thirteen categories, with deals that refresh through the day. Built as a complete storefront: search and category browsing, product pages, a persistent cart and wishlist, checkout, and an account area with order history.',
    features: [
      'Category and search browsing',
      'Flash sales and daily deals',
      'Cart, wishlist and checkout',
      'Accounts with order history',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    accent: '#E8711C',
    panelBg: '#2A1708',
    tone: 'dark',
    image: '/images/projects/shoplyft.png',
    live: 'https://shop-lyft.vercel.app/',
    code: 'https://github.com/anointedosara/ShopLyft',
  },
  {
    index: '02',
    slug: 'commerce',
    name: 'Commerce',
    kind: 'Full-Stack Store',
    layout: 'immersive',
    summary:
      'A full-stack e-commerce store — browse products, build a cart and check out with signup/login, backed by a typed API and MongoDB.',
    detail:
      'Everything you love, in one place. A typed API layer sits between the storefront and MongoDB, handling catalogue, cart state and authentication so the run from first browse to confirmed order stays quick.',
    features: [
      'Product catalogue and categories',
      'Cart and checkout flow',
      'Signup and login',
      'Typed API over MongoDB',
    ],
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    accent: '#6C5CE7',
    panelBg: '#171430',
    tone: 'dark',
    image: '/images/projects/commerce.png',
    live: 'https://commerce-psi-three-94.vercel.app/',
    code: 'https://github.com/anointedosara/commerce',
  },
  {
    index: '03',
    slug: 'medium',
    name: 'Medium',
    kind: 'Analytics Dashboard',
    layout: 'editorial',
    summary:
      'A full-stack analytics dashboard with authentication and protected routes — interactive charts, real-time stats, earnings and product tables.',
    detail:
      'Behind a login wall sits a dense but calm dashboard: live visitor counts, sales by age, impressions, earnings and per-item breakdowns, all reading from MongoDB through protected routes.',
    features: [
      'Auth with protected routes',
      'Interactive charts',
      'Real-time stats and earnings',
      'Product and item tables',
    ],
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    accent: '#7C5CF0',
    panelBg: '#1A1636',
    tone: 'light',
    image: '/images/projects/medium.png',
    live: 'https://medium-dashboard.vercel.app/',
    code: 'https://github.com/anointedosara/medium-dashboard',
  },
  {
    index: '04',
    slug: 'jiwa-space',
    name: 'Jiwa Space',
    kind: 'Living Spaces Platform',
    layout: 'gallery',
    summary:
      'A full-stack living-space platform — browse and search curated spaces through an elegant onboarding flow and a refined, dark, fully responsive interface.',
    detail:
      'Live space for you. The experience opens on a paced onboarding carousel before handing over to signup and the curated catalogue — serif display type on near-black, with the photography doing the selling.',
    features: [
      'Paced onboarding flow',
      'Curated space browsing',
      'Search and filtering',
      'Signup and login',
    ],
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    accent: '#E8765A',
    panelBg: '#2B1610',
    tone: 'dark',
    focus: 'center',
    image: '/images/projects/jiwa-space.png',
    live: 'https://jiwa-space.vercel.app/',
    code: 'https://github.com/anointedosara/jiwa-space',
  },
  {
    index: '05',
    slug: 'futuretech',
    name: 'FutureTech',
    kind: 'AI News Platform',
    layout: 'immersive',
    summary:
      'A modern AI and tech news platform — featured articles, resources and a striking, fully responsive landing experience.',
    detail:
      'Explore the frontiers of artificial intelligence. News, podcasts and a resource library wrapped in a high-contrast editorial landing page, the hero split between type and deep-space imagery.',
    features: [
      'Featured articles and news',
      'Podcasts section',
      'Resource library',
      'Newsletter capture',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    accent: '#FFC93C',
    panelBg: '#26200A',
    tone: 'dark',
    image: '/images/projects/futuretech.png',
    live: 'https://ai-blog-page.vercel.app/',
    code: 'https://github.com/anointedosara/ai-blog-page',
  },
  {
    index: '06',
    slug: 'lankastay',
    name: 'LankaStay',
    kind: 'Booking Platform',
    layout: 'showcase',
    summary:
      'A hotel and stay booking platform — search availability by location, guests and dates through a clean, conversion-focused UI.',
    detail:
      'Forget busy work, start next vacation. The availability search — dates, party size, location — anchors the page, with most-picked stays and room detail views underneath it.',
    features: [
      'Availability search',
      'Hotels and rooms browsing',
      'Most-picked stays',
      'Conversion-focused layout',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    accent: '#2563FF',
    panelBg: '#0F1734',
    tone: 'light',
    image: '/images/projects/lankastay.png',
    live: 'https://lankastay-alpha.vercel.app/',
    code: 'https://github.com/anointedosara/Lankastay',
  },
  {
    index: '07',
    slug: 'rest-countries',
    name: 'REST Countries Explorer',
    kind: 'Interactive Country Explorer',
    layout: 'gallery',
    summary:
      'An interactive country explorer with searchable country data, region filtering, country details and theme switching, presented through a clean and responsive interface.',
    detail:
      'Where in the world? Every country becomes a card — flag, population, region and capital — searchable by name, filterable by region, each opening a detail view, with a light and dark theme switch carried across the app.',
    features: [
      'Search by country name',
      'Filter by region',
      'Country detail views',
      'Light and dark theme switch',
    ],
    stack: ['Next.js', 'REST API', 'Tailwind CSS'],
    accent: '#2FBF9B',
    panelBg: '#0B2621',
    tone: 'light',
    image: '/images/projects/rest-countries.png',
    live: 'https://rest-countries-api-with-color-theme-inky.vercel.app/',
    code: 'https://github.com/anointedosara/REST-Countries-API-with-color-theme-switcher',
  },
];

export const experience = [
  {
    role: 'Frontend Developer',
    org: 'Cloudolle',
    place: 'United Kingdom — Remote',
    period: '07/2023 — 01/2024',
    points: [
      'Developed and optimized the company landing pages using Next.js and Styled Components, ensuring modern, responsive and accessible user interfaces.',
      'Collaborated with designers to translate Figma wireframes into clean, reusable React components with a consistent design system.',
      'Improved page performance and SEO by implementing server-side rendering and dynamic routing in Next.js.',
    ],
  },
  {
    role: 'Frontend Developer Intern',
    org: 'Zuri Team',
    place: 'Lagos, Nigeria',
    period: '08/2022 — 11/2022',
    points: [
      'Completed a rigorous, fast-paced internship program through to the final stage.',
      'Built multiple frontend projects and shipped responsive web applications.',
      'Collaborated with a team of skilled developers and designers to deliver tasks on schedule.',
    ],
  },
  {
    role: 'B.Sc. Geomatics',
    org: 'University of Benin',
    place: 'Benin City, Nigeria',
    period: '2020 — 2025',
    points: [
      'Faculty of Environmental Science — balanced the degree with continuous, self-driven software development.',
    ],
  },
];

export const stack = [
  { group: 'Frameworks', items: ['React.js', 'Next.js App Router'] },
  { group: 'AI Tools', items: ['Cursor', 'Claude Code', 'Codex', 'GitHub Copilot'] },
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
  { group: 'Styling', items: ['Tailwind CSS', 'Styled Components', 'Mobile-first design'] },
  {
    group: 'Backend & Data',
    items: ['Node.js / API Routes', 'RESTful APIs', 'Authentication', 'MongoDB', 'PostgreSQL'],
  },
  { group: 'Deployment', items: ['Vercel', 'Git & GitHub', 'Environment config'] },
];

export const marqueeWords = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'Accessibility',
  'SSR',
  'Performance',
  'SEO',
  'Design systems',
];

export const stats = [
  { value: '20+', label: 'Projects shipped' },
  { value: '3', label: 'Years building' },
  { value: '1', label: 'Year professional' },
];

export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const SITE = {
  name: 'Anointed Ihinosen Osara',
  short: 'Anointed Osara',
  role: 'Frontend Developer (React & Next.js)',
  /** The hero sets the role as two deliberate lines rather than letting it wrap. */
  roleLines: ['Frontend', 'Developer'],
  sub: 'Full-Stack Capable',
  email: 'anointedosara@gmail.com',
  phone: '+234 912 405 7670',
  phoneHref: '+2349124057670',
  location: 'Nigeria — available remote, worldwide',
  cv: '/anointed-osara-cv.pdf',
  intro:
    'AI-first Frontend Developer with 3 years of experience — including 1 year professional — building scalable, responsive web apps and full-stack products in React and Next.js.',
  bio: [
    'I have shipped 20+ projects, from complete storefronts to dashboards with typed APIs, authentication, MongoDB and PostgreSQL — turning Figma designs into reusable components with a strong focus on performance, SEO, accessibility, SSR and dynamic routing.',
    'I use AI tools to ship faster, and I am looking for a fast-growing startup where I can own products end to end.',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/anointedosara' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anointed-osara' },
    { label: 'X', href: 'https://x.com/lil_ted_03' },
  ],
};
