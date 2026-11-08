"use client";

import * as Menu from "@radix-ui/react-dropdown-menu";
import { Check, Globe } from "lucide-react";
import { LOCALES, LOCALE_NAMES, setLocale, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Globe button in the nav that opens a small language menu. */
export function LanguageMenu() {
  const { t, locale } = useT();
  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-ink-soft transition-colors hover:border-ink-soft hover:text-ink data-[state=open]:border-ink-soft data-[state=open]:text-ink"
        aria-label={t("nav.language")}
      >
        <Globe className="size-4" />
        <span className="font-medium uppercase">{locale}</span>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-40 origin-(--radix-dropdown-menu-content-transform-origin) rounded-2xl border border-line bg-card p-1.5 shadow-[0_20px_40px_-20px_rgba(35,28,21,0.35)] data-[state=open]:animate-[menu-in_160ms_var(--ease-soft)]"
        >
          {LOCALES.map((code) => (
            <Menu.Item
              key={code}
              onSelect={() => setLocale(code)}
              className="flex cursor-pointer items-center justify-between gap-6 rounded-xl px-3 py-2 text-sm text-ink outline-none data-highlighted:bg-paper"
            >
              {LOCALE_NAMES[code]}
              {code === locale && <Check className="size-4 text-accent" />}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

/** Side by side buttons for the mobile menu. */
export function LanguageToggle() {
  const { t, locale } = useT();
  return (
    <div>
      <p className="mb-2 text-xs tracking-[0.14em] text-muted uppercase">
        {t("nav.language")}
      </p>
      <div className="flex gap-2">
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              "flex-1 rounded-full border px-4 py-2.5 text-sm transition-colors",
              code === locale
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink-soft",
            )}
          >
            {LOCALE_NAMES[code]}
          </button>
        ))}
      </div>
    </div>
  );
}
