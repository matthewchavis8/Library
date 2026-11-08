import HomeView from "@/components/views/HomeView";
import {
  getBooks,
  getCurrentlyReading,
  getStats,
  getTopFive,
} from "@/lib/books";

export default function HomePage() {
  return (
    <HomeView
      stats={getStats()}
      reading={getCurrentlyReading()}
      recent={getBooks().slice(0, 6)}
      topFive={getTopFive()}
    />
  );
}
