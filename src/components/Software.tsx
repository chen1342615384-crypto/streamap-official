import { asset } from "../lib/asset";

const smallCards = [
  {
    title: "Connected data for complete clarity",
    desc: "One open environment for every team and stage. Decide with the full picture.",
    img: asset("images/assets/Q7CShk.png"),
  },
  {
    title: "Ground insight for built-in resilience",
    desc: "Ground conditions are shifting. Model it before you build on it.",
    img: asset("images/assets/KU47u.png"),
  },
  {
    title: "Continuous insight for better asset performance",
    desc: "Monitor performance, anticipate issues, and optimize assets over time.",
    img: asset("images/assets/ySZQ9.png"),
  },
] as const;

/** Frame 1 · R8F8Z */
export function Software() {
  return (
    <section id="products" className="w-full bg-white py-[100px]">
      <div className="container-1440">
        <div className="mb-[72px] flex flex-wrap items-start justify-between gap-10">
          <h2 className="max-w-[610px] text-[48px] font-semibold leading-[1.08] tracking-[-1.44px] text-[#111213] max-md:text-[32px]">
            Software engineered for today&apos;s demands.
          </h2>
          <p className="max-w-[460px] pt-2.5 text-[18px] leading-[1.44] tracking-[-0.36px] text-[#111213]">
            Clarity in design. Resilience in operations. Performance and capacity at scale.
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {/* large feature card */}
          <li>
            <article className="feature-tile relative flex h-[420px] overflow-hidden rounded-xl bg-[#1b1c1e] max-lg:h-auto max-lg:flex-col">
              <div className="relative z-10 flex w-[400px] shrink-0 flex-col justify-between gap-10 p-7 max-lg:w-full">
                <div>
                  <h3 className="text-[22px] font-medium text-[#fbfcfd]">Applied AI for amplified expertise</h3>
                  <p className="mt-3 text-[14px] leading-[1.57] text-[#ced1d5]">
                    Work is growing faster than the workforce. Extend what every team can deliver.
                  </p>
                </div>
                <a
                  href="#learn-more"
                  className="inline-flex h-12 w-fit items-center gap-1 rounded bg-[#474c53] px-8 text-[15px] font-medium tracking-[-0.45px] text-[#fbfcfd] hover:bg-[#3a3f45]"
                >
                  Learn more <span aria-hidden>»</span>
                </a>
              </div>
              <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-r-xl max-lg:rounded-none">
                <img src={asset("images/assets/Rgzto.png")} alt="" className="absolute inset-0 h-full w-full object-cover object-left" draggable={false} />
              </div>
            </article>
          </li>

          {/* three small cards */}
          <li className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {smallCards.map((card) => (
              <article key={card.title} className="feature-tile relative flex h-[540px] flex-col overflow-hidden rounded-xl bg-[#1b1c1e]">
                <div className="relative z-10 p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="max-w-[280px] text-[22px] font-medium leading-snug text-[#fbfcfd]">{card.title}</h3>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/30 text-sm text-white">↗</span>
                  </div>
                  <p className="max-w-[280px] text-[14px] leading-[1.57] text-[#ced1d5]">{card.desc}</p>
                </div>
                <div className="relative mt-auto h-[384px] overflow-hidden">
                  <img src={card.img} alt="" className="absolute inset-0 h-full w-full object-cover object-top" draggable={false} />
                </div>
              </article>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
}
