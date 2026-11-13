import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { asset } from "../lib/asset";
import { solutionPath } from "../data/solutions";

type MegaLink = { label: string; href?: string; to?: string };
type MegaColumn = { title: string; links: MegaLink[] };
type MegaPanel = {
  id: string;
  label: string;
  columns: MegaColumn[];
};

const menus: MegaPanel[] = [
  {
    id: "solutions",
    label: "Solutions",
    columns: [
      {
        title: "Inspection",
        links: [
          { label: "Road & Pavement", to: solutionPath("road-pavement") },
          { label: "Roadside Facility", to: solutionPath("roadside-facility") },
          { label: "City & Environment", to: solutionPath("city-environment") },
          { label: "Work Site Safety", to: solutionPath("work-site-safety") },
        ],
      },
      {
        title: "Management",
        links: [
          {
            label: "Infrastructure Asset Management",
            to: solutionPath("infrastructure-asset-management"),
          },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    columns: [
      {
        title: "Devices",
        links: [
          { label: "P4 Set", href: "#products" },
          { label: "C40P Set", href: "#products" },
          { label: "P2 Set", href: "#products" },
        ],
      },
      {
        title: "Platforms",
        links: [
          { label: "Pixel Platform", href: "#products" },
          { label: "Asset Management Platform", href: "#products" },
        ],
      },
    ],
  },
];

function Chevron({ open = false, color = "currentColor" }: { open?: boolean; color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4.16 6.16L7.99 10.33L11.83 6.16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const location = useLocation();

  const solid = scrolled || Boolean(openId);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setOpenId(null);
    setScrolled(window.scrollY > 24);
  }, [location.pathname]);

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
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  // First screen: transparent over hero video; after scroll / open menu: solid white
  const overHero = !solid;
  const textClass = overHero ? "text-white" : "text-[#111213]";
  const hoverBg = overHero ? "hover:bg-white/10" : "hover:bg-black/[0.04]";
  const openBg = overHero ? "bg-white/15" : "bg-black/[0.06]";

  return (
    <header ref={rootRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-screen bg-black/35 transition-opacity duration-300 ${
          openId ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <div
        className={`pointer-events-auto relative w-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          solid
            ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center gap-8 px-[clamp(20px,6vw,120px)]">
          <Link
            to="/"
            className="block h-[28px] w-[120px] shrink-0"
            onClick={() => setOpenId(null)}
          >
            <img
              src={asset("images/assets/jxfx8.png")}
              alt="streamap"
              className={`h-full w-full object-contain object-left transition-[filter] duration-300 ${
                overHero ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          <nav className={`hidden min-w-0 flex-1 items-center gap-1 lg:flex ${textClass}`} aria-label="Primary">
            <Link
              to="/"
              onClick={() => setOpenId(null)}
              className={`inline-flex h-11 items-center rounded px-4 text-[15px] font-medium tracking-[-0.3px] transition-colors ${hoverBg}`}
            >
              Home
            </Link>

            {menus.map((item) => {
              const isOpen = openId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className={`inline-flex h-11 items-center gap-1 rounded px-4 text-[15px] font-medium tracking-[-0.3px] transition-colors ${
                    isOpen ? openBg : hoverBg
                  }`}
                >
                  {item.label}
                  <Chevron open={isOpen} />
                </button>
              );
            })}

            <a
              href="#about"
              onClick={() => setOpenId(null)}
              className={`inline-flex h-11 items-center rounded px-4 text-[15px] font-medium tracking-[-0.3px] transition-colors ${hoverBg}`}
            >
              About
            </a>
          </nav>

          <div className={`ml-auto flex items-center gap-2 ${textClass}`}>
            <button
              type="button"
              aria-label="Language"
              className={`inline-flex h-11 items-center gap-1.5 rounded px-3 text-[14px] transition-colors ${hoverBg}`}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M1.5 8h13M8 1.5c2 2.2 3 4.3 3 6.5s-1 4.3-3 6.5c-2-2.2-3-4.3-3-6.5s1-4.3 3-6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              <Chevron color="currentColor" />
            </button>

            <a
              href="#contact"
              onClick={() => setOpenId(null)}
              className={`inline-flex h-10 items-center rounded px-4 text-[14px] font-medium transition-colors ${
                overHero
                  ? "bg-white text-[#111213] hover:bg-white/90"
                  : "bg-[#111213] text-white hover:bg-black"
              }`}
            >
              Contact Us
            </a>
          </div>
        </div>

        <div
          id={panelId}
          role="dialog"
          aria-label={active?.label ?? "Menu"}
          hidden={!active}
          className={`mega-menu mx-auto w-full max-w-[1440px] overflow-hidden border-t border-[#e8eaed] bg-white px-[clamp(20px,6vw,120px)] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-200 ${
            active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {active && (
            <div
              className={`grid gap-0 py-2 ${
                active.columns.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
              }`}
            >
              {active.columns.map((col) => (
                <div key={col.title} className="border-b border-[#e8eaed] py-7 lg:border-b-0 lg:border-r lg:pr-10 lg:last:border-r-0 lg:last:pr-0 lg:[&:not(:first-child)]:pl-10">
                  <p className="mb-4 text-[12px] font-bold uppercase tracking-[1.2px] text-[#156B54]">
                    {col.title}
                  </p>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {link.to ? (
                          <Link
                            to={link.to}
                            onClick={() => setOpenId(null)}
                            className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#111213] transition-colors hover:bg-[#f4f6f5] hover:text-[#156B54]"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href ?? "#"}
                            onClick={() => setOpenId(null)}
                            className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#111213] transition-colors hover:bg-[#f4f6f5] hover:text-[#156B54]"
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
