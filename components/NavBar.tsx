"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/nav";
import { useT } from "@/lib/i18n";
import { LanguageMenu, LanguageToggle } from "./LanguagePicker";


export default function Navbar() {
  const pathname = usePathname();
  const { t } = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-paper/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Wordmark />

        <div className="hidden items-center gap-4 md:flex">
        <ul className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[0.95rem] transition-colors",
                    active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {t(link.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <LanguageMenu />
        </div>

        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-deep md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">{t("nav.openMenu")}</span>
          </Dialog.Trigger>
          <AnimatePresence>
            {menuOpen && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount aria-describedby={undefined}>
                  <motion.div
                    className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col bg-paper px-6 py-5 shadow-2xl outline-none"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between">
                      <Dialog.Title asChild>
                        <span className="font-serif text-xl">Matt&rsquo;s Library</span>
                      </Dialog.Title>
                      <Dialog.Close className="flex size-10 items-center justify-center rounded-full hover:bg-paper-deep">
                        <X className="size-5" />
                        <span className="sr-only">{t("nav.closeMenu")}</span>
                      </Dialog.Close>
                    </div>
                    <ul className="mt-10 flex flex-col">
                      {NAV_LINKS.map((link, i) => (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + i * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "flex items-baseline justify-between border-b border-line py-4 font-serif text-3xl",
                              pathname === link.href ? "text-accent" : "text-ink",
                            )}
                          >
                            {t(link.key)}
                            <span className="font-sans text-xs text-muted">
                              0{i + 1}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-auto space-y-6">
                      <LanguageToggle />
                      <p className="font-hand text-xl text-muted">
                        {t("nav.happyReading")}
                      </p>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </nav>
    </header>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <Image
        src="/BookIcon.png"
        alt=""
        width={28}
        height={28}
        className="size-7 transition-transform duration-500 group-hover:-rotate-6"
      />
      <span className="font-serif text-xl tracking-tight sm:text-[1.35rem]">
        Matt&rsquo;s Library
      </span>
    </Link>
  );
}
