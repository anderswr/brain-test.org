// /app/layout.tsx
import "./globals.css";
import { I18nProvider } from "./providers/I18nProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cognitive Ability Test – Free Online IQ Estimate",
  description:
    "Take a free, research-inspired cognitive ability test measuring reasoning, math, verbal, spatial, and memory skills.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell">
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
