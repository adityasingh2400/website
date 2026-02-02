import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aditya Singh | Developer",
  description: "Developer focused on building clean, user-friendly digital experiences. View my projects and get in touch.",
  keywords: ["developer", "portfolio", "software engineer", "web development"],
  authors: [{ name: "Aditya Singh" }],
  openGraph: {
    title: "Aditya Singh | Developer",
    description: "Developer focused on building clean, user-friendly digital experiences.",
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
        {children}
      </body>
    </html>
  );
}
