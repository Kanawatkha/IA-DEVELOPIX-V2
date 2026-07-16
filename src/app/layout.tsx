import type {Metadata} from 'next';
import { Saira_Condensed, EB_Garamond, Space_Mono } from 'next/font/google';
import { ScrollToTop } from '@/src/components/layout/shared/scroll-to-top';
import './globals.css';
import { commonContent } from '@/src/content';
import { brandImages } from '@/src/lib/media';

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
  title: commonContent.metadata.title,
  description: commonContent.metadata.description,
  icons: {
    icon: brandImages.favicon,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${garamond.variable} ${sairaCondensed.variable} ${spaceMono.variable} bg-canvas text-primary font-body antialiased overflow-x-hidden`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
