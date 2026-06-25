import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Rye } from "next/font/google";
import "./globals.css";

// Display Folk Font
const rye = Rye({
  variable: "--font-rye",
  subsets: ["latin"],
  weight: ["400"],
});

// UI Interface font
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "4th DCCC National Cultural Fiesta 2026",
  description: "Official landing page for the 4th Dhaka College Cultural Club National Cultural Fiesta 2026. Experience the grandest celebration of arts, music, and culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${rye.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#242627] text-[#EAE5D9] flex flex-col font-sans">
        {/* Grain overlay for premium texture */}
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}

