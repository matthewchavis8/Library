"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, Calendar, User, ArrowRight } from "lucide-react";
import { Book } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Airbnb-style category pills mapped to underlying genres
const BOOKS_PER_PAGE = 10;

type CategoryFilter = {
  id: string;
  label: string;
  genres?: string[];
  type?: "Fiction" | "Non-fiction";
};

const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: "all", label: "All" },
  {
    id: "fiction",
    label: "Fiction",
    type: "Fiction",
  },
  {
    id: "non-fiction",
    label: "Non-Fiction",
    type: "Non-fiction",
  },
  {
    id: "sci-fi",
    label: "Sci-Fi",
    genres: ["Sci Fi", "Science Fiction"],
  },
  {
    id: "dystopian",
    label: "Dystopian",
    genres: ["Dystopian"],
  },
  { id: "horror", label: "Horror", genres: ["Horror"] },
  { id: "mystery", label: "Mystery", genres: ["Mystery", "Thriller"] },
  {
    id: "cs",
    label: "Computer Science",
    genres: ["Computer Science"],
  },
];

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  // Filter books by search + category pills
  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
      );
    }

    // Category pill filter (maps to underlying genres)
    if (activeCategory !== "all") {
      const category = CATEGORY_FILTERS.find((c) => c.id === activeCategory);

      if (category?.type) {
        filtered = filtered.filter((book) => book.type === category.type);
      } else if (category?.genres && category.genres.length > 0) {
        filtered = filtered.filter((book) =>
          category.genres?.includes(book.genre)
        );
      }
    }

    return filtered;
  }, [books, searchQuery, activeCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Browse the library
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Warm, curated reads across fiction, non-fiction, sci-fi, horror and more.
          </p>
        </div>

        {/* Top bar: search + Airbnb-style pill filters */}
        <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
          {/* Search */}
          <div className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, author, or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-full border-neutral-200 bg-white pl-9 pr-10 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearFilters}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category pills + result count */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2 md:gap-3 min-w-max pb-1">
                {CATEGORY_FILTERS.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={[
                        "whitespace-nowrap rounded-full border px-3.5 py-2 text-xs md:text-sm font-medium transition-colors",
                        "hover:border-neutral-300 hover:bg-neutral-100",
                        isActive
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 bg-white text-neutral-700",
                      ].join(" ")}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simple count, right aligned on larger screens */}
            <div className="hidden md:flex flex-none text-xs text-muted-foreground">
              {filteredBooks.length} book
              {filteredBooks.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {currentBooks.length > 0 ? (
          <>
            <div className="grid gap-6 md:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
              {currentBooks.map((book) => (
                <div
                  key={book.ID}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                    <div className="mb-3">
                      <h3 className="text-sm md:text-base font-semibold leading-snug text-neutral-900 line-clamp-2">
                        {book.title}
                      </h3>
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
                          <span>{book.pages} pages</span>
                        </span>
                      </div>

                      <div className="pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex w-full items-center justify-between rounded-xl px-2 text-xs text-neutral-800 hover:bg-neutral-100"
                        >
                          <span>View details</span>
                          <ArrowRight className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center pb-4">
                <Pagination className="w-auto">
                  <PaginationContent className="gap-1">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={[
                          "rounded-full border border-neutral-300 bg-white text-xs hover:bg-neutral-100",
                          currentPage === 1 ? "pointer-events-none opacity-40" : "",
                        ].join(" ")}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => {
                        // Show first page, last page, current page, and pages around current
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 &&
                            pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNumber);
                                }}
                                isActive={currentPage === pageNumber}
                                className="rounded-full border border-neutral-200 bg-white text-xs hover:bg-neutral-100 aria-[current=page]:border-neutral-900 aria-[current=page]:bg-neutral-900 aria-[current=page]:text-white"
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={[
                          "rounded-full border border-neutral-300 bg-white text-xs hover:bg-neutral-100",
                          currentPage === totalPages
                            ? "pointer-events-none opacity-40"
                            : "",
                        ].join(" ")}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No books found matching your criteria.
            </p>
            <Button onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BooksPage;
