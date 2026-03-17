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
        url: '/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'ClawMore Blog - Agentic Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawMore Blog - AI Content Operations & Autonomous Agents',
    description:
      'Insights into building high-scale AI content engines and autonomous agent architectures.',
    creator: '@clawmore',
    images: ['/og-blog.png'],
  },
};

export default function BlogPage() {
  const apiUrl = process.env.LEAD_API_URL || '';
  return <BlogClient apiUrl={apiUrl} />;
}
