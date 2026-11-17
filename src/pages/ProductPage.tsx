import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { ProductHero } from "../components/ProductHero";
import { ProductSpecs } from "../components/ProductSpecs";
import { ProductContact } from "../components/ProductContact";
import { Footer } from "../components/Footer";
import { productBySlug, type ProductSlug } from "../data/products";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = productBySlug[slug as ProductSlug];
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main>
        <ProductHero product={product} />
        <ProductSpecs blocks={product.specs} />
        <ProductContact title={product.ctaTitle} description={product.ctaDesc} />
      </main>
      <Footer />
    </div>
  );
}
