import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt's Library",
  description: "Not sure yet",
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
          className="flex-grow bg-scroll bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('/library-backgroundimage.jpg')",
          }}
        >
          <div className=" min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-16">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
