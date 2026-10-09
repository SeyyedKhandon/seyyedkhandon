/** What the profile panels say. Kept in step with index.html. */

export const stats = [
  { value: '484K', label: 'VS Code installs' },
  { value: '9', label: 'extensions' },
  { value: '3', label: 'books & courses' },
  { value: '10+', label: 'years building' },
];

export const packs = [
  { name: 'FiraCode', text: 'Programming-ligature font, zero-config.', count: '284K', width: 100, image: 'firacode.jpg' },
  { name: 'FPack', text: 'Frontend essentials.', count: '47.5K', width: 16.7, image: 'fpack-banner.jpg' },
  { name: 'TPack', text: 'Theme, icon and font pack.', count: '46.6K', width: 16.4, image: 'tpack.jpg' },
  { name: 'GPack', text: 'Git essentials.', count: '41.5K', width: 14.6, image: 'gpack.jpg' },
  { name: 'QPack', text: 'Web quality and metrics.', count: '26K', width: 9.2, image: 'qpack.jpg' },
  { name: 'EPack', text: 'Developer-experience enhancers.', count: '20.9K', width: 7.4, image: 'epack.jpg' },
  { name: 'ZPack', text: 'Pro pack for frontend developers.', count: '17.3K', width: 6.1, image: 'zpack-banner.jpg' },
];

export interface Product {
  name: string;
  meta: string;
  text: string;
  image: string;
  icon?: string;
  /** Which part of the screenshot stays visible in the card. */
  position?: string;
}

export const chromeExtensions: Product[] = [
  {
    name: 'Price History for Amazon',
    meta: 'Chrome extension · JavaScript · MIT',
    text: 'Open any Amazon product’s price history on CamelCamelCamel or Keepa in one click.',
    image: 'amazon-promo.jpg',
    icon: 'amazon-icon.png',
  },
  {
    name: 'Account Switcher for Reddit',
    meta: 'Chrome extension · TypeScript · MIT',
    text: 'The mobile app’s account switching, right in reddit.com’s profile menu. No tracking.',
    image: 'reddit-promo.jpg',
    position: 'center 25%',
    icon: 'reddit-icon.png',
  },
];

export const otherTools: Product[] = [
  {
    name: 'Bitcoin JS Solo Miner',
    meta: 'Node.js and browser · JavaScript · MIT',
    text: 'A working Stratum V1 miner for server CPUs, browser workers or WebGPU, with a live dashboard.',
    image: 'miner-poster.jpg',
  },
  {
    name: 'Bavin',
    meta: 'Desktop app · C# · GPL-2.0',
    text: 'A real-time packet analyzer that shows traffic as a stacked TCP/IP protocol view.',
    image: 'bavin-screen.jpg',
  },
];

export const learn = [
  {
    name: 'Coach: Lead the Right Way',
    meta: 'Book · Persian and English',
    text: 'Find your path to team lead: goals, resources and a plan.',
    image: 'coach-cover.jpg',
  },
  {
    name: 'Stack Overflow The Right Way',
    meta: 'Book and course',
    text: 'The missing manual for Stack Overflow, Reddit, GitHub and other communities.',
    image: 'so-cover.jpg',
  },
  {
    name: 'Webpack 4 the Right Way',
    meta: 'Video course · YouTube',
    text: 'From your first config to a production setup, step by step.',
  },
];

export interface Topic {
  tone: 'blue' | 'green' | 'purple' | 'red';
  icon: string;
  name: string;
  text: string;
  tags: string[];
}

export const topics: Topic[] = [
  {
    tone: 'blue',
    icon: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
    name: 'Financial trading web apps',
    text: 'A professional trading platform built end to end: watchlists, screeners, charts and order-book reliability.',
    tags: ['TypeScript', 'Vue', 'Kotlin'],
  },
  {
    tone: 'green',
    icon: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M9 12h6M9 16h4"/>',
    name: 'Internal business tools',
    text: '30+ API endpoints, a Redis cache and failover that handled 3x more load at peak.',
    tags: ['Node.js', 'Redis', 'Docker'],
  },
  {
    tone: 'purple',
    icon: '<path d="M4 5h16v11H9l-5 4z"/>',
    name: 'Real-time messaging',
    text: 'A Telegram-style business messenger as a PWA, for up to 100,000 users.',
    tags: ['React', 'XMPP', 'IndexedDB', 'PWA'],
  },
  {
    tone: 'red',
    icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    name: 'Security and device management',
    text: 'Firewall management, banking device management and a form generator that automated 100% of huge forms.',
    tags: ['Vue', 'React', 'WebSocket'],
  },
  {
    tone: 'blue',
    icon: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    name: 'Developer experience and leadership',
    text: 'A starter kit that sped up new projects by 40%, 70%+ test coverage, mentoring 15+ developers.',
    tags: ['Jest', 'Storybook', 'MSW'],
  },
  {
    tone: 'green',
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-8 7"/>',
    name: 'Imaging and industrial apps',
    text: 'X-ray scanner front ends and a browser library that processes ~30 MB images.',
    tags: ['JavaScript', 'D3.js', 'Python'],
  },
];

export const handles = ['linkedin', 'github', 'stackoverflow', 'youtube', 'marketplace', 'adplist'];
