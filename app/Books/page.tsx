"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Book } from "./types";

const page = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/books.json");
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-wider">
            Matt's
          </p>
          <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Books
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 ">
          {books.map((book) => (
            <a
              key={book.ID}
              className="flex flex-col overflow-clip rounded-xl border border-border bg-white"
            >
              <div>
                <img
                  src={book.image}
                  alt={book.title}
                  className=" h-full w-full object-cover object-center"
                />
              </div>
              <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                
                {/* <h3 className="mb-2 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                  {book.title}
                </h3>
                <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                  {book.description}
                </p>
                <p className="flex items-center">
                    Author: 
                  <strong className="ml-2">{book.author}</strong>
                </p>
                <p className="flex items-center">
                    Genre: 
                  <strong className="ml-2">{book.genre}</strong>
                </p>
                <p className="flex items-center">
                    Publish Date: 
                  <strong className="ml-2">{book.publishDate}</strong>
                </p>
                <p className="flex items-center">
                    Pages: 
                  <strong className="ml-2">{book.pages}</strong>
                </p> */}
                <h1 className="text-2xl text-gray-700">#{book.ID}</h1>
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
