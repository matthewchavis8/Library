"use client";

import BookCover from "@/components/BookCover";
import HandNote from "@/components/HandNote";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ScrollDrift from "@/components/ScrollDrift";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import type { Book } from "@/lib/books";

export default function TopFiveView({ books }: { books: Book[] }) {
  const { t, genre, description } = useT();

  return (
    <>
      <PageHeader note="top5.note" title="top5.title" intro="top5.intro" />

      <ol className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {books.map((book, i) => {
          const flip = i % 2 === 1;
          return (
            <li
              key={book.ID}
              className="border-t border-line py-14 first:border-t-0 first:pt-4 sm:py-20"
            >
              <div
                className={cn(
                  "grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16",
                  flip && "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
                )}
              >
                <Reveal className={cn("relative mx-auto w-56 sm:w-64", flip && "md:order-2")}>
                  <ScrollDrift distance={56} tilt={flip ? -6 : 6}>
                  <div className={cn("transition-transform duration-700", flip ? "rotate-2" : "-rotate-2")}>
                    <BookCover
                      book={book}
                      sizes="(min-width: 640px) 256px, 224px"
                      priority={i === 0}
                    />
                  </div>
                  </ScrollDrift>
                  {i === 0 && (
                    <HandNote
                      mark="arrow-left"
                      className="absolute top-8 left-full ml-3 hidden rotate-[-6deg] text-2xl whitespace-nowrap lg:inline-flex"
                    >
                      {t("top5.favorite")}
                    </HandNote>
                  )}
                </Reveal>

                <Reveal delay={0.1}>
                  <span className="font-serif text-7xl leading-none text-accent italic sm:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 && (
                    <HandNote className="mt-4 block text-2xl lg:hidden">
                      {t("top5.favorite")}
                    </HandNote>
                  )}
                  <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                    {book.title}
                  </h2>
                  <p className="mt-2 text-lg text-ink-soft">
                    {t("book.by", { author: book.author })}
                  </p>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
                    {description(book)}
                  </p>
                  <p className="mt-6 text-sm text-muted">
                    {genre(book.genre)} · {book.publishDate} ·{" "}
                    {t("home.pagesCount", { n: book.pages })}
                  </p>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
