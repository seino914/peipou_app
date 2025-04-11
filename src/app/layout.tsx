import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "peipou app",
  description: "peipou app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
