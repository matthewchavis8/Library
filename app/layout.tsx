import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import "./globals.css";
import Navbar from "@/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Matt's Library",
  description: "Not sure yet",
  icons: {
    icon: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        
          {<Navbar/>}
          <main className="flex-grow">{children}</main>
          {<Footer />}
      
      </body>
    </html>
  );
}
