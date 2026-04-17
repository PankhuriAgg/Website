import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Pankhuri — Portfolio",
  description: "Personal portfolio of Pankhuri",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#060912]">
        <Cursor />
        <Sidebar />
        <main className="pl-24">
          {children}
        </main>
      </body>
    </html>
  )
}
