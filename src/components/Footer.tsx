const columns = [
  {
    title: "News & events",
    links: ["Blog", "Events", "News", "Resources"],
  },
  {
    title: "Collaborate with us",
    links: ["Developer network", "Feedback program", "Venture Fund", "Become a partner"],
  },
  {
    title: "Company info",
    links: ["About us", "Contact us", "Investors", "Careers"],
  },
  {
    title: "Our businesses",
    links: ["Cesium", "Seequent"],
  },
  {
    title: "Legal",
    links: ["Legal overview", "Trust center"],
  },
] as const;

/** Frame 1 · IayFk */
export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1920px] bg-[#fbfcfd]">
      <div className="h-px w-full bg-[#e1e3e6]" />

      <div className="container-1440 py-11">
        <div className="flex flex-wrap gap-x-6 gap-y-10">
          <div className="w-[205px] shrink-0 pt-2">
            <img src="/images/assets/jxfx8.png" alt="streamap" className="h-[29px] w-[120px] object-contain object-left" />
            <div className="mt-7 h-px w-[120px] bg-[#e1e3e6]" />
            <ul className="mt-7 flex items-center gap-2.5 text-[#474c53]">
              {["f", "in", "x", "yt", "ig"].map((s) => (
                <li key={s}>
                  <a href={`#${s}`} aria-label={s} className="grid size-6 place-items-center rounded-sm border border-[#c9ced4] text-[10px] uppercase hover:border-[#111213]">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-1 flex-wrap justify-between gap-x-6 gap-y-8">
            {columns.map((col) => (
              <section key={col.title} className="min-w-[120px]">
                <h3 className="mb-2 text-[15px] font-semibold text-[#111213]">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="text-[15px] text-[#474c53] hover:text-[#111213]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#e1e3e6]">
        <div className="container-1440 flex min-h-[60px] flex-wrap items-center justify-between gap-3 py-4 text-[12px] text-[#474c53]">
          <p>© 2026 Bentley Systems, Incorporated</p>
          <p className="flex flex-wrap gap-x-1">
            <a href="#privacy" className="hover:text-[#111213]">
              Privacy Statement
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-[#111213]">
              Terms of Use
            </a>
            <span>|</span>
            <a href="#cookies" className="hover:text-[#111213]">
              Cookies
            </a>
            <span>|</span>
            <a href="#sitemap" className="hover:text-[#111213]">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
