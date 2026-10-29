import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import { NavProvider } from "@/context/NavContext";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-red-hat",
  display: "swap",
});

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  variable: "--font-red-hat-mono",
});

export const metadata: Metadata = {
  title: "Javier Mora — UX Product Designer",
  description:
    "Product Designer specializing in Web3, Fintech, and AI-driven products. 8+ years. Miami.",
  keywords: [
    "UX Designer", "Product Designer", "Web3 Designer", "Fintech UX",
    "AI Product Design", "Miami Designer", "Javier Mora", "Design Systems",
  ],
  authors: [{ name: "Javier Mora", url: "https://javiermora.co" }],
  openGraph: {
    type: "website",
    url: "https://javiermora.co",
    title: "Javier Mora — UX Product Designer",
    description: "Product Designer specializing in Web3, Fintech, and AI-driven products.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.variable} ${redHatMono.variable} font-[family-name:var(--font-red-hat)]`}>
        <LangProvider>
          <NavProvider>
            {children}
          </NavProvider>
        </LangProvider>
      </body>
    </html>
  );
}
