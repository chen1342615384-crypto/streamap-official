/** Frame 1 · UhrtR — 1200 内容宽：左 763 + gap24 + 右 413 */
export function News() {
  return (
    <section id="support" className="w-full bg-black py-[72px]">
      <div className="container-1440">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-[72px] flex items-start justify-between gap-12 max-md:mb-10 max-md:flex-col max-md:gap-6">
            <h2 className="max-w-[610px] shrink-0 text-[48px] font-semibold leading-[1.08] tracking-[-1.44px] text-white max-md:text-[32px]">
              The latest news and perspectives.
            </h2>
            <div className="w-full max-w-[462px] pt-2.5">
              <p className="text-[18px] leading-[1.44] tracking-[-0.36px] text-white">
                Ideas, insights and updates from streamap and across the infrastructure community.
              </p>
              <a
                href="#subscribe"
                className="mt-5 inline-flex items-center gap-1 text-[16px] font-medium text-white hover:opacity-80"
              >
                Subscribe for updates
                <span aria-hidden>»</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-[763fr_413fr] gap-6 max-lg:grid-cols-1">
            <article className="relative h-[769px] overflow-hidden rounded-xl max-lg:h-[480px]">
              <img
                src="/images/assets/U6JFTU.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 pb-8 text-white">
                <p className="text-[20px] font-bold leading-[1.5]">PRODUCT FEATURE</p>
                <h3 className="mt-2 text-[20px] font-medium leading-[1.5] text-white/95">
                  Start fast. Work anywhere. Scale with ease.
                </h3>
                <p className="mt-2 max-w-[551px] text-[16px] leading-[1.2] text-white/95">
                  Explore ArcGIS Online: ready-to-use mapping, analysis, and data sharing
                </p>
              </div>
            </article>

            <div className="flex h-[769px] flex-col gap-6 max-lg:h-auto">
              <article className="relative h-[385px] overflow-hidden rounded-xl max-lg:h-[320px]">
                <img
                  src="/images/assets/J6GsK.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[20px] font-bold leading-[1.5]">PRODUCT FEATURE</p>
                  <h3 className="mt-2 max-w-[364px] text-[20px] font-medium leading-[1.5] text-white/95">
                    Learn how to make location-powered apps
                  </h3>
                </div>
              </article>

              <article className="relative min-h-0 flex-1 overflow-hidden rounded-xl max-lg:h-[320px]">
                <img
                  src="/images/assets/U1gCBP.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[20px] font-bold leading-[1.5]">PRODUCT FEATURE</p>
                  <h3 className="mt-2 max-w-[364px] text-[20px] font-medium leading-[1.5] text-white/95">
                    Esri and Microsoft
                  </h3>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
