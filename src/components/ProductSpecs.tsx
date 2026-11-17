import type { SpecBlock } from "../data/products";

/** Pencil · A0hVX / LhiAq / CX4TK — left title + right spec table */
export function ProductSpecs({ blocks }: { blocks: SpecBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <section
          key={block.title}
          className="w-full bg-white py-[100px] max-md:py-16"
        >
          <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between gap-16 px-[clamp(20px,6.25vw,120px)] max-lg:flex-col max-lg:gap-10">
            <div className="w-full max-w-[491px] shrink-0 pt-1">
              <h2 className="whitespace-pre-line text-[clamp(36px,4.2vw,64px)] font-bold leading-[1.06] tracking-[-0.015em] text-[#071427]">
                {block.title}
              </h2>
              <p className="mt-10 text-[16px] leading-[1.9] text-[#6f7c8c]">
                {block.description}
              </p>
            </div>

            <div className="w-full max-w-[443px] lg:ml-auto">
              <dl>
                {block.rows.map((row) => (
                  <div
                    key={`${block.title}-${row.label}`}
                    className="flex min-h-[79px] items-center justify-between gap-6 border-b border-[#e4e8ed] py-5"
                  >
                    <dt className="shrink-0 text-[13px] leading-[1.65] text-[#7c8897]">
                      {row.label}
                    </dt>
                    <dd className="max-w-[55%] text-right text-[16px] font-semibold leading-[1.65] text-[#182438]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
