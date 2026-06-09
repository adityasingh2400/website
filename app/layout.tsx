import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://adityasingh.dev'),
  title: 'Aditya Singh',
  description:
    'Aditya Singh. CS at UCSB. I build voice interfaces, agents, and automation tools, and help maintain the open source libraries the field is built on.',
  keywords: [
    'Aditya Singh',
    'AI',
    'agents',
    'voice',
    'open source',
    'UCSB',
    'software engineer',
  ],
  authors: [{ name: 'Aditya Singh' }],
  openGraph: {
    title: 'Aditya Singh',
    description:
      'I build voice interfaces, agents, and automation tools, and help maintain the open source libraries the field runs on.',
    type: 'website',
    url: 'https://adityasingh.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} ${mono.variable} antialiased`}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
