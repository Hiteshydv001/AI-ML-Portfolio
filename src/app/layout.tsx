import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hitesh Kumar - AI/ML Engineer",
  description:
    "A high-fidelity visualization of my end-to-end AI/ML pipeline. Witness the journey from raw data to deployed intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={twMerge(inter.className, "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50")}> 
        <Sidebar />
        <div className="pt-20 px-4 pb-4 lg:pt-4 lg:ml-64">
          <div className="bg-white/70 backdrop-blur-xl rounded-lg border border-gray-200/60 min-h-screen">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}