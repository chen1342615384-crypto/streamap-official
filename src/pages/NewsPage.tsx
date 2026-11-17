import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { newsArticles, newsPage, newsPath, type NewsArticle } from "../data/news";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const PAGE_SIZE = 9;

type SortKey =
  | "relevance"
  | "alpha-asc"
  | "alpha-desc"
  | "date-asc"
  | "date-desc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "alpha-asc", label: "Alphabetical (A-Z)" },
  { key: "alpha-desc", label: "Alphabetical (Z-A)" },
  { key: "date-asc", label: "Date (oldest first)" },
  { key: "date-desc", label: "Date (newest first)" },
];

function parseNewsDate(value: string) {
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

function relevanceScore(item: NewsArticle, q: string) {
  if (!q) return 0;
  const title = item.title.toLowerCase();
  const excerpt = item.excerpt.toLowerCase();
  const tags = item.tags.map((t) => t.toLowerCase()).join(" ");
  let score = 0;
  if (title === q) score += 100;
  if (title.startsWith(q)) score += 60;
  if (title.includes(q)) score += 40;
  if (tags.includes(q)) score += 20;
  if (excerpt.includes(q)) score += 10;
  // prefer earlier match position in title
  const idx = title.indexOf(q);
  if (idx >= 0) score += Math.max(0, 20 - idx);
  return score;
}

/** Pencil · O7MU1 — News list */
export function NewsPage() {
  useSmoothScroll();
  const [query, setQuery] = useState("");
  const [draftQuery, setDraftQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date-desc");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!sortOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [sortOpen]);

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = newsArticles.filter(
      (item) =>
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)),
    );

    list = [...list];
    switch (sortKey) {
      case "alpha-asc":
        list.sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }));
        break;
      case "alpha-desc":
        list.sort((a, b) => b.title.localeCompare(a.title, "en", { sensitivity: "base" }));
        break;
      case "date-asc":
        list.sort((a, b) => parseNewsDate(a.date) - parseNewsDate(b.date));
        break;
      case "date-desc":
        list.sort((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date));
        break;
      case "relevance":
      default:
        if (q) {
          list.sort((a, b) => {
            const diff = relevanceScore(b, q) - relevanceScore(a, q);
            if (diff !== 0) return diff;
            return parseNewsDate(b.date) - parseNewsDate(a.date);
          });
        } else {
          // no query: fall back to newest first
          list.sort((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date));
        }
        break;
    }
    return list;
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeSort = SORT_OPTIONS.find((o) => o.key === sortKey) ?? SORT_OPTIONS[4];

  useEffect(() => {
    setPage(1);
  }, [query, sortKey]);

  const runSearch = () => {
    setQuery(draftQuery.trim());
    // searching with Relevance is the useful default when user typed something
    if (draftQuery.trim() && sortKey === "date-desc") setSortKey("relevance");
  };

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main>
        <section className="relative h-[490px] w-full overflow-hidden bg-[#0b1524] max-md:h-[360px]">
          <img
            src={newsPage.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#020c1b]/[0.55]" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-end px-[clamp(20px,6.25vw,120px)] pb-16">
            <div className="max-w-[900px]">
              <h1 className="text-[clamp(36px,4.5vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                {newsPage.heroTitle}
              </h1>
              <p className="mt-5 max-w-[720px] text-[clamp(16px,1.5vw,24px)] leading-[1.45] text-white/95">
                {newsPage.heroDesc}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#fbfcfd] py-[100px] max-md:py-16">
          <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,6.25vw,120px)]">
            <div className="flex flex-wrap items-center gap-3">
              <form
                className="flex h-12 min-w-[260px] flex-1 items-center gap-3 rounded-md bg-[#f7f8f9] py-1 pl-4 pr-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  runSearch();
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
                  <circle cx="7" cy="7" r="4.5" stroke="#808791" strokeWidth="1.4" />
                  <path d="M10.5 10.5L13.5 13.5" stroke="#808791" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  placeholder={newsPage.searchPlaceholder}
                  className="h-full w-full bg-transparent text-[15px] text-[#111213] outline-none placeholder:text-[#808791]"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded bg-[#474c53] px-5 text-[14px] font-medium text-white transition hover:bg-[#111213]"
                >
                  Search
                </button>
              </form>

              <div ref={sortRef} className="relative shrink-0 self-center">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  onClick={() => setSortOpen((v) => !v)}
                  className="inline-flex h-12 min-w-[210px] items-center justify-between gap-3 rounded-md border border-[#c9ced4] bg-[#f7f8f9] px-4 text-[15px] text-[#474c53] transition hover:border-[#808791]"
                >
                  <span>{activeSort.label}</span>
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                    <path d="M2.5 5L6 2L9.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 9L6 12L9.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {sortOpen && (
                  <ul
                    role="listbox"
                    aria-label="Sort stories"
                    className="news-sort-menu absolute right-0 z-20 mt-2 w-[min(280px,80vw)] overflow-hidden rounded-xl bg-white py-2"
                  >
                    {SORT_OPTIONS.map((option) => {
                      const selected = option.key === sortKey;
                      return (
                        <li key={option.key}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => {
                              setSortKey(option.key);
                              setSortOpen(false);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] text-[#111213] transition hover:bg-[#f7f8f9]"
                          >
                            <span
                              className={`grid size-[18px] shrink-0 place-items-center rounded-[3px] border ${
                                selected
                                  ? "border-[#474c53] bg-[#474c53] text-white"
                                  : "border-[#c9ced4] bg-white"
                              }`}
                              aria-hidden
                            >
                              {selected && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path
                                    d="M2.5 6.2L4.8 8.5L9.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span>{option.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((item) => (
                <Link
                  key={item.slug}
                  to={newsPath(item.slug)}
                  className="news-card group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5"
                >
                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex h-6 items-center rounded-full bg-[#f7f8f9] px-2 text-[10px] uppercase tracking-[0.04em] text-[#111213]">
                        {item.date}
                      </span>
                      <span
                        className="grid size-8 place-items-center rounded-full border border-[#e1e3e6] text-[#474c53] transition group-hover:border-[#111213] group-hover:text-[#111213]"
                        aria-hidden
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M5 11L11 5M11 5H6.5M11 5V9.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <h2 className="text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#111213]">
                      {item.title}
                    </h2>
                    <p className="line-clamp-3 text-[16px] leading-[1.5] text-[#474c53]">{item.excerpt}</p>

                    <ul className="mt-auto flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="inline-flex h-6 items-center rounded-full bg-[#f7f8f9] px-2.5 text-[12px] text-[#111213]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt=""
                        className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        draggable={false}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {sorted.length === 0 ? (
              <p className="mt-16 text-center text-[#474c53]">No stories matched your search.</p>
            ) : (
              <nav className="mt-14 flex justify-center" aria-label="Pagination">
                <ul className="flex items-center gap-1">
                  <li>
                    <button
                      type="button"
                      aria-label="Previous page"
                      disabled={currentPage <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="grid size-10 place-items-center rounded text-[#111213] disabled:opacity-30"
                    >
                      ‹
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <li key={n}>
                      <button
                        type="button"
                        onClick={() => setPage(n)}
                        className={`grid size-10 place-items-center rounded text-[14px] ${
                          n === currentPage ? "bg-[#111213]/[0.08] font-semibold text-[#111213]" : "text-[#111213]"
                        }`}
                      >
                        {n}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      aria-label="Next page"
                      disabled={currentPage >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="grid size-10 place-items-center rounded text-[#111213] disabled:opacity-30"
                    >
                      ›
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
