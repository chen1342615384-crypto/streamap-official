import { useEffect, useState, type FormEvent } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { contactContent } from "../data/company";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const fields = [
  { id: "firstName", label: "First / Given Name *", type: "text" },
  { id: "lastName", label: "Last / Family Name *", type: "text" },
  { id: "email", label: "Work Email *", type: "email" },
  { id: "country", label: "Country/Region *", type: "text" },
  { id: "company", label: "Company / Organization Name *", type: "text" },
] as const;

/** Pencil · X1OJqg — Contact us */
export function ContactPage() {
  useSmoothScroll();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111213]">
      <Nav />
      <main>
        <section className="relative h-[490px] w-full overflow-hidden bg-[#0b1524] max-md:h-[380px]">
          <img
            src={contactContent.heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#020c1b]/[0.55]" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-end px-[clamp(20px,6.25vw,120px)] pb-16">
            <div className="max-w-[960px]">
              <h1 className="text-[clamp(36px,4.5vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                {contactContent.heroTitle}
              </h1>
              <p className="mt-5 max-w-[720px] text-[clamp(16px,1.3vw,18px)] leading-[1.5] text-white/95">
                {contactContent.heroDesc}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-[100px] max-md:py-16">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-16 px-[clamp(20px,6.25vw,120px)] lg:grid-cols-2">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[1.5px] text-[#7c8897]">
                {contactContent.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(36px,4vw,52px)] font-bold leading-[1.08] text-[#111213]">
                {contactContent.title}
              </h2>
              <p className="mt-5 text-[16px] leading-[1.55] text-[#474c53]">{contactContent.intro}</p>

              <dl className="mt-10 space-y-5 border-t border-[#e8eaed] pt-8">
                {contactContent.details.map((row) => (
                  <div key={row.label} className="grid grid-cols-[120px_1fr] gap-4 max-sm:grid-cols-1">
                    <dt className="text-[13px] uppercase tracking-[0.08em] text-[#7c8897]">{row.label}</dt>
                    <dd className="text-[15px] font-medium text-[#111213]">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-14">
                <h3 className="text-[28px] font-bold text-[#111213]">{contactContent.formTitle}</h3>
                <p className="mt-3 text-[15px] text-[#474c53]">{contactContent.formDesc}</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {fields.map((field) => (
                <label key={field.id} className="block">
                  <span className="mb-2 block text-[13px] font-medium text-[#474c53]">{field.label}</span>
                  <input
                    required
                    name={field.id}
                    type={field.type}
                    className="h-12 w-full rounded border border-[#d7dbe0] bg-white px-4 text-[15px] outline-none transition focus:border-[#111213]"
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-[13px] font-medium text-[#474c53]">
                  Product of Interest *
                </span>
                <select
                  required
                  name="product"
                  defaultValue=""
                  className="h-12 w-full rounded border border-[#d7dbe0] bg-white px-4 text-[15px] outline-none transition focus:border-[#111213]"
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  <option>P4 Set</option>
                  <option>C40P Set</option>
                  <option>P2 Set</option>
                  <option>Pixel Platform</option>
                  <option>Asset Management Platform</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[13px] font-medium text-[#474c53]">Inquiry Details</span>
                <textarea
                  name="details"
                  rows={5}
                  className="w-full resize-y rounded border border-[#d7dbe0] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#111213]"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded bg-[#111213] px-8 text-[15px] font-medium text-white transition hover:bg-black"
              >
                {"Submit →"}
              </button>
              {sent ? (
                <p className="text-[14px] text-[#156B54]">Thanks — we will get back to you soon.</p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
