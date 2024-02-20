"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./contexts/AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import MuiTheme from "./theme/MuiTheme";
import GoogleAnalytics from "./components/GoogleAnalytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
