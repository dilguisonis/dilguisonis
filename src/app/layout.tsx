import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danilo Ilguisonis | Software Engineer",
  description: "Software Engineer focused on AI and production systems. B.Sc. & M.Sc. Computer Science @ UBA",
  keywords: ["Software Engineer", "AI", "Full Stack", "TypeScript", "Python", "Buenos Aires"],
  authors: [{ name: "Danilo Ilguisonis" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Danilo Ilguisonis | Software Engineer",
    description: "Software Engineer focused on AI and production systems",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
