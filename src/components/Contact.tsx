import { asset } from "../lib/asset";

/** Pencil · iHFNn — contact CTA before footer */
export function Contact() {
  return (
    <section id="about" className="w-full scroll-mt-24 bg-[#090a0b] py-[100px]">
      <div id="contact" className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[50px] px-[120px] max-lg:px-12 max-md:px-5">
        <div className="flex w-full max-w-[930px] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-5 text-center">
            <h2 className="max-w-[930px] text-[56px] font-semibold leading-[1.11] tracking-[-2.24px] text-[#fbfcfd] max-md:text-[32px] max-md:tracking-[-1px]">
              Infrastructure depends on the people who get it right.
            </h2>
            <p className="text-[18px] leading-[1.33] tracking-[-0.36px] text-[#fbfcfd]">
              Behind them is Streamap.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex h-12 w-[200px] items-center justify-center gap-1 rounded bg-[#fbfcfd] px-[21px] text-[15px] font-medium tracking-[-0.6px] text-[#1b1c1e] transition hover:bg-white"
          >
            Contact Us
            <span aria-hidden className="text-[14px]">
              →
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
