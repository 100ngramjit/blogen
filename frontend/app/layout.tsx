import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Noto_Sans({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Theme
          accentColor="violet"
          grayColor="gray"
          panelBackground="translucent"
          scaling="100%"
          radius="medium"
          appearance="light"
        >
          <Providers>{children}</Providers>
        </Theme>
        <Toaster />
      </body>
    </html>
  );
}
