import type {Metadata} from 'next';
import { Saira_Condensed, EB_Garamond, Space_Mono } from 'next/font/google';
import { ScrollToTop } from '@/src/components/layout/scroll-to-top';
import './globals.css';

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: '400',
});

const sairaCondensed = Saira_Condensed({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-saira-condensed',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'IA DEVELOPIX',
  description: 'Enterprise-grade Next.js robotics e-commerce application',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${garamond.variable} ${sairaCondensed.variable} ${spaceMono.variable} bg-canvas text-primary font-body antialiased`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
