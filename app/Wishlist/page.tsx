import type { Metadata } from "next";
import BookCover from "@/components/BookCover";
import BookGrid from "@/components/BookGrid";
import HandNote from "@/components/HandNote";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getCurrentlyReading, getWishlist } from "@/lib/books";

export const metadata: Metadata = { title: "Up Next" };

export default function UpNextPage() {
  const reading = getCurrentlyReading();
  const waiting = getWishlist().filter((b) => !b.currentlyReading);

  return (
    <>
      <PageHeader note="the nightstand pile" title="Up Next">
        Books I own and haven&rsquo;t gotten to yet. The one on top is open on
        my nightstand right now.
      </PageHeader>

      {reading && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative grid items-center gap-10 rounded-[32px] bg-card p-8 ring-1 ring-line sm:grid-cols-[auto_1fr] sm:gap-14 sm:p-12">
            <div className="mx-auto w-44 -rotate-2 sm:w-52">
              <BookCover book={reading} priority sizes="220px" />
            </div>
            <div>
              <HandNote className="text-2xl">reading this now</HandNote>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                {reading.title}
              </h2>
              <p className="mt-2 text-lg text-ink-soft">by {reading.author}</p>
              <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">
                {reading.description}
              </p>
              <p className="mt-6 text-sm text-muted">
                {reading.genre} · {reading.publishDate} · {reading.pages} pages
              </p>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal className="mb-9 border-b border-line pb-5">
          <h2 className="text-3xl sm:text-4xl">Waiting their turn</h2>
          <p className="mt-1 text-sm text-muted">{waiting.length} books</p>
        </Reveal>
        <BookGrid id="waiting" books={waiting} />
      </section>
    </>
  );
}
