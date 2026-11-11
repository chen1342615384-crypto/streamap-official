import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/asset";

const CARD_W = 234;
const CARD_H = 262;
const SCALE = 1.5;
const SHIFT = Math.round(CARD_W * (SCALE - 1)); // 117
const AUTO_MS = 3000;

const stories = [
  { id: "sanitation", title: "Sanitation", caption: "Sanitation", img: asset("images/assets/idT4h.png") },
  { id: "road", title: "Road & Pavement", caption: "Road & Pavement", img: asset("images/assets/XBwUH.png") },
  { id: "worksite", title: "Work Site", caption: "Work Site", img: asset("images/assets/PzT4e.png") },
  { id: "roadside", title: "Roadside Facility", caption: "Roadside Facility", img: asset("images/assets/BtbM3.png") },
  { id: "urban", title: "Urban Environment", caption: "Urban Environment", img: asset("images/assets/KiNnI.png") },
] as const;

/** Frame 1 · bzVWX — Trimble-style scale carousel, 3s autoplay */
export function Stories() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setActiveIndex((i) => (i + 1) % stories.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, []);

  const select = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="industry-solutions" className="w-full bg-[#f7f8f9] py-[100px]">
      <div className="container-1440">
        <div className="mb-[72px] flex flex-wrap items-start justify-between gap-10">
          <h2 className="max-w-[610px] text-[48px] font-semibold leading-[1.08] tracking-[-1.44px] text-[#111213] max-md:text-[32px]">
            Real-world ingenuity. Measurable impact.
          </h2>
          <div className="max-w-[462px] pt-2.5">
            <p className="text-[18px] leading-[1.44] tracking-[-0.36px] text-[#111213]">
              Precise Pavement Distress Detection &amp; Intelligent Road Maintenance
            </p>
            <a href="#stories" className="mt-5 inline-flex items-center gap-1 text-[16px] font-medium text-[#474c53] hover:text-[#111213]">
              View user stories
              <span aria-hidden>»</span>
            </a>
          </div>
        </div>

        <div
          className="story-carousel relative flex items-end justify-center gap-[15px] max-md:flex-col max-md:items-stretch max-md:gap-4"
          style={{ minHeight: CARD_H * SCALE + 72 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          {stories.map((story, index) => {
            const isActive = index === activeIndex;
            const shiftRight = index > activeIndex ? SHIFT : 0;

            return (
              <div
                key={story.id}
                className="story-carousel__item relative inline-block shrink-0 max-md:w-full"
                style={{
                  width: CARD_W,
                  transform: shiftRight ? `translate3d(${shiftRight}px, 0, 0)` : undefined,
                }}
              >
                <button
                  type="button"
                  aria-label={isActive ? `${story.title} (active)` : story.title}
                  aria-pressed={isActive}
                  onMouseEnter={() => select(index)}
                  onFocus={() => select(index)}
                  onClick={() => select(index)}
                  className={`story-card relative block overflow-hidden rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-black max-md:!h-auto max-md:!w-full max-md:!scale-100 max-md:!transform-none ${
                    isActive ? "is-active" : ""
                  }`}
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                  }}
                >
                  <img
                    src={story.img}
                    alt=""
                    className={`story-card__img absolute inset-0 h-full w-full object-cover ${
                      isActive ? "is-color" : "is-muted"
                    }`}
                    draggable={false}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-transparent ${
                      isActive ? "to-black/70" : "to-black/40"
                    }`}
                  />

                  {isActive ? (
                    <>
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-5">
                        <span className="max-w-[130px] text-[20px] font-bold leading-tight text-white">
                          {story.title}
                        </span>
                        <span
                          className="grid size-10 place-items-center rounded-full bg-white/90 text-[#111213]"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-2.5 bg-[#fbad26]" />
                    </>
                  ) : (
                    <span className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-[20px] font-bold leading-[1.625rem] text-[#fbad26]">
                      {story.title}
                    </span>
                  )}
                </button>

                <div
                  className={`story-card__caption px-2.5 text-[16px] leading-[1.4] text-[#353a40] max-md:mt-3 max-md:opacity-100 ${
                    isActive ? "is-visible" : ""
                  }`}
                  style={{ width: Math.round(CARD_W * SCALE) }}
                  aria-hidden={!isActive}
                >
                  {story.caption}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
