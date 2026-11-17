import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type SetStateAction,
} from "react";
import { asset } from "../lib/asset";

type Marker = {
  id: string;
  x: number;
  y: number;
  category: string;
  status: string;
  priority: "High" | "Medium" | "Low";
  location: string;
  preview: string;
};

const MARKERS: Marker[] = [
  {
    id: "m1",
    x: 22,
    y: 40,
    category: "Pothole",
    status: "Detected",
    priority: "High",
    location: "E. Harding Way & N 1st St (sample)",
    preview: asset("images/assets/map/pothole-preview.png"),
  },
  {
    id: "m2",
    x: 44,
    y: 56,
    category: "Pothole",
    status: "Detected",
    priority: "High",
    location: "Harbor Blvd & Main Ave (sample)",
    preview: asset("images/assets/map/pothole-preview.png"),
  },
  {
    id: "m3",
    x: 58,
    y: 34,
    category: "Crack",
    status: "Detected",
    priority: "Medium",
    location: "Central Expressway KM 12.4 (sample)",
    preview: asset("images/assets/map/pothole-preview.png"),
  },
  {
    id: "m4",
    x: 76,
    y: 62,
    category: "Debris",
    status: "Detected",
    priority: "Low",
    location: "Riverside Park Loop (sample)",
    preview: asset("images/assets/map/pothole-preview.png"),
  },
  {
    id: "m5",
    x: 34,
    y: 70,
    category: "Pothole",
    status: "Detected",
    priority: "High",
    location: "Industrial District Gate 3 (sample)",
    preview: asset("images/assets/map/pothole-preview.png"),
  },
];

/** Extra scale when a marker is focused */
const FOCUS_ZOOM = 1.28;
/** Pencil · D5v2vp */
const CARD_W = 306;
const CARD_GAP = 20;

/** Oversized plane factor — wider screens need more bleed so sides never show gray */
function mapSizeFor(vw: number, vh: number) {
  if (!vw || !vh) return 1.5;
  const aspect = vw / vh;
  if (aspect >= 3.5) return 1.85;
  if (aspect >= 2.8) return 1.7;
  if (aspect >= 2.2) return 1.55;
  return 1.5;
}

function sideFor(x: number): "left" | "right" {
  return x >= 50 ? "left" : "right";
}

function openMarker(id: string, setActiveId: Dispatch<SetStateAction<string | null>>) {
  setActiveId((cur) => (cur === id ? null : id));
}

/** Convert viewport-% marker coords onto the oversized map plane */
function planePct(vPercent: number, mapSize: number) {
  const left = (1 - mapSize) / 2;
  return ((vPercent / 100 - left) / mapSize) * 100;
}

/** Keep translated+scaled map covering the viewport (no gray gutters) */
function clampOffset(
  ox: number,
  oy: number,
  vw: number,
  vh: number,
  zoom: number,
  mapSize: number,
) {
  const mapW = vw * mapSize * zoom;
  const mapH = vh * mapSize * zoom;
  return {
    x: Math.min(0, Math.max(vw - mapW, ox)),
    y: Math.min(0, Math.max(vh - mapH, oy)),
  };
}

function baseOffsetFor(
  active: Marker | null,
  vw: number,
  vh: number,
  zoom: number,
  mapSize: number,
) {
  if (active) {
    const mapW = vw * mapSize;
    const mapH = vh * mapSize;
    const mx = (planePct(active.x, mapSize) / 100) * mapW;
    const my = (planePct(active.y, mapSize) / 100) * mapH;
    return {
      x: vw / 2 - mx * zoom,
      y: vh / 2 - my * zoom,
    };
  }
  return {
    x: (vw * (1 - mapSize)) / 2,
    y: (vh * (1 - mapSize)) / 2,
  };
}

function priorityDot(priority: Marker["priority"]) {
  if (priority === "High") return "#e11d2e";
  if (priority === "Medium") return "#f59e0b";
  return "#94a3b8";
}

/** Pencil · kqzK2 — full-bleed map; detail card · D5v2vp */
export function RoadMapDemo() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);

  const active = useMemo(
    () => MARKERS.find((m) => m.id === activeId) ?? null,
    [activeId],
  );

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setViewport({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!activeId) setPreviewOpen(false);
  }, [activeId]);

  useEffect(() => {
    if (!activeId && !previewOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (previewOpen) setPreviewOpen(false);
      else setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, previewOpen]);

  const zoom = active ? FOCUS_ZOOM : 1;
  const mapSize = useMemo(
    () => mapSizeFor(viewport.w, viewport.h),
    [viewport.w, viewport.h],
  );

  const focusBase = useMemo(() => {
    if (!viewport.w || !viewport.h) return { x: 0, y: 0 };
    return baseOffsetFor(active, viewport.w, viewport.h, zoom, mapSize);
  }, [active, viewport, zoom, mapSize]);

  // Reset / re-clamp pan when focus or viewport changes
  useEffect(() => {
    if (!viewport.w || !viewport.h) {
      setPan({ x: 0, y: 0 });
      return;
    }
    const base = baseOffsetFor(active, viewport.w, viewport.h, zoom, mapSize);
    const clamped = clampOffset(
      base.x,
      base.y,
      viewport.w,
      viewport.h,
      zoom,
      mapSize,
    );
    setPan({ x: clamped.x - base.x, y: clamped.y - base.y });
  }, [activeId, active, viewport, zoom, mapSize]);

  const mapTransform = useMemo(() => {
    if (!viewport.w || !viewport.h) {
      return "translate3d(0px, 0px, 0) scale(1)";
    }
    const raw = {
      x: focusBase.x + pan.x,
      y: focusBase.y + pan.y,
    };
    const { x: ox, y: oy } = clampOffset(
      raw.x,
      raw.y,
      viewport.w,
      viewport.h,
      zoom,
      mapSize,
    );
    return `translate3d(${ox}px, ${oy}px, 0) scale(${zoom})`;
  }, [focusBase, pan, viewport, zoom, mapSize]);

  const popupSide = active ? sideFor(active.x) : "right";

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      // Don't start drag from interactive controls
      const t = e.target as HTMLElement;
      if (t.closest("button, a, article")) return;
      dragRef.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        origX: pan.x,
        origY: pan.y,
        moved: false,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    },
    [pan],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (!d || d.pointerId !== e.pointerId) return;
      if (!viewport.w || !viewport.h) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (!d.moved && dx * dx + dy * dy > 9) d.moved = true;
      const rawX = d.origX + dx;
      const rawY = d.origY + dy;
      const clamped = clampOffset(
        focusBase.x + rawX,
        focusBase.y + rawY,
        viewport.w,
        viewport.h,
        zoom,
        mapSize,
      );
      setPan({ x: clamped.x - focusBase.x, y: clamped.y - focusBase.y });
    },
    [focusBase, viewport, zoom, mapSize],
  );

  const endDrag = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const wasClick = !d.moved;
    dragRef.current = null;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (wasClick) setActiveId(null);
  }, []);

  return (
    <section id="products" className="w-full bg-white py-[100px]">
      <div className="container-1440">
        <div className="mb-[72px] flex items-start justify-between gap-10 max-lg:gap-8 max-md:mb-10 max-md:flex-col max-md:gap-6">
          <h2 className="max-w-[610px] shrink-0 text-[48px] font-semibold leading-[1.08] tracking-[-1.44px] text-[#111213] max-md:text-[32px]">
            Models engineered for road condition assessment.
          </h2>
          <p className="w-full max-w-[462px] pt-2.5 text-[18px] leading-[1.44] tracking-[-0.36px] text-[#111213]">
            Robustness in complex scenes. Consistency in grading. Scalability nationwide.
          </p>
        </div>
      </div>

      <div className="relative mx-[100px] overflow-hidden rounded-[12px] bg-[#e8eaed] max-lg:mx-10 max-md:mx-5">
        <div
          ref={viewportRef}
          className={`relative h-[380px] w-full overflow-hidden sm:h-[440px] md:h-[520px] lg:h-[560px] xl:h-[600px] 2xl:h-[640px] ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* Full-bleed oversized plane — covers all screen widths; drag clamped to image */}
          <div
            className={`absolute left-0 top-0 origin-top-left will-change-transform ${
              dragging
                ? ""
                : "transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            }`}
            style={{
              width: `${mapSize * 100}%`,
              height: `${mapSize * 100}%`,
              transform: mapTransform,
            }}
          >
            <img
              src={asset("images/assets/map/map-base.png")}
              alt="Demo static map"
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
            />

            {MARKERS.map((m) => {
              const isActive = m.id === activeId;
              const chipSide = sideFor(m.x);
              const showChip = !activeId || isActive;
              const left = planePct(m.x, mapSize);
              const top = planePct(m.y, mapSize);

              return (
                <div
                  key={m.id}
                  className="absolute z-10"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <button
                    type="button"
                    aria-label={`${m.category} marker`}
                    aria-pressed={isActive}
                    className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      openMarker(m.id, setActiveId);
                    }}
                  >
                    <span className={`roadmap-glow ${isActive ? "is-active" : ""}`} />
                    <span className={`roadmap-dot ${isActive ? "is-active" : ""}`} />
                  </button>

                  {showChip ? (
                    <button
                      type="button"
                      aria-label={`Open ${m.category} details`}
                      className={`absolute top-0 z-[11] flex cursor-pointer items-center gap-1.5 rounded-md bg-[#e11d2e] px-2 py-1 text-left text-white shadow-[0_6px_14px_rgba(0,0,0,0.22)] transition hover:brightness-110 ${
                        isActive ? "pointer-events-none opacity-0" : "opacity-100"
                      }`}
                      style={
                        chipSide === "right"
                          ? { left: 12, transform: "translateY(-50%)" }
                          : { right: 12, left: "auto", transform: "translateY(-50%)" }
                      }
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        openMarker(m.id, setActiveId);
                      }}
                    >
                      <span className="grid size-4 shrink-0 place-items-center rounded-sm bg-white/15 text-[9px]">
                        ●
                      </span>
                      <span className="leading-tight">
                        <span className="block whitespace-nowrap text-[12px] font-bold">
                          {m.category}
                        </span>
                        <span className="block whitespace-nowrap text-[10px] text-white/90">
                          {m.priority} · {m.status}
                        </span>
                      </span>
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Pencil · D5v2vp — viewport-space card beside centered marker */}
          {active ? (
            <article
              className="absolute top-1/2 z-20 flex w-[min(306px,calc(100%-32px))] flex-col gap-3 overflow-hidden rounded-[6px] bg-white p-[15px] shadow-[0_18px_20px_rgba(0,0,0,0.8)]"
              style={{
                left: "50%",
                maxWidth: CARD_W,
                transform:
                  popupSide === "right"
                    ? `translate(${CARD_GAP}px, -50%)`
                    : `translate(calc(-100% - ${CARD_GAP}px), -50%)`,
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${active.category} details`}
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <img
                  src={asset("images/assets/map/Xg7PX.png")}
                  alt=""
                  className="size-10 shrink-0 rounded-[8px] object-cover"
                  draggable={false}
                />
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="truncate text-[19px] font-bold leading-tight text-black">
                    {active.category}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[11.5px] leading-none text-[#111213]">
                    <span
                      className="inline-block size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: priorityDot(active.priority) }}
                      aria-hidden
                    />
                    {active.priority} priority
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  className="grid size-8 shrink-0 place-items-center rounded-md text-[20px] leading-none text-[#666] hover:bg-black/5"
                  onClick={() => setActiveId(null)}
                >
                  ×
                </button>
              </div>

              {/* Key / value rows */}
              <dl className="flex flex-col gap-1">
                {(
                  [
                    ["CATEGORY", active.category],
                    ["STATUS", active.status],
                    ["PRIORITY", active.priority],
                    ["LOCATION", active.location],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="flex items-baseline gap-5">
                    <dt className="w-[72px] shrink-0 text-[11px] uppercase tracking-[1.1px] text-[#888]">
                      {label}
                    </dt>
                    <dd className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-black">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Preview — click to enlarge */}
              <button
                type="button"
                aria-label={`Enlarge ${active.category} preview`}
                className="group relative h-[164px] w-full cursor-zoom-in overflow-hidden rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewOpen(true);
                }}
              >
                <img
                  src={active.preview}
                  alt=""
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
                  draggable={false}
                />
              </button>
            </article>
          ) : null}
        </div>
      </div>

      <p className="mt-4 px-5 text-center text-[12px] text-[#808791]">
        Demo map — static sample imagery, no live geographic data loaded.
      </p>

      {/* Preview lightbox */}
      {previewOpen && active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-6 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.category} preview`}
          onClick={() => setPreviewOpen(false)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white/10 text-[28px] leading-none text-white transition hover:bg-white/20"
            onClick={() => setPreviewOpen(false)}
          >
            ×
          </button>
          <img
            src={active.preview}
            alt={`${active.category} detection preview`}
            className="max-h-[min(90vh,900px)] max-w-[min(92vw,1200px)] rounded-md object-contain shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
