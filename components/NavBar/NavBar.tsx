"use client";

import { Book, Home, Menu, Trophy } from "lucide-react";
import { BsBookHalf } from "react-icons/bs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold transition-colors hover:text-primary"
          >
            <BsBookHalf className="size-8" />
            <span className="hidden sm:inline">Matt&rsquo;s Library</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Home className="size-4" />
              Home
            </Link>
            <Link
              href="/Books"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Book className="size-4" />
              Books
            </Link>
            <Link
              href="/Wishlist"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Menu className="size-4" />
              Wish List
            </Link>
            <Link
              href="/Top5"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Trophy className="size-4" />
              Top 5
            </Link>
          </div>

          {/* Mobile Menu - Right */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3 text-xl">
                  <BsBookHalf className="size-8" />
                  Matt&rsquo;s Library
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium transition-colors hover:bg-accent"
                >
                  <Home className="size-5" />
                  Home
                </Link>
                <Link
                  href="/Books"
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium transition-colors hover:bg-accent"
                >
                  <Book className="size-5" />
                  Books
                </Link>
                <Link
                  href="/Wishlist"
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium transition-colors hover:bg-accent"
                >
                  <Menu className="size-5" />
                  Wish List
                </Link>
                <Link
                  href="/Top5"
                  className="flex items-center gap-3 rounded-lg p-3 text-base font-medium transition-colors hover:bg-accent"
                >
                  <Trophy className="size-5" />
                  Top 5
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
