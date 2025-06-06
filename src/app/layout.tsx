import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Toaster } from "sonner";






import "../styles/globals.css";





const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Header />
          <main className="pt-16">{children}</main>
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  );
}