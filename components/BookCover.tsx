import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/books";

type Props = {
  book: Pick<Book, "title" | "image">;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** A cover that looks like a physical book: spine crease, page edge, soft shadow. */
export default function BookCover({
  book,
  sizes = "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw",
  priority,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-[3px_6px_6px_3px] bg-paper-deep",
        "shadow-[0_1px_1px_rgba(35,28,21,0.12),0_6px_14px_-6px_rgba(35,28,21,0.35),0_18px_40px_-18px_rgba(35,28,21,0.45)]",
        className,
      )}
    >
      <Image
        src={book.image}
        alt={`Cover of ${book.title}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {/* spine crease and light falloff */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.28)_0%,rgba(255,255,255,0.18)_2.5%,rgba(0,0,0,0.08)_5%,transparent_10%,transparent_92%,rgba(0,0,0,0.08)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/10"
      />
    </div>
  );
}
