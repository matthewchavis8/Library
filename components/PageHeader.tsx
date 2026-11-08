"use client";

import HandNote from "./HandNote";
import { useT, type MessageKey } from "@/lib/i18n";

type Props = {
  note: MessageKey;
  title: MessageKey;
  intro?: MessageKey;
};

export default function PageHeader({ note, title, intro }: Props) {
  const { t } = useT();
  return (
    <header className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8">
      <HandNote>{t(note)}</HandNote>
      <h1 className="mt-5 text-5xl leading-[1.02] font-normal sm:text-6xl lg:text-7xl">
        {t(title)}
      </h1>
      {intro && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {t(intro)}
        </p>
      )}
    </header>
  );
}
