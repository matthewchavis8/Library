"use client";

import { useSyncExternalStore } from "react";

/** True when the media query matches. Always false during server render. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsPhone = () => useMedia("(max-width: 639px)");
