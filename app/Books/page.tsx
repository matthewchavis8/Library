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
        All books
      </PageHeader>
      <ShelfBrowser books={books} />
    </>
  );
}
