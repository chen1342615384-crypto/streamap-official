import { useEffect, useRef, useState } from "react";
import { HERO_POSTER, HERO_VIDEO } from "../data/media";

type Props = {
  title: string;
  description: string;
};

/** Solutions subpage hero — video bg reused from homepage */
export function SolutionHero({ title, description }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlaying = () => setReady(true);
    v.addEventListener("playing", onPlaying);
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("x5-video-player-type", "h5");
    v.setAttribute("x5-playsinline", "true");
    v.muted = true;
    void v.play().catch(() => {});
    return () => v.removeEventListener("playing", onPlaying);
  }, []);

  return (
    <section className="relative h-[min(946px,100svh)] min-h-[640px] w-full overflow-hidden bg-[#151b17]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={HERO_POSTER}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(187deg, rgba(0,0,0,0) 20.79%, rgba(0,0,0,0.8) 87.72%)",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end px-[clamp(20px,12.5vw,240px)] pb-[clamp(64px,11vh,120px)] pt-24">
        <div className="w-full max-w-[1440px]">
          <h1 className="max-w-[720px] text-[clamp(36px,4vw,56px)] font-semibold leading-[1.11] tracking-[-1.68px] text-white">
            {title}
          </h1>
          <p className="mt-6 max-w-[560px] text-[clamp(16px,1.2vw,18px)] leading-[1.44] tracking-[-0.36px] text-white">
            {description}
          </p>
        </div>
      </div>

      <a
        href="#solution-content"
        aria-label="Scroll down"
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-[28px] leading-none text-white"
      >
        ▾
      </a>
    </section>
  );
}
