import { Globe } from "./Globe";

const stats = [
  { label: "REDUCE RISK", value: "380+", desc: "AI Detections" },
  { label: "INCREASE EFFICIENCY", value: "1.8M+", desc: "km covered daily" },
  { label: "TRANSFORM YOUR BUSINESS", value: "28+", desc: "Countries Covered" },
] as const;

/** Frame 1 · e4TXr + rotating globe on the right */
export function Stats() {
  return (
    <section id="company" className="mx-auto w-full max-w-[1920px] bg-white py-[100px]">
      <div className="container-1440">
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[minmax(0,1fr)_560px]">
          {/* left: copy + stats */}
          <div>
            <div className="max-w-[640px] pb-10">
              <h2 className="whitespace-pre-line text-[52px] font-bold leading-[1.08] tracking-[-1.04px] text-[#1c1917] max-md:text-[36px]">
                {"Built different.\nProven where it counts."}
              </h2>
              <p className="mt-6 max-w-[560px] text-[24px] font-bold leading-[1.35] text-[#1c1917] max-md:text-[18px]">
                Deepening Global Presence, Building a Full-Scope Smart Road Service Network
              </p>
            </div>

            <div className="grid max-w-[720px] grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2">
              {stats.map((item) => (
                <article key={item.label} className="pt-2">
                  <p
                    className="text-[12px] font-bold tracking-[2px] text-[#1c1917]"
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-6 text-[72px] font-medium leading-[1.1] tracking-[-1px] text-[#1c1917] max-md:text-[48px]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[22px] font-medium leading-[1.33] text-[#1c1917]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* right: rotating globe (图1红框区域) */}
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            <Globe className="absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
