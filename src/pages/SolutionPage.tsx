import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { SolutionHero } from "../components/SolutionHero";
import { AssetMarquee } from "../components/AssetMarquee";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { solutionBySlug, type SolutionSlug } from "../data/solutions";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export function SolutionPage() {
  const { slug = "" } = useParams();
  const solution = solutionBySlug[slug as SolutionSlug];
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!solution) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main>
        <SolutionHero title={solution.title} description={solution.heroDesc} />

        <section id="solution-content" className="w-full bg-white py-[50px]">
          <div className="container-1440">
            <div className="mb-12 max-w-[720px]">
              <h2 className="whitespace-pre-line text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.15] text-[#1c1917]">
                {solution.assetsHeadline}
              </h2>
              <p className="mt-6 text-[24px] font-bold leading-[1.35] text-[#1c1917] max-md:text-[18px]">
                {solution.assetsDesc}
              </p>
            </div>

          </div>

          <div className="mt-2 w-full">
            <AssetMarquee images={solution.assetImages} />
          </div>
        </section>

        {solution.features.map((feature, index) => (
          <section key={`${feature.title}-${index}`} className="w-full bg-white py-[50px]">
            <div className="container-1440">
              <div
                className={`flex flex-col items-center gap-10 lg:gap-16 ${
                  feature.mediaLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full overflow-hidden rounded-xl lg:w-[55%]">
                  <img
                    src={feature.media}
                    alt=""
                    className="aspect-[687/391] w-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="w-full lg:w-[45%]">
                  <h3 className="text-[clamp(28px,3.2vw,52px)] font-bold leading-[1.15] text-[#1c1917]">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-[16px] font-medium leading-[1.55] text-[#1c1917]">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
