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
      <body className="min-h-screen flex bg-[#0a0f1e]">
        <Cursor />
        <Sidebar />
        <main className="flex-1 ml-56 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
