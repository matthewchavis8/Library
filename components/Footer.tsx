"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-hand text-2xl text-accent">{t("footer.thanks")}</p>
          <p className="mt-1 text-sm text-muted">
            {t("footer.kept")} · © {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-accent">
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
