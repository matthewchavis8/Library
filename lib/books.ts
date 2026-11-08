import booksData from "@/public/books.json";
import wishlistData from "@/public/wishlist.json";

export interface Book {
  ID: string;
  title: string;
  image: string;
  author: string;
  description: string;
  genre: string;
  type: string;
  publishDate: string;
  pages: string;
  currentlyReading?: boolean;
}

// My favorites, in order. Change the IDs here to reshuffle the Top 5.
const TOP_BOOK_IDS = ["38", "31", "36", "41", "39"];

const books = booksData as Book[];
const wishlist = wishlistData as Book[];

/** Every finished book, most recently finished first. */
export function getBooks(): Book[] {
  return [...books].sort((a, b) => Number(b.ID) - Number(a.ID));
}

/** Books waiting to be read, with whatever I'm reading now on top. */
export function getWishlist(): Book[] {
  return [...wishlist].sort(
    (a, b) => Number(!!b.currentlyReading) - Number(!!a.currentlyReading),
  );
}

export function getCurrentlyReading(): Book | undefined {
  return wishlist.find((b) => b.currentlyReading);
}

export function getTopFive(): Book[] {
  return TOP_BOOK_IDS.map((id) => books.find((b) => b.ID === id)).filter(
    (b): b is Book => b !== undefined,
  );
}

export function getStats() {
  return {
    books: books.length,
    authors: new Set(books.map((b) => b.author)).size,
    pages: books.reduce((sum, b) => sum + (Number(b.pages) || 0), 0),
    waiting: wishlist.filter((b) => !b.currentlyReading).length,
  };
}
