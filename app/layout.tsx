import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";



export const metadata: Metadata = {
  title: "RoNotBroYT",
  description: "My official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(242, 96%, 57%)", // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
        },
      }}
    >
      
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background dark:text-white text-black font-sans antialiased",
            GeistSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Analytics />
           
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
