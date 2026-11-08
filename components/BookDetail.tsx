"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { X } from "lucide-react";
import BookCover from "./BookCover";
import HandNote from "./HandNote";
import { setScrollLocked } from "./SmoothScroll";
import type { Book } from "@/lib/books";
import { useT } from "@/lib/i18n";

type Props = {
  book: Book | null;
  onClose: () => void;
  note?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** A book opened up: big cover, full blurb, the details. */
export default function BookDetail({ book, onClose, note }: Props) {
  const drag = useDragControls();
  const { t, genre, description } = useT();

  useEffect(() => {
    setScrollLocked(!!book);
    return () => setScrollLocked(false);
  }, [book]);

  return (
    <Dialog.Root open={!!book} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {book && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[3px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                data-lenis-prevent
                className="fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto rounded-t-[28px] bg-card px-5 pt-3 pb-8 shadow-2xl outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(52rem,calc(100vw-3rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px] sm:p-10"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.45, ease }}
                drag="y"
                dragListener={false}
                dragControls={drag}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.7 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 110 || info.velocity.y > 600) onClose();
                }}
              >
                {/* drag handle (phones) */}
                <div
                  onPointerDown={(e) => drag.start(e)}
                  className="mx-auto mb-4 flex h-6 w-full cursor-grab touch-none items-center justify-center sm:hidden"
                >
                  <span className="h-1.5 w-12 rounded-full bg-line" />
                </div>

                <Dialog.Close className="absolute top-5 right-5 hidden size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-ink sm:flex">
                  <X className="size-5" />
                  <span className="sr-only">{t("book.close")}</span>
                </Dialog.Close>

                <div className="grid gap-7 sm:grid-cols-[15rem_1fr] sm:gap-10">
                  <motion.div
                    layoutId={`cover-${book.ID}`}
                    transition={{ duration: 0.55, ease }}
                    className="mx-auto w-40 sm:w-full"
                  >
                    <BookCover book={book} sizes="240px" priority />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12, ease }}
                    className="flex flex-col"
                  >
                    {note && <HandNote className="mb-3">{note}</HandNote>}
                    <Dialog.Title className="font-serif text-3xl leading-tight sm:text-4xl">
                      {book.title}
                    </Dialog.Title>
                    <p className="mt-2 text-lg text-ink-soft">
                      {t("book.by", { author: book.author })}
                    </p>

                    <p className="mt-6 leading-relaxed text-ink-soft">
                      {description(book)}
                    </p>

                    <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-5 text-sm">
                      <Fact label={t("book.genre")} value={genre(book.genre)} />
                      <Fact label={t("book.published")} value={book.publishDate} />
                      <Fact label={t("book.pages")} value={book.pages} />
                    </dl>
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.14em] text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}
