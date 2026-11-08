import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ShelfBrowser from "./ShelfBrowser";
import { getBooks } from "@/lib/books";

export const metadata: Metadata = { title: "The Shelf" };

export default function ShelfPage() {
  const books = getBooks();
  return (
    <>
      <PageHeader note="shelf.note" title="shelf.title" intro="shelf.intro" />
      <ShelfBrowser books={books} />
    </>
  );
}
