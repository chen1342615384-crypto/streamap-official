import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(rootSelector = "main") {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const triggers: ScrollTrigger[] = [];

    items.forEach((el, i) => {
      const delay = Number(el.dataset.revealDelay || 0);
      const y = Number(el.dataset.revealY || 36);
      const tween = gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      void i;
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [rootSelector]);
}
