import type React from "react";
import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "E-commerce Admin Dashboard",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
