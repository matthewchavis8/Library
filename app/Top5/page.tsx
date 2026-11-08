import type { Metadata } from "next";
import BookCover from "@/components/BookCover";
import HandNote from "@/components/HandNote";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { getTopFive } from "@/lib/books";

export const metadata: Metadata = { title: "Top 5" };

export default function TopFivePage() {
  const books = getTopFive();

  return (
    <>
      <PageHeader note="if you only read five" title="My Top 5">
        Out of everything on the shelf, these are the ones I keep thinking
        about. The order changes sometimes. The list mostly doesn&rsquo;t.
      </PageHeader>

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
                  <div className={cn("transition-transform duration-700", flip ? "rotate-2" : "-rotate-2")}>
                    <BookCover
                      book={book}
                      sizes="(min-width: 640px) 256px, 224px"
                      priority={i === 0}
                    />
                  </div>
                  {i === 0 && (
                    <HandNote
                      mark="arrow-left"
                      className="absolute top-8 left-full ml-3 hidden rotate-[-6deg] text-2xl whitespace-nowrap lg:inline-flex"
                    >
                      my favorite
                    </HandNote>
                  )}
                </Reveal>

                <Reveal delay={0.1}>
                  <span className="font-serif text-7xl leading-none text-accent italic sm:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 && (
                    <HandNote className="mt-4 block text-2xl lg:hidden">
                      my favorite
                    </HandNote>
                  )}
                  <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                    {book.title}
                  </h2>
                  <p className="mt-2 text-lg text-ink-soft">by {book.author}</p>
                  <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
                    {book.description}
                  </p>
                  <p className="mt-6 text-sm text-muted">
                    {book.genre} · {book.publishDate} · {book.pages} pages
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
