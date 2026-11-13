import { useEffect, useRef, useState } from "react";
import { HERO_POSTER, HERO_VIDEO } from "../data/media";

/** Frame 1 · W7CL4A — full-viewport hero, Streamax-style MP4 bg */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlaying = () => {
      setReady(true);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("play", onPlay);

    // match cn.streamax.com mobile playback attrs
    v.setAttribute("webkit-playsinline", "true");
    v.setAttribute("x5-video-player-type", "h5");
    v.setAttribute("x5-playsinline", "true");

    // browsers may block autoplay until muted — ensure + play
    v.muted = true;
    const tryPlay = v.play();
    if (tryPlay && typeof tryPlay.then === "function") {
      tryPlay.catch(() => {
        /* user gesture may be required; keep poster */
      });
    }

    return () => {
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("play", onPlay);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
    } else {
      v.pause();
    }
  };

  return (
    <section id="top" className="relative h-svh min-h-[640px] w-full overflow-hidden bg-[#151b17]">
      <div className="hero-video absolute inset-0 overflow-hidden">
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
          <h1 className="max-w-[536px] text-[clamp(36px,4vw,56px)] font-semibold leading-[1.11] tracking-[-1.68px] text-white">
            Where Vision Meets Intelligence.
          </h1>
          <p className="mt-6 max-w-[536px] text-[clamp(16px,1.2vw,18px)] leading-[1.44] tracking-[-0.36px] text-white">
            Advancing how we see, understand and manage our roads and cities
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={togglePlay}
        className="absolute right-[clamp(16px,4vw,79px)] top-[clamp(140px,28vh,299px)] z-20 grid size-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-[8px]"
      >
        {playing ? (
          <span className="flex gap-1" aria-hidden>
            <span className="h-3.5 w-[3px] rounded-sm bg-white" />
            <span className="h-3.5 w-[3px] rounded-sm bg-white" />
          </span>
        ) : (
          <span
            className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white"
            aria-hidden
          />
        )}
      </button>

      <a
        href="#company"
        aria-label="Scroll down"
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-[28px] leading-none text-white"
      >
        ▾
      </a>
    </section>
  );
}
