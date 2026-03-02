import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muir College Council",
  description: "The official student government body for Muir College at UC San Diego.",
  icons: {
    icon: [{ url: "/muir-logo.jpeg", type: "image/jpeg" }],
    shortcut: [{ url: "/muir-logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/muir-logo.jpeg", type: "image/jpeg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased bg-[#FDFBF7]">
        {children}
      </body>
    </html>
  );
}
