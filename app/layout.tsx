import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";
import { SearchProvider } from "context/search-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Gardian Real Estate",
  description:
    "Find your dream home with Gardian Real Estate - Mackay's Best Real Estate",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SearchProvider>
          <ClientLayout>{children}</ClientLayout>
        </SearchProvider>
      </body>
    </html>
  );
}
