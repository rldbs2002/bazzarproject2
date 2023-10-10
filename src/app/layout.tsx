"use client";

import { Inter } from "next/font/google";
import AuthProvider from "./contexts/AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "One Delivery",
  description: "One Delivery by kiyoonj",
};
import MuiTheme from "./theme/MuiTheme";
import Header from "./landing/Header";

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
