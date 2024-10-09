import type { Metadata } from "next";
import { Inter } from "next/font/google";
import sytles from "@/app/bg.module.css"
import React from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoNotBroYT",
  description: "My official website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={sytles.backgroundImage} > 
    <Nav />
    {children}
    <Footer /> </div>
  );
}
