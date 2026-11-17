import { asset } from "../lib/asset";

type Props = {
  title: string;
  description: string;
};

/** Pencil · JQlgC — product CTA */
export function ProductContact({ title, description }: Props) {
  return (
    <section id="contact" className="w-full scroll-mt-24 bg-[#090a0b] py-[100px] max-md:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[50px] px-[clamp(20px,6.25vw,120px)]">
        <div className="flex w-full max-w-[930px] flex-col items-center gap-8 text-center">
          <div className="flex w-full flex-col items-center gap-5">
            <h2 className="max-w-[930px] text-[clamp(32px,4vw,56px)] font-semibold leading-[1.11] tracking-[-0.04em] text-[#fbfcfd]">
              {title}
            </h2>
            <p className="max-w-[720px] text-[18px] leading-[1.33] tracking-[-0.02em] text-[#fbfcfd]">
              {description}
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex h-12 w-[200px] items-center justify-center gap-1 rounded bg-[#fbfcfd] px-[21px] text-[15px] font-medium tracking-[-0.04em] text-[#1b1c1e] transition hover:bg-white"
          >
            Contact Us
            <span aria-hidden className="text-[14px]">
              {"→"}
            </span>
          </a>
        </div>

        <img
          src={asset("images/assets/contact-wordmark.png")}
          alt=""
          className="mt-2 h-auto w-full max-w-[1200px] object-contain opacity-20"
          draggable={false}
        />
      </div>
    </section>
  );
}
