import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ShelfBrowser from "./ShelfBrowser";
import { getBooks } from "@/lib/books";

export const metadata: Metadata = { title: "The Shelf" };

export default function ShelfPage() {
  const books = getBooks();
  return (
    <>
      <PageHeader note="everything I've finished" title="The Shelf">
        All {books.length} of them, newest first. Search, filter by genre, or
        tap a cover to read a little about it.
      </PageHeader>
      <ShelfBrowser books={books} />
    </>
  );
}
