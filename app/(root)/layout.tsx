import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import sytles from "../bg.module.css"
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
    <><div className={sytles.backgroundImage}> {children}</div><Footer /></>
  );
}