// app/layout.tsx
export const metadata = { title: "Free Cognitive Ability IQ-Test", description: "A short, research-inspired IQ estimation across five core cognitive domains." };
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          {children}
        </div>
      </body>
    </html>
  );
}
