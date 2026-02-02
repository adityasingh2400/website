import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "A portfolio showcasing innovative projects with cutting-edge web technologies and gravitational navigation.",
  keywords: ["portfolio", "developer", "creative", "web development", "3D", "interactive"],
  authors: [{ name: "Aditya" }],
  openGraph: {
    title: "Portfolio | Creative Developer",
    description: "Explore my projects through an innovative gravitational navigation experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-[#0a0a0f] text-white noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
