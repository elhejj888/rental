'use client';
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "./globals.css";



const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <SessionProvider>

    <html className="min-h-screen bg-white text-black" lang="en">
      <body className="min-h-screen">
      {children}
        </body>
    </html>
    </SessionProvider>

  );
}
