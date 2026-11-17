import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { getNewsBySlug, getNewsNeighbors, newsPath } from "../data/news";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

/** Pencil · F8CIlw — News detail */
export function NewsDetailPage() {
  useSmoothScroll();
  const { slug = "" } = useParams();
  const article = getNewsBySlug(slug);
  const { prev, next } = getNewsNeighbors(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to={newsPath()} replace />;

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main className="pt-[100px] max-md:pt-24">
        <article className="mx-auto w-full max-w-[1440px] px-[clamp(20px,6.25vw,120px)] pb-[100px] max-md:pb-16">
          <div className="mx-auto w-full max-w-[800px]">
            <div className="inline-flex h-6 items-center rounded bg-[#f7f8f9] px-2">
              <time className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#111213]">
                {article.date}
              </time>
            </div>

            <h1 className="mt-6 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#2b2d33]">
              {article.title}
            </h1>
            <p className="mt-8 text-[clamp(18px,1.5vw,22px)] leading-[1.45] text-[#474c53]">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-6 items-center rounded-full bg-[#f7f8f9] px-2.5 text-[12px] uppercase tracking-[0.04em] text-[#111213]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 h-px w-full max-w-[800px] bg-black/8" />

          <div className="mx-auto mt-14 w-full max-w-[1200px]">
            <div className="mx-auto w-full max-w-[800px]">
              {(article.heroImage || article.image) && (
                <figure className="overflow-hidden">
                  <img
                    src={article.heroImage || article.image}
                    alt=""
                    className="aspect-[16/9] w-full object-cover"
                    draggable={false}
                  />
                </figure>
              )}

              {article.author && (
                <p className="mt-8 text-[18px] font-medium leading-normal text-[#474c53]">{article.author}</p>
              )}

              {article.takeaways && article.takeaways.length > 0 && (
                <div className="mt-8">
                  <p className="text-[18px] font-medium text-[#474c53]">Key takeaways</p>
                  <ul className="mt-4 list-disc space-y-2 pl-7 text-[18px] leading-[1.55] text-[#474c53]">
                    {article.takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 space-y-6 text-[18px] leading-[1.55] text-[#474c53]">
                {article.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>

              {article.chartImage && (
                <figure className="mt-10">
                  <img
                    src={article.chartImage}
                    alt=""
                    className="w-full object-contain"
                    draggable={false}
                  />
                  {article.chartCaption && (
                    <figcaption className="mt-4 text-[18px] leading-[1.5] text-[#474c53]">
                      {article.chartCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                to={newsPath()}
                className="inline-flex h-12 items-center gap-2 rounded bg-[#111213] px-6 text-[15px] font-medium text-white transition hover:bg-black"
              >
                Back to List
                <span aria-hidden>»</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
              {prev ? (
                <Link
                  to={newsPath(prev.slug)}
                  className="rounded border border-[#e1e3e6] bg-white p-8 transition hover:border-[#111213]"
                >
                  <p className="text-[14px] text-[#111213]">‹ Previous</p>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.04em] text-[#808791]">{prev.date}</p>
                  <p className="mt-3 text-[18px] font-semibold leading-snug text-[#111213]">{prev.title}</p>
                </Link>
              ) : (
                <div className="rounded border border-transparent p-8 opacity-0 max-md:hidden" aria-hidden />
              )}
              {next ? (
                <Link
                  to={newsPath(next.slug)}
                  className="rounded border border-[#e1e3e6] bg-white p-8 text-right transition hover:border-[#111213]"
                >
                  <p className="text-[14px] text-[#111213]">Next ›</p>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.04em] text-[#808791]">{next.date}</p>
                  <p className="mt-3 text-[18px] font-semibold leading-snug text-[#111213]">{next.title}</p>
                </Link>
              ) : (
                <div className="rounded border border-transparent p-8 opacity-0 max-md:hidden" aria-hidden />
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
