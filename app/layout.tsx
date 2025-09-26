// app/layout.tsx
export const metadata = { title: "Free IQ Test", description: "ICAR-based, multilingual" };
import "./globals.css";

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
