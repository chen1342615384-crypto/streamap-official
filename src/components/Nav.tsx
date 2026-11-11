import { useEffect, useId, useRef, useState } from "react";
import { asset } from "../lib/asset";

type MegaLink = { label: string; href: string; desc?: string };
type MegaColumn = { title: string; links: MegaLink[] };
type MegaPanel = {
  id: string;
  label: string;
  columns: MegaColumn[];
  promo?: { eyebrow: string; title: string; href: string; links?: MegaLink[] };
};

const menus: MegaPanel[] = [
  {
    id: "products",
    label: "Products",
    columns: [
      {
        title: "Featured products",
        links: [
          { label: "SeekRight Road", href: "#products" },
          { label: "Pavement AI", href: "#products" },
          { label: "Asset Inventory", href: "#products" },
          { label: "Night Mode Inspection", href: "#products" },
          { label: "Chainage Mapping", href: "#products" },
          { label: "Incident Management", href: "#products" },
          { label: "All products", href: "#products" },
        ],
      },
      {
        title: "Expand what you can do",
        links: [
          {
            label: "Talk to an expert",
            href: "#support",
            desc: "Get a demo tailored to your highway network.",
          },
          {
            label: "Find a local partner",
            href: "#company",
            desc: "Work with certified partners in your region.",
          },
          {
            label: "Developer resources",
            href: "#support",
            desc: "APIs and integration guides for ERP systems.",
          },
          {
            label: "Training & onboarding",
            href: "#support",
            desc: "Help your teams adopt AI inspection faster.",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Product highlight",
      title: "Precise pavement distress detection & intelligent road maintenance",
      href: "#industry-solutions",
      links: [
        { label: "Explore industry solutions", href: "#industry-solutions" },
        { label: "View user stories", href: "#industry-solutions" },
      ],
    },
  },
  {
    id: "industry",
    label: "Industry solutions",
    columns: [
      {
        title: "By industry",
        links: [
          { label: "Sanitation", href: "#industry-solutions" },
          { label: "Road & Pavement", href: "#industry-solutions" },
          { label: "Work Site", href: "#industry-solutions" },
          { label: "Roadside Facility", href: "#industry-solutions" },
          { label: "Urban Environment", href: "#industry-solutions" },
        ],
      },
      {
        title: "Outcomes",
        links: [
          {
            label: "Reduce risk",
            href: "#company",
            desc: "Detect defects before they become liabilities.",
          },
          {
            label: "Increase efficiency",
            href: "#company",
            desc: "Survey more kilometers with the same team.",
          },
          {
            label: "Transform operations",
            href: "#company",
            desc: "Connect inspection data to maintenance workflows.",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Global presence",
      title: "Deepening global presence, building a full-scope smart road service network",
      href: "#company",
      links: [{ label: "See where we operate", href: "#company" }],
    },
  },
  {
    id: "support",
    label: "Support",
    columns: [
      {
        title: "Help center",
        links: [
          { label: "Documentation", href: "#support" },
          { label: "Training", href: "#support" },
          { label: "Community", href: "#support" },
          { label: "Status & updates", href: "#support" },
        ],
      },
      {
        title: "Contact",
        links: [
          {
            label: "Contact sales",
            href: "#support",
            desc: "Talk through deployment and pricing.",
          },
          {
            label: "Technical support",
            href: "#support",
            desc: "Get help from our product specialists.",
          },
          {
            label: "Subscribe for updates",
            href: "#support",
            desc: "News and product releases in your inbox.",
          },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        title: "About Streamap",
        links: [
          { label: "About us", href: "#company" },
          { label: "Careers", href: "#company" },
          { label: "News", href: "#support" },
          { label: "Partners", href: "#company" },
        ],
      },
      {
        title: "Offices",
        links: [
          { label: "深圳公司", href: "#company" },
          { label: "日本子公司", href: "#company" },
          { label: "美国子公司", href: "#company" },
          { label: "新加坡子公司", href: "#company" },
        ],
      },
    ],
    promo: {
      eyebrow: "Company",
      title: "Infrastructure depends on the people who get it right.",
      href: "#company",
      links: [{ label: "Learn about Streamap", href: "#company" }],
    },
  },
];

function Chevron({ open = false, color = "#111213" }: { open?: boolean; color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M4.16 6.16L7.99 10.33L11.83 6.16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId]);

  const active = menus.find((m) => m.id === openId) ?? null;

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  return (
    <header ref={rootRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* dim backdrop when mega menu open — Bentley style */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-screen bg-black/35 transition-opacity duration-300 ${
          openId ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <div className="pointer-events-auto relative mx-auto w-full max-w-[1920px] px-[39.5px] pt-[56px] max-md:pt-4">
        <div
          className={`relative mx-auto flex h-[60px] w-full max-w-[1841px] items-center gap-9 rounded-[12px] bg-white px-8 ${
            scrolled || openId
              ? "shadow-[0_2px_40px_rgba(0,0,0,0.04),0_1px_5px_rgba(0,0,0,0.08)]"
              : "shadow-[0_0_2px_rgba(0,0,0,0.12)]"
          }`}
        >
          <a href="#top" className="block h-[29px] w-[120px] shrink-0" onClick={() => setOpenId(null)}>
            <img src={asset("images/assets/jxfx8.png")} alt="streamap" className="h-full w-full object-contain object-left" />
          </a>

          <nav className="hidden min-w-0 flex-1 items-center lg:flex" aria-label="Primary">
            {menus.map((item) => {
              const isOpen = openId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className="inline-flex h-[60px] items-center px-1"
                >
                  <span
                    className={`inline-flex h-11 items-center gap-1 rounded px-[25px] text-[15px] font-medium tracking-[-0.3px] text-[#111213] transition-colors ${
                      isOpen ? "bg-black/[0.06]" : "hover:bg-black/[0.03]"
                    }`}
                  >
                    {item.label}
                    <Chevron open={isOpen} />
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 text-[14px] tracking-[-0.14px] text-[#111213]">
            <a href="#signin" className="inline-flex h-11 items-center gap-1.5 rounded px-2.5 hover:bg-black/[0.03]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 7.5a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Zm0 1.25c-2.4 0-4.5 1.2-4.5 2.75V12.5h9v-.999c0-1.55-2.1-2.75-4.5-2.75Z"
                  fill="#111213"
                />
              </svg>
              Sign In
            </a>
            <button type="button" className="inline-flex h-11 items-center gap-1 rounded px-2.5 hover:bg-black/[0.03]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.5" stroke="#111213" strokeWidth="1.2" />
                <path
                  d="M1.5 8h13M8 1.5c2 2.2 3 4.3 3 6.5s-1 4.3-3 6.5c-2-2.2-3-4.3-3-6.5s1-4.3 3-6.5Z"
                  stroke="#111213"
                  strokeWidth="1.2"
                />
              </svg>
              ENGLISH
              <Chevron color="#808791" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-1 rounded px-2.5 hover:bg-black/[0.03] max-md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M8 14s4.5-3.4 4.5-7A4.5 4.5 0 0 0 8 2.5 4.5 4.5 0 0 0 3.5 7c0 3.6 4.5 7 4.5 7Z"
                  stroke="#111213"
                  strokeWidth="1.2"
                />
                <circle cx="8" cy="7" r="1.5" fill="#111213" />
              </svg>
              United States
              <Chevron color="#808791" />
            </button>
            <button type="button" aria-label="Search" className="grid size-8 place-items-center rounded hover:bg-black/[0.03]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="5" stroke="#156B54" strokeWidth="1.4" />
                <path d="M11 11l3 3" stroke="#156B54" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        <div
          id={panelId}
          role="dialog"
          aria-label={active?.label ?? "Menu"}
          hidden={!active}
          className={`mega-menu mx-auto mt-2 w-full max-w-[1841px] overflow-hidden rounded-[12px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.14)] transition-[opacity,transform] duration-200 ${
            active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {active && (
            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr_0.9fr]">
              {active.columns.map((col) => (
                <div key={col.title} className="border-b border-[#e8eaed] p-8 lg:border-b-0 lg:border-r">
                  <p className="mb-4 text-[12px] font-bold uppercase tracking-[1.2px] text-[#156B54]">
                    {col.title}
                  </p>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => setOpenId(null)}
                          className={`block rounded-lg px-3 py-2.5 transition-colors hover:bg-[#f4f6f5] ${
                            link.desc ? "hover:bg-[#f4f6f5]" : ""
                          }`}
                        >
                          <span className="text-[15px] font-medium text-[#111213] hover:text-[#156B54]">
                            {link.label}
                          </span>
                          {link.desc && (
                            <span className="mt-0.5 block text-[13px] leading-snug text-[#5b636d]">
                              {link.desc}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {active.promo && (
                <div className="bg-[#f7f8f9] p-8">
                  <p className="mb-3 text-[12px] font-bold uppercase tracking-[1.2px] text-[#156B54]">
                    {active.promo.eyebrow}
                  </p>
                  <a
                    href={active.promo.href}
                    onClick={() => setOpenId(null)}
                    className="block text-[20px] font-semibold leading-snug tracking-[-0.3px] text-[#111213] hover:text-[#156B54]"
                  >
                    {active.promo.title}
                  </a>
                  {active.promo.links && (
                    <ul className="mt-6 space-y-3">
                      {active.promo.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={() => setOpenId(null)}
                            className="inline-flex items-center gap-1 text-[14px] font-medium text-[#156B54] hover:underline"
                          >
                            {link.label}
                            <span aria-hidden>»</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
