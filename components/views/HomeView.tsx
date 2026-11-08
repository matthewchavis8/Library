"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCover from "@/components/BookCover";
import BookGrid from "@/components/BookGrid";
import HandNote from "@/components/HandNote";
import Reveal from "@/components/Reveal";
import ScrollDrift from "@/components/ScrollDrift";
import { useT } from "@/lib/i18n";
import type { Book } from "@/lib/books";

type Props = {
  stats: { books: number; authors: number; pages: number };
  reading?: Book;
  recent: Book[];
  topFive: Book[];
};

export default function HomeView({ stats, reading, recent, topFive }: Props) {
  const { t, number } = useT();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:px-8 lg:pt-24 lg:pb-28">
        <div>
          <Reveal>
            <HandNote>{t("home.hello")}</HandNote>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.9rem] leading-[1.02] font-normal sm:text-7xl lg:text-[5.25rem]">
              {t("home.titleStart")}{" "}
              <em className="text-accent italic">{t("home.titleAccent")}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
              {t("home.intro")}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
            <Stat value={stats.books} label={t("home.booksFinished")} />
            <Stat value={stats.authors} label={t("home.authors")} />
            <Stat value={number(stats.pages)} label={t("home.pagesTurned")} />
          </dl>
          </Reveal>

          <Reveal delay={0.32} className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/Books"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-[background-color,scale] duration-200 hover:bg-accent-deep active:scale-[0.96]"
            >
              {t("home.browse")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/Top5"
              className="text-[0.95rem] font-medium text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              {t("home.seeTop")}
            </Link>
          </Reveal>
        </div>

        {reading && (
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
            <Link href="/Wishlist" className="group block transition-[scale] duration-300 ease-(--ease-soft) active:scale-[0.98]">
              <div className="relative rounded-[28px] bg-card p-8 pb-7 shadow-[0_1px_0_var(--color-line),0_30px_60px_-30px_rgba(35,28,21,0.35)] ring-1 ring-line sm:p-10 sm:pb-8">
                <HandNote
                  mark="arrow-down"
                  className="absolute -top-5 left-6 rotate-[-4deg] text-2xl sm:-left-10"
                >
                  {t("home.nowReading")}
                </HandNote>
                <ScrollDrift distance={36} tilt={5} className="mx-auto w-44 sm:w-52">
                  <div className="rotate-2 transition-transform duration-700 ease-(--ease-soft) group-hover:rotate-0">
                    <BookCover book={reading} priority sizes="220px" />
                  </div>
                </ScrollDrift>
                <div className="mt-8 text-center">
                  <p className="font-serif text-2xl">{reading.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {reading.author} · {t("home.pagesCount", { n: reading.pages })}
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
            <HandNote mark="none" className="text-xl">{t("home.freshNote")}</HandNote>
            <h2 className="mt-1 text-3xl sm:text-4xl">{t("home.recent")}</h2>
          </div>
          <Link
            href="/Books"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-accent sm:inline-flex"
          >
            {t("home.allBooks", { n: stats.books })}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <BookGrid id="recent" books={recent} variant="row" />
        <Link
          href="/Books"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft sm:hidden"
        >
          {t("home.allBooks", { n: stats.books })} <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Top five teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href="/Top5"
            className="group relative block overflow-hidden rounded-[32px] bg-ink transition-[scale] duration-300 ease-(--ease-soft) active:scale-[0.985] px-7 py-12 text-paper sm:px-14 sm:py-16"
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <HandNote mark="none" className="text-2xl text-accent-soft">
                  {t("home.topNote")}
                </HandNote>
                <h2 className="mt-3 text-4xl leading-tight font-normal sm:text-5xl">
                  {t("home.topTitle")}
                </h2>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-paper/80 transition-colors group-hover:text-paper">
                  {t("home.seeList")}
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
