"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./contexts/AuthProvider";
import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

import MuiTheme from "./theme/MuiTheme";
import GoogleAnalytics from "./components/GoogleAnalytics";

function updateMetadata() {
  // Dynamically set title
  document.title = "Kgoods | Ship Worldwide | Free Korean Address";

  // Dynamically set other metadata properties
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      "Buy KPOP, Korean skincare, and any products from Korean shopping sites. Use our free Korean address, consolidation, forwarding, and personal shopper!"
    );
  }

  // Add more dynamic metadata updates as needed
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    updateMetadata();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MuiTheme>
            <main>{children}</main>
          </MuiTheme>
        </AuthProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Kgoods | Ship Worldwide | Free Korean Address",
  description:
    "Buy KPOP, Korean skincare, and any products from Korean shopping sites. Use our free Korean address, consolidation, forwarding, and personal shopper!",
  openGraph: {
    title: "Kgoods | Ship Worldwide",
    description:
      "Buy products from Korean shopping sites. Use our free Korean address, consolidation, forwarding, and personal shopper!",
  },
};
