import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { SITE } from '@/lib/data';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MotionFlag from '@/components/MotionFlag';
import RevealRoot from '@/components/Reveal';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://anointedosara.dev'),
  title: `${SITE.short} — ${SITE.role}`,
  description: SITE.intro,
  keywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Anointed Osara'],
  authors: [{ name: SITE.name }],
  /* Every icon is a crop of the AIO monogram (components/Logo.tsx).
     They live in /public and are declared here rather than relying on the
     app/ file convention: binary metadata files fail to build on this setup,
     and declaring `icons` at all replaces the auto-detected set anyway, so
     listing them explicitly keeps the three in one place.
     SVG first for browsers that take it; .ico for the rest and for the
     request browsers make on their own; PNG for iOS, which ignores SVG. */
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: `${SITE.short} — ${SITE.role}`,
    description: SITE.intro,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#09080B',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `MotionFlag` stamps `js-motion` onto this element before React hydrates,
    // which is a deliberate difference from the server HTML — not a bug to patch.
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <MotionFlag />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-mono focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <RevealRoot />
        <Cursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
