"use client";

import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Carousel from "@/components/Carousel/Carousel";

const page = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
              <Badge variant="outline" className="backdrop-blur-sm bg-white/80 border-primary/20">
                <Sparkles className="mr-2 size-4" />
                Curated Collection
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Welcome to
                <span className="block text-primary mt-2">
                  Matt's Library
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Discover a carefully curated collection of books spanning fiction, non-fiction, horror, and computer science. Each book represents a journey worth taking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/Books">
                  <Button size="lg" className="w-full sm:w-auto group">
                    <BookOpen className="mr-2 size-5" />
                    Browse Collection
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/Top5">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Top 5
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">33+</div>
                  <div className="text-sm text-muted-foreground">Books</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-sm text-muted-foreground">Genres</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-sm text-muted-foreground">Authors</div>
                </div>
              </div>
            </div>

            {/* Right Content - Carousel */}
            <div className="w-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl border bg-white/50 backdrop-blur-sm p-6">
                <Carousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why This Library?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              More than just a collection, it's a reflection of intellectual curiosity and diverse interests.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Collection</h3>
              <p className="text-muted-foreground">
                From classic horror to modern computer science, explore books across multiple genres and eras.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Carefully Curated</h3>
              <p className="text-muted-foreground">
                Each book has been personally read and selected for its unique value and impact.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ArrowRight className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy to Explore</h3>
              <p className="text-muted-foreground">
                Filter by genre, author, or publication date. Search and paginate through the entire collection effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
