import type { Product } from "../data/products";

/** Pencil · UG3zH — product page hero */
export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="relative h-[820px] w-full overflow-hidden bg-[#07111f] max-xl:h-[720px] max-md:h-auto max-md:min-h-[640px]">
      <img
        src={product.heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-right max-md:object-center"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,12,27,0.66) 0%, rgba(2,15,33,0.2) 45%, rgba(0,25,61,0.05) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-end px-[clamp(20px,6.25vw,120px)] pb-14 pt-28 max-md:pb-10">
        <div className="max-w-[776px]">
          <h1 className="text-[clamp(56px,7vw,112px)] font-bold leading-[0.92] tracking-[-0.02em] text-white">
            {product.headline}
          </h1>
          <p className="mt-8 max-w-[720px] text-[clamp(18px,1.6vw,24px)] leading-[1.65] text-white">
            {product.kitLine}
          </p>
          <p className="mt-5 max-w-[610px] text-[18px] leading-[1.85] text-[#c9d4e2]">
            {product.summary}
          </p>
        </div>

        <dl className="mt-14 grid w-full max-w-[900px] grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4">
          {product.heroStats.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col gap-1.5">
              <dd className="truncate text-[20px] font-bold leading-[1.65] text-white">
                {stat.value}
              </dd>
              <dt className="text-[11px] leading-[1.65] text-[#9fb0c4]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
