import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Stories } from "../components/Stories";
import { RoadMapDemo } from "../components/RoadMapDemo";
import { News } from "../components/News";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  useSmoothScroll();

  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const anims = els.map((el) =>
      gsap.fromTo(
        el,
        { y: 24, autoAlpha: 0.7 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      ),
    );
    return () => anims.forEach((a) => a.scrollTrigger?.kill());
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main>
        <Hero />
        <div data-reveal>
          <Stats />
        </div>
        <div data-reveal>
          <Stories />
        </div>
        <div data-reveal>
          <RoadMapDemo />
        </div>
        <div data-reveal>
          <News />
        </div>
        <div data-reveal>
          <Contact />
        </div>
      </main>
      <div data-reveal>
        <Footer />
      </div>
    </div>
  );
}
