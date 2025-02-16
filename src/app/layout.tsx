import Header from "@/components/header";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";


const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "John Nguuyen | Portfolio",
  description: "John Nguyen is a software engineer student based in Aarhus, Denmark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} antialiased`}>
        
        <Header />
        {children}
      </body>
    </html>
  );
}
