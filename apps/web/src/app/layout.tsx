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
  title: "Createvity — Get unstuck. Make the next move.",
  description:
    "A private 10-minute creative reset for turning a messy thought into a direction worth following, without AI doing the thinking for you.",
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
