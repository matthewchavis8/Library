"use client";

import { useEffect, useState } from "react";
import { Calendar, User, Bookmark, Crown } from "lucide-react";
import { Book } from "./types";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [topFiveBooks, setTopFiveBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bookIds = ["31", "23", "2", "22", "28"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const data: Book[] = await res.json();

        const filtered = data.filter((book) => bookIds.includes(book.ID));

        const sortedFiltered = bookIds
          .map((id) => filtered.find((book) => book.ID === id))
          .filter((book): book is Book => book !== undefined);

        setTopFiveBooks(sortedFiltered);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Unknown error");
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getTypeLabel = (book: Book) => {
    if (book.type === book.genre) {
      if (book.type === "Fiction") {
        return "Fiction Novel";
      }
      if (book.type === "Non-fiction") {
        return "Non-fiction Book";
      }
    }
    return book.type;
  };

  return (
    <section className="py-12 min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600">
            <Crown className="size-3.5 text-yellow-500" />
            Curated selection
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Matt&apos;s Top Five Books
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            A hand-picked list of favorites across fiction, horror, sci-fi, and more.
          </p>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="py-16 text-center text-muted-foreground">
            <p>Loading top picks...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="py-16 text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && topFiveBooks.length > 0 && (
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {topFiveBooks.map((book, index) => (
              <div
                key={book.ID}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Rank badge */}
                <div className="absolute left-3 top-3 z-10">
                  <Badge className="rounded-full bg-neutral-900 text-white text-xs px-3 py-1 border-0 flex items-center gap-1">
                    <span>#{index + 1}</span>
                  </Badge>
                </div>

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                  <div className="mb-3">
                    <h2 className="text-sm md:text-base font-semibold leading-snug text-neutral-900 line-clamp-2">
                      {book.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-neutral-100 text-neutral-600 border-0">
                        {book.genre}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-medium rounded-full border-neutral-200 bg-white/80 text-neutral-700"
                      >
                        {getTypeLabel(book)}
                      </Badge>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                      <User className="size-3" />
                      <span className="truncate">{book.author}</span>
                    </p>
                  </div>

                  <p className="mb-4 text-xs md:text-sm text-neutral-500 line-clamp-3">
                    {book.description}
                  </p>

                  <div className="mt-auto space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>{book.publishDate}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bookmark className="size-3" />
                        <span>{book.pages} pages</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && topFiveBooks.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No top books available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}
