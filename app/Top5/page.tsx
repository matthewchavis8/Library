"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Book } from "./types"; 

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [topFiveBooks, setTopFiveBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bookIds = ["23", "31", "2", "22", "28"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const data: Book[] = await res.json();
        setBooks(data);

        
        const filtered = data.filter((book) => bookIds.includes(book.ID));


        const sortedFiltered = bookIds
          .map((id) => filtered.find((book) => book.ID === id))
          .filter((book): book is Book => book !== undefined);

        setTopFiveBooks(sortedFiltered);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Unknown error");
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="bg-scroll bg-center bg-no-repeat bg-cover flex-grow flex items-center justify-center"
        style={{
          backgroundImage: "url('/library-backgroundimage.jpg')",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat", 
        }}
      >
        <div className="ml-12 mt-32 w-full max-w-7xl px-4">
          
          <div className="flex justify-center mb-8">
            <p
              className="text-3xl"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Matt's Top Five Books
            </p>
          </div>

          {isLoading && (
            <div className="text-center text-white">
              <p>Loading...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-red-500">
              <p>Error: {error}</p>
            </div>
          )}

          {!isLoading && !error && topFiveBooks.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {topFiveBooks.map((book, index) => (
                <div
                  key={book.ID}
                  className="card bg-base-100 shadow-xl max-w-lg mx-auto"
                >
                
                  <div>
                    <img
                      src={book.image}
                      alt={book.title}
                      className=" h-full w-full object-cover object-center"
                    />
                  </div>

                
                  <div className="card-body">
                    <h1 className="text-2xl text-gray-700">#{index + 1}</h1>
                    <h2 className="card-title">{book.title}</h2>
                    <p className="text-sm text-gray-700 italic">
                      {book.description}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Genre:</strong> {book.genre}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Publish Date:</strong> {book.publishDate}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Pages:</strong> {book.pages}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !error && topFiveBooks.length === 0 && (
            <div className="text-center text-gray-300">
              <p>No books available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
