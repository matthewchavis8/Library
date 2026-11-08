"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Search, X } from "lucide-react";
import BookGrid from "@/components/BookGrid";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/books";
import { useT, type MessageKey } from "@/lib/i18n";

const SORTS = {
  recent: { label: "shelf.sortRecent" as MessageKey, fn: (a: Book, b: Book) => Number(b.ID) - Number(a.ID) },
  title: { label: "shelf.sortTitle" as MessageKey, fn: (a: Book, b: Book) => sortTitle(a).localeCompare(sortTitle(b)) },
  author: { label: "shelf.sortAuthor" as MessageKey, fn: (a: Book, b: Book) => lastName(a).localeCompare(lastName(b)) },
  year: { label: "shelf.sortYear" as MessageKey, fn: (a: Book, b: Book) => Number(a.publishDate) - Number(b.publishDate) },
} as const;
type SortKey = keyof typeof SORTS;

const sortTitle = (b: Book) => b.title.replace(/^(the|a|an)\s+/i, "");
const lastName = (b: Book) => b.author.split(" ").at(-1) ?? b.author;

export default function ShelfBrowser({ books }: { books: Book[] }) {
  const { t, genre: genreName } = useT();
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
      {/* Controls: one slim bar that stays put while you scroll */}
      <div className="sticky top-16 z-30 -mx-4 mb-10 transition-[translate] duration-500 ease-(--ease-soft) max-sm:in-data-nav-tucked:-translate-y-16 sm:max-md:in-data-nav-tucked:-translate-y-20 border-b border-line bg-paper/90 px-4 py-2.5 backdrop-blur-md sm:top-20 sm:mx-0 sm:rounded-full sm:border sm:py-2 sm:pr-2 sm:pl-2">
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <label className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
            <span className="sr-only">{t("shelf.searchLabel")}</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("shelf.searchPlaceholder")}
              className="h-9 w-full rounded-full border border-line bg-card pr-8 pl-10 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-paper-deep hover:text-ink"
              >
                <X className="size-3.5" />
                <span className="sr-only">{t("shelf.clearSearch")}</span>
              </button>
            )}
          </label>

          <div className="no-scrollbar order-last -mx-4 flex w-[calc(100%+2rem)] gap-1.5 overflow-x-auto px-4 sm:order-none sm:mx-0 sm:w-auto sm:min-w-0 sm:flex-1 sm:px-0 sm:[mask-image:linear-gradient(90deg,#000_92%,transparent)]">
            {genres.map(([name, count]) => (
              <button
                key={name}
                type="button"
                onClick={() => setGenre(name)}
                className={cn(
                  "h-9 shrink-0 rounded-full border px-3 text-sm transition-colors",
                  genre === name
                    ? "border-accent bg-accent text-paper"
                    : "border-transparent text-ink-soft hover:border-line hover:bg-card hover:text-ink",
                )}
              >
                {name === "All" ? t("shelf.all") : genreName(name)}
                <span className={cn("ml-1 text-xs", genre === name ? "text-paper/70" : "text-muted")}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          <label className="relative shrink-0">
            <span className="sr-only">{t("shelf.sort")}</span>
            <ArrowDownUp className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 cursor-pointer appearance-none rounded-full border border-line bg-card pr-4 pl-8 text-sm text-ink hover:border-ink-soft focus:border-accent focus:outline-none"
            >
              {(Object.keys(SORTS) as SortKey[]).map((key) => (
                <option key={key} value={key}>
                  {t(SORTS[key].label)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {visible.length > 0 ? (
        <BookGrid id="shelf" books={visible} />
      ) : (
        <div className="py-24 text-center">
          <p className="font-hand text-3xl text-accent">{t("shelf.emptyNote")}</p>
          <p className="mt-2 text-ink-soft">
            {t("shelf.emptyText")}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-paper"
          >
            {t("shelf.showAll")}
          </button>
        </div>
      )}
    </section>
  );
}
