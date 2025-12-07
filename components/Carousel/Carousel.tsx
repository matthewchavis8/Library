"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

import {
  Carousel as EmblaCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Book } from "./types";

const BooksCarousel = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) throw new Error("Unable to fetch data");
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const featuredBooks = books.slice(0, 12);

  if (featuredBooks.length === 0) {
    return null;
  }

  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-rose-100/70 bg-gradient-to-br from-rose-50 via-white to-slate-50 p-4 shadow-lg sm:p-8">
      <div className="mb-6 flex flex-col gap-2 text-center sm:text-left">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-rose-500 sm:mx-0 sm:text-xs">
          <Sparkles className="size-3.5" />
          Since 2023
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-3xl">
            Books I&apos;ve finished
          </h2>
        </div>
      </div>

      <EmblaCarousel opts={{ loop: true, align: "start" }} className="pb-10">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {featuredBooks.map((book) => (
            <CarouselItem
              key={book.ID}
              className="basis-[90%] pl-2 sm:basis-[70%] sm:pl-4 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="group relative flex h-64 w-full items-center justify-center sm:h-72">
                <div className="animate-book-float relative h-full w-40 overflow-hidden rounded-[1.4rem] border border-white/60 bg-white shadow-xl transition duration-500 group-hover:scale-105 group-hover:shadow-2xl sm:w-48">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 w-32 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 text-center text-[11px] shadow sm:w-40 sm:px-4">
                  <p className="font-semibold text-neutral-900 line-clamp-1">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 sm:text-[11px]">
                    {book.author}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </EmblaCarousel>
    </section>
  );
};

export default BooksCarousel;
