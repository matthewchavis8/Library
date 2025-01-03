// components/Carousel/Carousel.tsx

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { Book } from "./types";

const Carousel: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Optional: Loading and Error States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
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

  // Update selected index on Embla's select event
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

  // Navigation Handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Conditional Rendering based on Loading and Error States
  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="my-8">
      {/* Title */}
      <div className="flex justify-center mb-4">
        <p className="text-3xl " style={{ fontFamily: "Montserrat" }}>
          Books Read Since 2023
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl mx-auto" aria-label="Books Carousel">
        {/* Embla Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {books.map((book, index) => (
              <div
                className="flex-shrink-0 w-80 mx-2" // Increased width for better visibility
                key={book.ID}
                
              >
                <div className="rounded overflow-hidden shadow-lg bg-gray-800 flex flex-col h-full">
                  {/* Image Container with Fixed Dimensions */}
                  <div className="relative w-full h-80"> {/* Fixed height */}
                    <Image
                      src={book.image}
                      alt={book.title}
                      layout="fill" // Makes the image fill the parent container
                      objectFit="" // Ensures the image covers the container
                      className=""
                      priority={index < 3} // Optional: Prioritize loading first few images
                    />
                  </div>
                  <div className="px-6 py-4 flex-1 flex flex-col justify-center">
                    <div className="font-bold text-xl mb-2 text-center text-white">
                      {book.title}
                    </div>
                    <p className="text-gray-300 text-center mt-2">
                      {book.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={clsx(
              "w-3 h-3 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white",
              selectedIndex === index ? "bg-white" : "bg-gray-400"
            )}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
