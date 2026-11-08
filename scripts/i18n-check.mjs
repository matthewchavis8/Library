// Lists books and genres that don't have a Spanish translation yet.
// Run with: npm run i18n:check
// Anything missing still works on the site, it just shows in English.
import { readFileSync } from "node:fs";

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url)));
const books = [...read("public/books.json"), ...read("public/wishlist.json")];
const es = read("public/i18n/es.json");

const dict = readFileSync(new URL("../lib/i18n/dictionaries.ts", import.meta.url), "utf8");
const genreBlock = dict.slice(dict.lastIndexOf("genres: {"));
const normalize = (s) => s.toLowerCase().replace(/[^a-zÀ-ɏ]/g, "");
const known = new Set(
  [...genreBlock.matchAll(/^\s*"?([^":\n]+?)"?\s*:/gm)].map((m) => normalize(m[1])),
);

const missingBooks = books.filter((b) => !es[b.ID]);
const missingGenres = [...new Set(books.map((b) => b.genre))].filter(
  (g) => !known.has(normalize(g)),
);

if (!missingBooks.length && !missingGenres.length) {
  console.log("Everything has a Spanish translation.");
} else {
  for (const b of missingBooks)
    console.log(`Book needs Spanish in public/i18n/es.json: "${b.ID}" ${b.title}`);
  for (const g of missingGenres)
    console.log(`Genre needs Spanish in lib/i18n/dictionaries.ts: ${g}`);
}
