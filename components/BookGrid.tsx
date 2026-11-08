"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import BookCover from "./BookCover";
import BookDetail from "./BookDetail";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/books";
import { useT } from "@/lib/i18n";

type Props = {
  books: Book[];
  /** Unique per grid, so the same book can appear twice on one page */
  id: string;
  variant?: "grid" | "row";
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Covers you can click to open. Smoothly reflows when the list changes. */
export default function BookGrid({
  books,
  id,
  variant = "grid",
  className,
}: Props) {
  const [open, setOpen] = useState<Book | null>(null);
  const reduce = useReducedMotion();
  const { t } = useT();

  return (
    <LayoutGroup id={id}>
      <motion.ul
        layout={variant === "grid"}
        className={cn(
          variant === "grid"
            ? "grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-7 lg:grid-cols-4 xl:grid-cols-5"
            : "no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-2 pb-6 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-7 sm:overflow-visible sm:px-0 lg:grid-cols-6",
          className,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {books.map((book, i) => (
            <motion.li
              key={book.ID}
              layout={variant === "grid" ? "position" : false}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.06, ease }}
              className={cn(
                variant === "row" && "w-[42vw] max-w-44 shrink-0 snap-start sm:w-auto sm:max-w-none",
              )}
            >
              <BookTile book={book} onOpen={() => setOpen(book)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <BookDetail
        book={open}
        onClose={() => setOpen(null)}
        note={open?.currentlyReading ? t("upNext.readingNow") : undefined}
      />
    </LayoutGroup>
  );
}

function BookTile({ book, onOpen }: { book: Book; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full cursor-pointer text-left"
    >
      <motion.div
        layoutId={`cover-${book.ID}`}
        transition={{ duration: 0.55, ease }}
        className="transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-1.5 group-hover:-rotate-1"
      >
        <BookCover book={book} />
      </motion.div>
      <h3 className="mt-4 line-clamp-2 font-serif text-[1.05rem] leading-snug text-ink decoration-accent/50 underline-offset-4 group-hover:underline">
        {book.title}
      </h3>
      <p className="mt-1 truncate text-sm text-muted">{book.author}</p>
    </button>
  );
}
