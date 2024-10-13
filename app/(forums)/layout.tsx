import type { Metadata } from "next";
import { Inter } from "next/font/google";
import sytles from "@/app/bg.module.css";
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
    <div className={sytles.backgroundImage} id="forum">
      {" "}
      {children}{" "}
    </div>
  );
}
