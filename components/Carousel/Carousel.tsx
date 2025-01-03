import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { Book } from "./types";

const Carousel: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) throw new Error("Error fetching data");
        const data: Book[] = await res.json();
        setBooks(data);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full px-4 sm:px-6 mx-auto max-w-screen-xl">
      <div className="flex justify-center mb-4">
        <p className="text-xl sm:text-2xl md:text-3xl font-montserrat">
          Books Read Since 2023
        </p>
      </div>

      <div className="relative mx-auto" aria-label="Books Carousel">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {books.map((book, index) => (
              <div
                className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.333%]"
                key={book.ID}
              >
                <div className="h-full rounded overflow-hidden shadow-lg bg-gray-800">
                  <div className="relative pt-[133%]">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="rounded-t object-cover"
                      priority={index < 3}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-center text-white line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-300 text-center text-sm sm:text-base">
                      {book.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700/80 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white z-10"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700/80 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white z-10"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={clsx(
              "w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white",
              selectedIndex === index ? "bg-white" : "bg-gray-400"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
