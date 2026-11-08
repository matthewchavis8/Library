"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import BookGrid from "@/components/BookGrid";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/books";

const SORTS = {
  recent: { label: "Recent", fn: (a: Book, b: Book) => Number(b.ID) - Number(a.ID) },
  title: { label: "Title", fn: (a: Book, b: Book) => sortTitle(a).localeCompare(sortTitle(b)) },
  author: { label: "Author", fn: (a: Book, b: Book) => lastName(a).localeCompare(lastName(b)) },
  year: { label: "Year", fn: (a: Book, b: Book) => Number(a.publishDate) - Number(b.publishDate) },
} as const;
type SortKey = keyof typeof SORTS;

const sortTitle = (b: Book) => b.title.replace(/^(the|a|an)\s+/i, "");
const lastName = (b: Book) => b.author.split(" ").at(-1) ?? b.author;

export default function ShelfBrowser({ books }: { books: Book[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState<SortKey>("recent");

  const genres = useMemo(() => {
    const counts = new Map<string, number>();
    books.forEach((b) => counts.set(b.genre, (counts.get(b.genre) ?? 0) + 1));
    return [
      ["All", books.length] as const,
      ...[...counts.entries()].sort((a, b) => b[1] - a[1]),
    ];
  }, [books]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books
      .filter((b) => genre === "All" || b.genre === genre)
      .filter(
        (b) =>
          !q ||
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q),
      )
      .sort(SORTS[sort].fn);
  }, [books, query, genre, sort]);

  const reset = () => {
    setQuery("");
    setGenre("All");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-4 mb-10 border-b border-line bg-paper/85 px-4 py-4 backdrop-blur-md sm:top-20 sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Search books</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, authors, anything"
              className="h-11 w-full rounded-full border border-line bg-card pr-10 pl-11 text-[0.95rem] text-ink placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-paper-deep hover:text-ink"
              >
                <X className="size-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </label>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort</span>
            <div className="flex rounded-full border border-line bg-card p-1">
              {(Object.keys(SORTS) as SortKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSort(key)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 transition-colors",
                    sort === key ? "text-paper" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {sort === key && (
                    <motion.span
                      layoutId="sort-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 450, damping: 36 }}
                    />
                  )}
                  <span className="relative">{SORTS[key].label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {genres.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => setGenre(name)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                genre === name
                  ? "border-accent bg-accent text-paper"
                  : "border-line bg-card text-ink-soft hover:border-ink-soft hover:text-ink",
              )}
            >
              {name}
              <span className={cn("ml-1.5 text-xs", genre === name ? "text-paper/70" : "text-muted")}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <BookGrid id="shelf" books={visible} />
      ) : (
        <div className="py-24 text-center">
          <p className="font-hand text-3xl text-accent">hmm, nothing here yet</p>
          <p className="mt-2 text-ink-soft">
            I haven&rsquo;t read anything that matches that.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-paper"
          >
            Show everything
          </button>
        </div>
      )}
    </section>
  );
}
