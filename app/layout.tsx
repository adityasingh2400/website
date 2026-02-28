import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FluidBackground } from "@/components/ui/FluidBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aditya Singh | Full-stack + AI Engineering",
  description: "CS student and engineering lead building AI copilots that turn messy business rules into auditable systems. Full-stack + LLM engineering.",
  keywords: ["full-stack", "AI", "LLMs", "FastAPI", "Next.js", "Supabase", "product engineering", "startups", "RevOps", "automation", "robotics"],
  authors: [{ name: "Aditya Singh" }],
  openGraph: {
    title: "Aditya Singh | Full-stack + AI Engineering",
    description: "CS student and engineering lead building AI copilots that turn messy business rules into auditable systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <FluidBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
