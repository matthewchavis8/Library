"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  Calendar,
  Loader2,
  NotebookPen,
  Star,
  User,
} from "lucide-react";
import { WishlistBook } from "./types";
import { Badge } from "@/components/ui/badge";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("/wishlist.json");
        if (!res.ok) {
          throw new Error("Unable to load wish list");
        }
        const data: WishlistBook[] = await res.json();
        setWishlist(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const renderTypeLabel = (item: WishlistBook) => {
    if (item.type === item.genre) {
      if (item.type === "Fiction") return "Fiction Novel";
      if (item.type === "Non-fiction") return "Non-fiction Book";
    }
    return item.type;
  };

  return (
    <section className="py-12 min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600">
            <NotebookPen className="size-3.5" />
            Future reads
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Wish List
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Titles I&rsquo;m excited to pick up next—curated for inspiration, research, and world-building fuel.
          </p>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center gap-2 py-20 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            <span>Gathering ideas...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && wishlist.length > 0 && (
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item.ID}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {item.currentlyReading && (
                  <div className="absolute left-3 top-3 z-10">
                    <Badge className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50/90 px-3 py-1 text-xs font-medium text-amber-900">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      Currently reading
                    </Badge>
                  </div>
                )}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-sm md:text-base font-semibold leading-snug text-neutral-900 line-clamp-2">
                        {item.title}
                      </h2>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-medium rounded-full border-neutral-200 bg-white/80 text-neutral-700"
                      >
                        {renderTypeLabel(item)}
                      </Badge>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                      <User className="size-3" />
                      <span className="truncate">{item.author}</span>
                    </p>
                  </div>

                  <p className="mb-3 text-xs md:text-sm text-neutral-500 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="mt-4 space-y-2 text-[11px] text-neutral-500">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="rounded-full bg-neutral-900 text-white text-[10px] px-2 py-0.5">
                        {item.genre}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>{item.publishDate}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bookmark className="size-3" />
                        <span>{item.pages} pages</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && wishlist.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>Nothing on the wish list yet—time to scout the next obsession.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;


