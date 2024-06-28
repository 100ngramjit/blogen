import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogen",
  description: "get blogen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
