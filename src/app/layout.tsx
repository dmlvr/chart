import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useSelectedLayoutSegment } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chart",
  description: "Chart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
