"use client";

import { Inter } from "next/font/google";
import AuthProvider from "./contexts/AuthProvider";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

import MuiTheme from "./theme/MuiTheme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Kgoods | Ship worldwide | Free Korean Address</title>
        <meta name="description" content="Kgoods Overseas delivery" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <MuiTheme>
            <main>{children}</main>
          </MuiTheme>
        </AuthProvider>
      </body>
    </html>
  );
}
