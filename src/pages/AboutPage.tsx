import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { AboutTimeline } from "../components/AboutTimeline";
import { aboutContent, companyPath } from "../data/company";
import { asset } from "../lib/asset";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

/** Pencil · Krd9d / QkAH8 — About us */
export function AboutPage() {
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main>
        <section className="relative h-[490px] w-full overflow-hidden bg-[#0b1524] max-md:h-[380px]">
          <img
            src={aboutContent.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#020c1b]/[0.55]" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-end px-[clamp(20px,6.25vw,120px)] pb-16">
            <div className="max-w-[960px]">
              <h1 className="text-[clamp(40px,5vw,62px)] font-semibold leading-none tracking-[-0.03em] text-white">
                {aboutContent.heroTitle}
              </h1>
              <p className="mt-5 max-w-[900px] text-[clamp(16px,1.4vw,20px)] leading-snug text-white/95">
                {aboutContent.heroDesc}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-[100px] max-md:py-16">
          <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between gap-12 px-[clamp(20px,6.25vw,120px)] max-lg:flex-col">
            <div className="w-full max-w-[606px]">
              <p className="text-xs font-bold tracking-[1.5px] text-[#1c1917]">
                {`[ ${aboutContent.partnerEyebrow} ]`}
              </p>
              <h2 className="mt-6 text-[clamp(32px,3.6vw,52px)] font-bold leading-tight tracking-[-0.02em] text-[#1c1917]">
                {aboutContent.partnerTitle}
              </h2>
              <p className="mt-8 text-base leading-relaxed text-[#1c1917]">
                {aboutContent.partnerBody}
              </p>
            </div>
            <div className="w-full max-w-xl overflow-hidden rounded-xl">
              <img
                src={aboutContent.partnerMedia}
                alt=""
                className="aspect-[16/15] w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-[#f7f8f9] py-[100px] max-md:py-16">
          <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,6.25vw,120px)]">
            <div className="max-w-[640px]">
              <h2 className="whitespace-pre-line text-[clamp(36px,4vw,52px)] font-bold leading-tight tracking-[-0.02em] text-[#1c1917]">
                {aboutContent.statsTitle}
              </h2>
              <p className="mt-6 max-w-[560px] text-lg leading-normal text-[#474c53]">
                {aboutContent.statsDesc}
              </p>
            </div>
            <div className="mt-16 grid max-w-[1000px] grid-cols-1 gap-10 sm:grid-cols-3">
              {aboutContent.stats.map((item) => (
                <article key={item.label}>
                  <p className="text-[clamp(48px,5vw,72px)] font-medium leading-tight tracking-[-0.02em] text-[#1c1917]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xl font-medium text-[#1c1917]">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AboutTimeline />

        <section className="w-full bg-white py-[100px] max-md:py-16">
          <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,6.25vw,120px)]">
            <div className="flex items-end justify-between gap-10 max-md:flex-col max-md:items-start">
              <h2 className="text-[clamp(36px,4vw,52px)] font-bold leading-tight tracking-[-0.02em] text-[#111213]">
                {aboutContent.awardsTitle}
              </h2>
              <p className="max-w-[420px] text-base leading-normal text-[#474c53]">
                {aboutContent.awardsDesc}
              </p>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[...aboutContent.awards, ...aboutContent.awards].map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="flex aspect-[3/4] items-center justify-center rounded-xl border border-[#e8eaed] bg-[#fbfcfd] p-6"
                >
                  <img src={src} alt="" className="max-h-full max-w-full object-contain" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#090a0b] py-[100px] max-md:py-16">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-[clamp(20px,6.25vw,120px)] text-center">
            <div className="max-w-[930px]">
              <h2 className="text-[clamp(32px,4vw,56px)] font-semibold leading-tight tracking-[-0.04em] text-[#fbfcfd]">
                {aboutContent.ctaTitle}
              </h2>
              <p className="mt-5 text-lg text-[#fbfcfd]">{aboutContent.ctaDesc}</p>
            </div>
            <Link
              to={companyPath("contact-us")}
              className="inline-flex h-12 items-center justify-center rounded bg-[#fbfcfd] px-8 text-[15px] font-medium text-[#1b1c1e] transition hover:bg-white"
            >
              {"Contact Us →"}
            </Link>
            <img
              src={asset("images/assets/contact-wordmark.png")}
              alt=""
              className="mt-4 h-auto w-full max-w-[1200px] object-contain opacity-20"
              draggable={false}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
