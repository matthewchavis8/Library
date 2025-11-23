import { BsBookHalf } from "react-icons/bs";
import { BookOpen, Library, Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BsBookHalf className="size-8" />
              <span className="text-xl font-bold">Matt's Library</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A curated collection of great reads spanning fiction, non-fiction, horror, and computer science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold flex items-center gap-2">
              <Library className="size-4" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Books" className="hover:text-foreground transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/Top5" className="hover:text-foreground transition-colors">
                  Top 5 Picks
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="mb-4 font-semibold flex items-center gap-2">
              <BookOpen className="size-4" />
              About
            </h3>
            <p className="text-sm text-muted-foreground">
              This library represents a personal journey through literature, featuring books that have shaped perspectives and sparked imagination.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="size-4 text-red-500 fill-red-500" /> by Matt © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
