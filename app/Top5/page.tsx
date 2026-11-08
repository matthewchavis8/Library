import type { Metadata } from "next";
import TopFiveView from "@/components/views/TopFiveView";
import { getTopFive } from "@/lib/books";

export const metadata: Metadata = { title: "Top 5" };

export default function TopFivePage() {
  return <TopFiveView books={getTopFive()} />;
}
