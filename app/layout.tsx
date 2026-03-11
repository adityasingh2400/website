import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Syne } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aditya Singh | Systems, Agents, and Product Engineering',
  description:
    'Editorial portfolio for Aditya Singh: agent systems, full-stack product engineering, robotics research, and open-source experiments.',
  keywords: [
    'full-stack',
    'AI',
    'agents',
    'LangGraph',
    'FastAPI',
    'Next.js',
    'product engineering',
    'automation',
    'robotics',
  ],
  authors: [{ name: 'Aditya Singh' }],
  openGraph: {
    title: 'Aditya Singh | Systems, Agents, and Product Engineering',
    description:
      'Agent systems, full-stack builds, robotics research, and open-source experiments.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} ${mono.variable} antialiased`}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
