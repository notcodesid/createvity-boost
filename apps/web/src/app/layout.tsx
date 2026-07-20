import type { Metadata } from "next";
import { Hedvig_Letters_Sans, Hedvig_Letters_Serif, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const display = Hedvig_Letters_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const serif = Hedvig_Letters_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Creativity — Think better. Create more.",
  description: "A simple notebook to clear your mind, play fun brainstorming games to boost your creativity, and save your ideas forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
