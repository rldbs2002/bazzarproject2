"use client";

import { Inter } from "next/font/google";
import AuthProvider from "./contexts/AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import MuiTheme from "./theme/MuiTheme";
import { Footer3 } from "./components/footer";

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
      </body>
    </html>
  );
}
