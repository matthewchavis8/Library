"use client";

import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Carousel from "@/components/Carousel/Carousel";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-white py-12 sm:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-16">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-7 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <Badge variant="outline" className="backdrop-blur-sm bg-white/80 border-primary/20">
                  <Sparkles className="mr-2 size-4" />
                  Curated Collection
                </Badge>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  Welcome to
                  <span className="block text-primary mt-2">
                    Matt&rsquo;s Library
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Discover a carefully curated collection of books spanning fiction, non-fiction, horror, and computer science. Each book represents a journey worth taking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
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
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 pt-4">
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
              <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none rounded-2xl overflow-hidden border bg-white/70 shadow-xl p-4 sm:p-6">
                <Carousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why This Library?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              More than just a collection, it&rsquo;s a reflection of intellectual curiosity and diverse interests.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

export default HomePage;
