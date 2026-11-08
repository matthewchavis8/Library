import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCover from "@/components/BookCover";
import BookGrid from "@/components/BookGrid";
import HandNote from "@/components/HandNote";
import Reveal from "@/components/Reveal";
import {
  getBooks,
  getCurrentlyReading,
  getStats,
  getTopFive,
} from "@/lib/books";

export default function HomePage() {
  const stats = getStats();
  const reading = getCurrentlyReading();
  const recent = getBooks().slice(0, 6);
  const topFive = getTopFive();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:px-8 lg:pt-24 lg:pb-28">
        <div>
          <HandNote>hi, I&rsquo;m Matt</HandNote>
          <h1 className="mt-6 text-[2.9rem] leading-[1.02] font-normal sm:text-7xl lg:text-[5.25rem]">
            A shelf of books I&rsquo;ve{" "}
            <em className="text-accent italic">actually</em> read.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
            I started keeping this list my freshman year. Everything here I
            finished cover to cover. Some changed how I think, and a few kept
            me up way too late.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            <Stat value={stats.books} label="books finished" />
            <Stat value={stats.authors} label="authors" />
            <Stat value={stats.pages.toLocaleString()} label="pages turned" />
          </dl>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/Books"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-accent-deep"
            >
              Browse the shelf
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/Top5"
              className="text-[0.95rem] font-medium text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              See my top five
            </Link>
          </div>
        </div>

        {reading && (
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
            <Link href="/Wishlist" className="group block">
              <div className="relative rounded-[28px] bg-card p-8 pb-7 shadow-[0_1px_0_var(--color-line),0_30px_60px_-30px_rgba(35,28,21,0.35)] ring-1 ring-line sm:p-10 sm:pb-8">
                <HandNote
                  mark="arrow-down"
                  className="absolute -top-5 left-6 rotate-[-4deg] text-2xl sm:-left-10"
                >
                  now reading
                </HandNote>
                <div className="mx-auto w-44 rotate-2 transition-transform duration-700 ease-(--ease-soft) group-hover:rotate-0 sm:w-52">
                  <BookCover book={reading} priority sizes="220px" />
                </div>
                <div className="mt-8 text-center">
                  <p className="font-serif text-2xl">{reading.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {reading.author} · {reading.pages} pages
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        )}
      </section>

      {/* Recently finished */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mb-9 flex items-end justify-between gap-6 border-b border-line pb-5">
          <div>
            <HandNote mark="none" className="text-xl">fresh off the nightstand</HandNote>
            <h2 className="mt-1 text-3xl sm:text-4xl">Recently finished</h2>
          </div>
          <Link
            href="/Books"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-accent sm:inline-flex"
          >
            All {stats.books} books
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <BookGrid id="recent" books={recent} variant="row" />
        <Link
          href="/Books"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft sm:hidden"
        >
          All {stats.books} books <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Top five teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/Top5"
            className="group relative block overflow-hidden rounded-[32px] bg-ink px-7 py-12 text-paper sm:px-14 sm:py-16"
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <HandNote mark="none" className="text-2xl text-accent-soft">
                  if you only read five
                </HandNote>
                <h2 className="mt-3 text-4xl leading-tight font-normal sm:text-5xl">
                  My top five, ranked and defended.
                </h2>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-paper/80 transition-colors group-hover:text-paper">
                  See the list
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="flex justify-center pl-6 sm:pl-10">
                {topFive.map((book, i) => (
                  <div
                    key={book.ID}
                    className="-ml-6 w-1/4 max-w-28 transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-2 sm:-ml-10"
                    style={{
                      rotate: `${(i - 2) * 4}deg`,
                      transitionDelay: `${i * 40}ms`,
                      zIndex: 5 - i,
                    }}
                  >
                    <BookCover book={book} sizes="120px" />
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-serif text-4xl leading-none text-ink">{value}</dd>
      <dd className="mt-2 text-sm text-muted">{label}</dd>
    </div>
  );
}
