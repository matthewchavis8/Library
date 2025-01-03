// app/layout.tsx or pages/_app.tsx

import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt's Library",
  description: "Not sure yet",
  icons: {
    icon: "/favicon.ico", // Update this path to your favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body suppressHydrationWarning  className="min-h-screen flex flex-col">
        {/* Background Wrapper */}
        <div
          className="flex-grow bg-scroll bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/images/library-backgroundimage.jpg')",
          }}
        >
          {/* Overlay for better readability (Optional) */}
          <div className=" min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-16">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
