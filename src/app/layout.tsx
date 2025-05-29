import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalHeader from "@/components/layout/conditional-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trashsure",
  description: "Platform jual beli sampah mentah dan produk daur ulang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <ConditionalHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
