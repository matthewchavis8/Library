import { useEffect, useState } from "react";
import { Book } from "./types";
export default function Carousel() {

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetch("/books.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error can't fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBooks(data);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-center">
          <p className="text-3xl">Books Read Since 2023</p>
      </div>
      <div className="carousel carousel-center rounded-box max-w-4xl">
        {books.map((book) => (
          <div className="carousel-item w-72" key={book.ID}>
            <img src={book.image} alt={book.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
