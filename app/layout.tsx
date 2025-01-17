import type { Metadata } from "next";
import { Header } from "@/components/header";
import "./globals.css";
import "../fonts/stylesheet.css";

export const metadata: Metadata = {
  title: "Edgar Araújo - Personal Blog",
  description: "Personal blog and portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en dark">
      <body className="bg-dark-primary text-white min-h-screen">
        <>
          <Header />
          <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
        </>
      </body>
    </html>
  );
}
