import type { Metadata } from "next";
import UpNextView from "@/components/views/UpNextView";
import { getCurrentlyReading, getWishlist } from "@/lib/books";

export const metadata: Metadata = { title: "Up Next" };

export default function UpNextPage() {
  return (
    <UpNextView
      reading={getCurrentlyReading()}
      waiting={getWishlist().filter((b) => !b.currentlyReading)}
    />
  );
}
