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
      {/* Set the correct light gradient background */}
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        )}
      >
        <Sidebar />
        <div className="lg:pl-2 lg:pt-2 flex-1 overflow-y-auto bg-transparent">
          {/* Main content area with a semi-transparent white background and blur */}
          <div className="flex-1 bg-white/70 backdrop-blur-xl min-h-screen lg:rounded-tl-xl border border-transparent lg:border-gray-200/60 overflow-y-auto">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}