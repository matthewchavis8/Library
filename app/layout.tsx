import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt's Library",
  description: "A curated collection of great books spanning multiple genres",
  icons: {
    icon: "/BookIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <div
          className="flex flex-col min-h-screen bg-scroll bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/library-backgroundimage.jpg')",
          }}
        >
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
