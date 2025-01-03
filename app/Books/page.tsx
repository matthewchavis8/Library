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
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
            doloremque mollitia fugiat omnis! Porro facilis quo animi
            consequatur. Explicabo.
          </p>
          <Button variant="link" className="w-full sm:w-auto">
            Explore all Books
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {books.map((book) => (
            <a
              key={book.ID}
              className="flex flex-col overflow-clip rounded-xl border border-border"
            >
              <div>
                <img
                  src={book.image}
                  alt={book.title}
                  className=" h-full w-full object-cover object-center"
                />
              </div>
              <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl lg:mb-6">
                  {book.title}
                </h3>
                <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                  {book.description}
                </p>
                <p className="flex items-center hover:underline">
                  Read more
                  <ArrowRight className="ml-2 size-4" />
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
