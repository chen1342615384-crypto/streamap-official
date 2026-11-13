import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type Props = {
  images: string[];
};

function buildCycle(images: string[], minWidth: number, itemWidth: number, gap: number) {
  if (!images.length) return [] as string[];
  const unit = itemWidth + gap;
  const need = Math.max(images.length, Math.ceil((minWidth + unit) / unit));
  const cycle: string[] = [];
  while (cycle.length < need) cycle.push(...images);
  return cycle;
}

function MarqueeRow({
  images,
  direction,
  onOpen,
}: {
  images: string[];
  direction: "left" | "right";
  onOpen: (src: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState<string[]>(images);
  const [cycleWidth, setCycleWidth] = useState(0);

  useEffect(() => {
    const measureCount = () => {
      const rowW = rowRef.current?.clientWidth ?? window.innerWidth;
      const itemW = Math.min(316, Math.max(200, rowW * 0.22));
      setCycle(buildCycle(images, rowW, itemW, 20));
    };
    measureCount();
    window.addEventListener("resize", measureCount);
    return () => window.removeEventListener("resize", measureCount);
  }, [images]);

  useLayoutEffect(() => {
    const el = cycleRef.current;
    if (!el) return;
    const update = () => setCycleWidth(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cycle]);

  const duration = Math.max(28, Math.round(cycleWidth / 40));

  return (
    <div ref={rowRef} className="asset-marquee__row">
      <div
        className={`asset-marquee__track ${
          direction === "right" ? "asset-marquee__track--right" : "asset-marquee__track--left"
        }`}
        style={
          {
            "--marquee-distance": `${cycleWidth}px`,
            "--marquee-duration": `${duration}s`,
          } as CSSProperties
        }
      >
        <div ref={cycleRef} className="asset-marquee__cycle">
          {cycle.map((src, i) => (
            <button
              key={`${direction}-a-${src}-${i}`}
              type="button"
              className="asset-marquee__item"
              onClick={() => onOpen(src)}
              aria-label="Enlarge image"
            >
              <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
        <div className="asset-marquee__cycle" aria-hidden>
          {cycle.map((src, i) => (
            <button
              key={`${direction}-b-${src}-${i}`}
              type="button"
              className="asset-marquee__item"
              onClick={() => onOpen(src)}
              tabIndex={-1}
              aria-label="Enlarge image"
            >
              <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AssetMarquee({ images }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const topImages = images;
  const bottomImages = useMemo(() => [...images].reverse(), [images]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  if (!images.length) return null;

  return (
    <>
      <div className="asset-marquee group flex flex-col gap-4 md:gap-5 hover:[&_.asset-marquee__track]:[animation-play-state:paused]">
        <MarqueeRow images={topImages} direction="right" onOpen={setLightbox} />
        <MarqueeRow images={bottomImages} direction="left" onOpen={setLightbox} />
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white/15 text-xl text-white hover:bg-white/25"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[85vh] max-w-[min(1100px,92vw)] rounded-xl object-contain shadow-2xl"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
