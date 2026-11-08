"use client";

import BookCover from "@/components/BookCover";
import BookGrid from "@/components/BookGrid";
import HandNote from "@/components/HandNote";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ScrollDrift from "@/components/ScrollDrift";
import { useT } from "@/lib/i18n";
import type { Book } from "@/lib/books";

type Props = { reading?: Book; waiting: Book[] };

export default function UpNextView({ reading, waiting }: Props) {
  const { t, genre, description } = useT();

  return (
    <>
      <PageHeader note="upNext.note" title="upNext.title" intro="upNext.intro" />

      {reading && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative grid items-center gap-10 rounded-[32px] bg-card p-8 ring-1 ring-line sm:grid-cols-[auto_1fr] sm:gap-14 sm:p-12">
            <ScrollDrift distance={36} tilt={-5} className="mx-auto w-44 sm:w-52">
              <div className="-rotate-2">
                <BookCover book={reading} priority sizes="220px" />
              </div>
            </ScrollDrift>
            <div>
              <HandNote className="text-2xl">{t("upNext.readingNow")}</HandNote>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                {reading.title}
              </h2>
              <p className="mt-2 text-lg text-ink-soft">
                {t("book.by", { author: reading.author })}
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">
                {description(reading)}
              </p>
              <p className="mt-6 text-sm text-muted">
                {genre(reading.genre)} · {reading.publishDate} ·{" "}
                {t("home.pagesCount", { n: reading.pages })}
              </p>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <Reveal className="mb-9 border-b border-line pb-5">
          <h2 className="text-3xl sm:text-4xl">{t("upNext.wishlist")}</h2>
          <p className="mt-1 text-sm text-muted">{t("upNext.count", { n: waiting.length })}</p>
        </Reveal>
        <BookGrid id="waiting" books={waiting} />
      </section>
    </>
  );
}
