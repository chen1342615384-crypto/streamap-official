import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "../data/company";

gsap.registerPlugin(ScrollTrigger);

/** Pencil design caps · ac0UL */
const DESIGN_IMG_H = 480;
const DESIGN_CARD_W = 640;

/** Pencil · ac0UL — vertical wheel drives horizontal timeline */
export function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Large screens keep design size; short screens scale down to fit
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let raf = 0;

    const fit = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.innerWidth < 768) {
          section.style.removeProperty("--timeline-img-h");
          section.style.removeProperty("--timeline-card-w");
          section.style.removeProperty("--timeline-copy-h");
          section.style.removeProperty("--timeline-scale");
          return;
        }

        // Reset to design size, then lock every card to the tallest copy block
        section.style.setProperty("--timeline-img-h", `${DESIGN_IMG_H}px`);
        section.style.setProperty("--timeline-card-w", `${DESIGN_CARD_W}px`);
        section.style.setProperty("--timeline-scale", "1");
        section.classList.add("is-measuring");

        const copies = section.querySelectorAll<HTMLElement>(".about-timeline__copy");
        let copyH = 0;
        // force layout after unlocking copy height
        void section.offsetHeight;
        copies.forEach((el) => {
          copyH = Math.max(copyH, el.scrollHeight);
        });
        section.classList.remove("is-measuring");
        if (copyH < 140) copyH = 180;

        const stageH = stage.clientHeight;
        const designCardH = DESIGN_IMG_H + copyH;
        // Never grow past design; only shrink when viewport is short
        const scale = Math.min(1, stageH / designCardH);
        const imgH = Math.max(160, Math.round(DESIGN_IMG_H * scale));
        const cardW = Math.max(220, Math.round(DESIGN_CARD_W * scale));
        const scaledCopyH = Math.max(120, Math.round(copyH * scale));

        section.style.setProperty("--timeline-img-h", `${imgH}px`);
        section.style.setProperty("--timeline-card-w", `${cardW}px`);
        section.style.setProperty("--timeline-copy-h", `${scaledCopyH}px`);
        section.style.setProperty("--timeline-scale", String(scale));
        copies.forEach((el) => {
          el.style.height = "";
        });
        ScrollTrigger.refresh();
      });
    };

    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    window.addEventListener("resize", fit);
    fit();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getTravel = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(getTravel(), window.innerHeight * 0.5)}`,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;

      const refresh = () => ScrollTrigger.refresh();
      const imgs = Array.from(track.querySelectorAll("img"));
      imgs.forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh, { once: true });
      });
      requestAnimationFrame(refresh);

      return () => {
        imgs.forEach((img) => img.removeEventListener("load", refresh));
        tween.scrollTrigger?.kill();
        tween.kill();
        triggerRef.current = null;
        gsap.set(track, { clearProps: "transform" });
      };
    });

    mm.add("(max-width: 767px)", () => {
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        const max = track.scrollWidth - track.clientWidth;
        if (max <= 0) return;
        const next = track.scrollLeft + e.deltaY;
        if (next <= 0 && e.deltaY < 0) return;
        if (next >= max && e.deltaY > 0) return;
        e.preventDefault();
        track.scrollLeft = Math.min(max, Math.max(0, next));
      };
      track.addEventListener("wheel", onWheel, { passive: false });
      return () => track.removeEventListener("wheel", onWheel);
    });

    return () => mm.revert();
  }, []);

  const nudge = (dir: -1 | 1) => {
    const st = triggerRef.current;
    const track = trackRef.current;
    if (st) {
      const next = Math.min(1, Math.max(0, st.progress + dir * 0.16));
      const y = st.start + (st.end - st.start) * next;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    if (!track) return;
    const card = track.querySelector("article");
    const step = card?.getBoundingClientRect().width ?? DESIGN_CARD_W;
    track.scrollBy({ left: dir * (step + 16), behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="about-timeline relative w-full overflow-x-clip bg-[#fbfcfd]"
      aria-label="Company timeline"
      style={
        {
          ["--timeline-img-h"]: `${DESIGN_IMG_H}px`,
          ["--timeline-card-w"]: `${DESIGN_CARD_W}px`,
          ["--timeline-copy-h"]: "180px",
          ["--timeline-scale"]: "1",
        } as CSSProperties
      }
    >
      <div className="about-timeline__shell relative flex h-svh w-full flex-col max-md:h-auto">
        <div className="about-timeline__header mx-auto flex w-full max-w-[1440px] shrink-0 items-end justify-between gap-6 max-md:flex-col max-md:items-start">
          <div className="max-w-[860px]">
            <p
              className="text-[12px] font-semibold uppercase leading-[1.33] text-[#156b54]"
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', letterSpacing: "0.72px" }}
            >
              {aboutContent.timelineEyebrow}
            </p>
            <h2
              className="about-timeline__title mt-3 whitespace-pre-line font-semibold leading-[1.11] text-[#111213] max-md:mt-6"
              style={{ letterSpacing: "-0.04em" }}
            >
              {aboutContent.timelineTitle}
            </h2>
            <p
              className="about-timeline__desc mt-4 max-w-[520px] font-normal leading-[1.36] text-[#474c53]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {aboutContent.timelineDesc}
            </p>
          </div>

          <div className="mb-1 flex items-center gap-3">
            <button
              type="button"
              aria-label="Scroll timeline left"
              onClick={() => nudge(-1)}
              className="grid size-10 place-items-center rounded-full border border-[#808791] bg-transparent text-[#111213] transition hover:bg-[#f4f6f5]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M10 3.5L5.5 8L10 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Scroll timeline right"
              onClick={() => nudge(1)}
              className="grid size-10 place-items-center rounded-full bg-[#36393f] text-white transition hover:bg-[#111213]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M6 3.5L10.5 8L6 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div ref={stageRef} className="about-timeline__stage min-h-0 w-full flex-1 max-md:flex-none">
          <div
            ref={trackRef}
            className="about-timeline__track flex w-max items-start gap-4 will-change-transform max-md:mt-12 max-md:w-full max-md:overflow-x-auto max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {aboutContent.milestones.map((item, i) => (
              <article
                key={`${item.year}-${item.title}-${i}`}
                className="about-timeline__card flex shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              >
                <div className="about-timeline__media overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="about-timeline__img w-full object-cover max-md:aspect-[4/3] max-md:h-auto"
                    width={640}
                    height={480}
                    draggable={false}
                  />
                </div>
                <div className="about-timeline__copy flex flex-col gap-3 p-6">
                  <h3 className="about-timeline__card-title font-bold leading-[1.2] text-[#1c1917]">
                    {item.year}
                    {" — "}
                    {item.title}
                  </h3>
                  <p className="about-timeline__card-body text-[16px] font-medium leading-[1.5] text-[#1c1917]">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
            <div className="about-timeline__spacer shrink-0 max-md:hidden" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
