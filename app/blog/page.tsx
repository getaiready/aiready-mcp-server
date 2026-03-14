import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog | ClawMore - AI Content Operations Insights',
  description:
    'Deep dives into AI content operations, autonomous agents, and scaling agency workflows at ClawMore.',
  openGraph: {
    title: 'ClawMore Blog - AI Content Operations & Autonomous Agents',
    description:
      'Insights into building high-scale AI content engines and autonomous agent architectures.',
    url: 'https://clawmore.com/blog',
    images: [
      {
        url: 'https://clawmore.com/logo-text-raw-1024.png',
        width: 1024,
        height: 1024,
        alt: 'ClawMore Logo',
      },
    ],
  },
};

export default function BlogPage() {
  const apiUrl = process.env.LEAD_API_URL || '';
  return <BlogClient apiUrl={apiUrl} />;
}
