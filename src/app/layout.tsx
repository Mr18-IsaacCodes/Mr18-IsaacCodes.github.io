import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: { default: "Isaac Pandraju — Senior Data Engineer", template: "%s | Isaac Pandraju" },
  description: "Isaac Pandraju builds reliable data platforms and production RAG systems with Azure, Databricks, and PySpark. Explore selected work, experience, and expertise.",
  applicationName: "Isaac Pandraju Portfolio",
  authors: [{ name: "Isaac Pandraju" }],
  keywords: ["Isaac Pandraju", "Senior Data Engineer", "Azure", "Databricks", "PySpark", "RAG", "Hyderabad"],
  openGraph: {
    title: "Isaac Pandraju — Data, engineered for impact.",
    description: "Reliable data platforms. Thoughtful engineering. Production AI. Explore selected work by Isaac Pandraju.",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geist.variable} ${spaceGrotesk.variable}`}>
        <Providers>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
