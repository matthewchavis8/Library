"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { DICTIONARIES, LOCALES, type Dictionary, type Locale } from "./dictionaries";
import es from "@/public/i18n/es.json";
import type { Book } from "@/lib/books";
import { STORAGE_KEY } from "./boot";

export { LOCALES, LOCALE_NAMES, type Locale } from "./dictionaries";

const DESCRIPTIONS: Partial<Record<Locale, Record<string, string>>> = { es };

// The chosen language lives in localStorage so it sticks between visits.
const listeners = new Set<() => void>();

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LOCALES as readonly string[]).includes(saved)) return saved as Locale;
  } catch {}
  return "en";
}

export function setLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {}
  document.documentElement.lang = locale;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, readLocale, () => "en");
}

type Path<T> = {
  [K in keyof T & string]: T[K] extends Record<string, string>
    ? `${K}.${keyof T[K] & string}`
    : never;
}[keyof T & string];

export type MessageKey = Exclude<Path<Dictionary>, `genres.${string}`>;

// "Sci-Fi", "sci fi" and "SciFi" should all find the same translation
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z\u00c0-\u024f]/g, "");
const lookups = new WeakMap<Dictionary, Record<string, string>>();
function genreLookup(dict: Dictionary) {
  let map = lookups.get(dict);
  if (!map) {
    map = Object.fromEntries(
      Object.entries(dict.genres).map(([k, v]) => [normalize(k), v]),
    );
    lookups.set(dict, map);
  }
  return map;
}

/** Everything a component needs to show text in the chosen language. */
export function useT() {
  const locale = useLocale();
  const dict = DICTIONARIES[locale];

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => {
      const [group, name] = key.split(".") as [keyof Dictionary, string];
      let text =
        (dict[group] as Record<string, string>)[name] ??
        (DICTIONARIES.en[group] as Record<string, string>)[name];
      for (const [k, v] of Object.entries(vars ?? {})) {
        text = text.replace(`{${k}}`, String(v));
      }
      return text;
    },
    [dict],
  );

  const genre = useCallback(
    (name: string) => genreLookup(dict)[normalize(name)] ?? name,
    [dict],
  );

  const description = useCallback(
    (book: Pick<Book, "ID" | "description">) =>
      DESCRIPTIONS[locale]?.[book.ID] ?? book.description,
    [locale],
  );

  const number = useCallback(
    (n: number) => n.toLocaleString(locale === "es" ? "es-ES" : "en-US"),
    [locale],
  );

  return { t, genre, description, number, locale };
}

/**
 * Keeps <html lang> in sync and reveals the page once the saved
 * language has rendered, so visitors never see a flash of English.
 */
export function LanguageSync() {
  const locale = useLocale();
  useEffect(() => {
    if (locale !== readLocale()) return;
    document.documentElement.lang = locale;
    document.documentElement.classList.remove("i18n-pending");
  }, [locale]);
  return null;
}
