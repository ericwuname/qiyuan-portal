"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { t } from "@/lib/translations";

const PUBLIC_PATHS = ["/login"];

// ===== Pillar Navigation Structure =====
interface PillarItem {
  href: string;
  key: keyof typeof t;
  badge?: string;
}

interface Pillar {
  id: string;
  key: keyof typeof t;
  desc: string;
  items: PillarItem[];
}

const pillars: Pillar[] = [
  {
    id: "about", key: "navPillarAbout", desc: "Who we are · Where we come from · Where we go",
    items: [
      { href: "/about", key: "navOrigin" },
      { href: "/founder", key: "navFounder" },
      { href: "/vision", key: "navVision" },
      { href: "/#philosophy", key: "navPhilosophy" },
    ],
  },
  {
    id: "capability", key: "navPillarCapability", desc: "What we build · What we deliver",
    items: [
      { href: "/skills", key: "navSkills" },
      { href: "/projects", key: "navProjects" },
      { href: "/showcase", key: "navShowcase", badge: "NEW" },
      { href: "/stats", key: "navStats" },
    ],
  },
  {
    id: "strategy", key: "navPillarStrategy", desc: "How we execute · Who we partner with",
    items: [
      { href: "/strategy", key: "navStrategy" },
      { href: "/partners", key: "navPartners" },
      { href: "/careers", key: "navCareers" },
    ],
  },
  {
    id: "updates", key: "navPillarUpdates", desc: "What is happening now",
    items: [
      { href: "/updates", key: "navUpdates" },
      { href: "/dashboard", key: "navDashboard" },
    ],
  },
];

function MegaDropdown({ pillar, isOpen, onClose }: { pillar: Pillar; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-xl border border-dark-border bg-dark-bg/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="px-5 py-4 border-b border-white/[0.04]">
          <p className="text-sm font-bold text-white tracking-[2px]">{t[pillar.key]}</p>
          <p className="text-[10px] text-gray-500 tracking-[1px] mt-0.5">{pillar.desc}</p>
        </div>
        <div className="py-2">
          {pillar.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors tracking-[1px]"
            >
              <span>{t[item.key]}</span>
              {item.badge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold tracking-[1px]">{item.badge}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login";
  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("qiyuan_logged_in") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) setUserName(localStorage.getItem("qiyuan_user") || "");
      setAuthChecked(true);
      if (!loggedIn && !isPublic) router.replace("/login");
    }
  }, [pathname, isPublic, router]);

  const handleLogout = () => {
    localStorage.removeItem("qiyuan_logged_in");
    localStorage.removeItem("qiyuan_user");
    setIsLoggedIn(false);
    setUserName("");
    router.replace("/login");
  };

  const closeMenu = () => setMenuOpen(false);
  const closePillar = () => setActivePillar(null);

  const footerLinks: { href: string; key: keyof typeof t }[] = [
    { href: "/projects", key: "navProjects" },
    { href: "/showcase", key: "navShowcase" },
    { href: "/updates", key: "navUpdates" },
    { href: "/skills", key: "navSkills" },
    { href: "/vision", key: "navVision" },
    { href: "/about", key: "navOrigin" },
  ];

  // Auth guard
  if (!authChecked) return null;
  if (!isLoggedIn && !isPublic) return null;

  // Login page — minimal header
  if (isAuthPage) {
    return (
      <>
        <nav className="fixed top-0 z-50 w-full border-b border-dark-border bg-dark-bg">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3">
            <a href="/login" className="flex items-center gap-2 sm:gap-3">
              <img src="/logo-icon.svg" alt={t.brandName} className="h-7 w-7 sm:h-9 sm:w-9" />
              <span className="text-base font-bold tracking-[2px] sm:text-lg sm:tracking-[4px] text-brand-gold">{t.brandName}</span>
            </a>
          </div>
        </nav>
        {children}
      </>
    );
  }

  return (
    <>
      {/* ===== TOP NAV: 4 Pillars + Logo + Login/Logout ===== */}
      <nav ref={navRef} className="fixed top-0 z-50 w-full border-b border-dark-border bg-dark-bg/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img src="/logo-icon.svg" alt={t.brandName} className="h-7 w-7 sm:h-9 sm:w-9" />
            <span className="text-base font-bold tracking-[2px] sm:text-lg sm:tracking-[4px] text-brand-gold">{t.brandName}</span>
          </a>

          {/* Desktop: 4 Pillars */}
          <div className="hidden md:flex items-center gap-1 relative">
            {pillars.map((p) => (
              <div key={p.id} className="relative">
                <button
                  onClick={() => setActivePillar(activePillar === p.id ? null : p.id)}
                  onMouseEnter={() => setActivePillar(p.id)}
                  className={`px-4 py-2 rounded-lg text-sm tracking-[2px] transition-all ${
                    activePillar === p.id
                      ? "text-brand-gold bg-brand-gold/5"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {t[p.key]}
                  <span className={`inline-block ml-1 text-[10px] transition-transform duration-200 ${activePillar === p.id ? "rotate-180" : ""}`}>▾</span>
                </button>
                <MegaDropdown pillar={p} isOpen={activePillar === p.id} onClose={closePillar} />
              </div>
            ))}
          </div>

          {/* Desktop: Right side */}
          <div className="hidden md:flex items-center gap-3 text-xs tracking-[1px]">
            <span className="text-gray-500 text-xs">{userName}</span>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors text-xs border border-red-400/30 rounded px-3 py-1 hover:bg-red-400/10">退出</button>
            <a href="/#contact" className="rounded-full border border-brand-gold/30 px-4 py-1.5 text-brand-gold transition-all hover:bg-brand-gold/10 text-sm tracking-[2px]">{t.navContact}</a>
          </div>

          {/* Mobile hamburger */}
          <button className="flex flex-col gap-1 p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.mobileMenu}>
            <span className={`block h-0.5 w-5 bg-gray-400 transition-all ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-400 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-400 transition-all ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`} onClick={closeMenu} />
      <div className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <span className="text-brand-gold text-sm font-bold tracking-[2px]">启元智能</span>
          <button onClick={closeMenu} className="text-gray-400 text-2xl">&times;</button>
        </div>

        {/* Mobile: Grouped by pillar */}
        {pillars.map((p) => (
          <div key={p.id} className="mb-6">
            <p className="text-[10px] tracking-[3px] text-gray-600 uppercase mb-2">{t[p.key]}</p>
            <nav className="flex flex-col gap-1 ml-2">
              {p.items.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu} className="text-base tracking-[2px] py-1.5 text-gray-400 hover:text-brand-gold transition-colors">
                  {t[item.key]}
                </a>
              ))}
            </nav>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-dark-border">
          <a href="/dashboard" onClick={closeMenu} className="text-base tracking-[2px] py-2 text-brand-gold hover:text-brand-gold/80 transition-colors block">{t.navDashboard}</a>
          <button onClick={() => { handleLogout(); closeMenu(); }} className="text-base tracking-[2px] py-2 text-red-400 hover:text-red-300 transition-colors text-left block w-full">退出登录 ({userName})</button>
        </div>

        <div className="mt-8 pt-6 border-t border-dark-border">
          <p className="text-xs tracking-[2px] text-gray-600">qiyuan.beauty</p>
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      {children}

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-dark-border bg-dark-bg">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3" />
            <div className="flex gap-6 flex-wrap justify-center">
              {footerLinks.map((l) => (<a key={l.href} href={l.href} className="text-xs tracking-[2px] text-gray-600 hover:text-brand-gold transition-colors">{t[l.key]}</a>))}
              <a href="https://github.com/ericwuname/qiyuan-portal" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[2px] text-gray-600 hover:text-brand-gold transition-colors">GitHub</a>
              <span className="text-xs tracking-[2px] text-gray-600">qiyuan.beauty</span>
            </div>
            <p className="text-xs tracking-[2px] text-gray-600">
              {t.footerCopyright} · {t.footerUpdated}   |   <a href="/privacy" className="hover:text-brand-gold transition-colors">{t.footerPrivacy}</a>   |   <a href="/terms" className="hover:text-brand-gold transition-colors">{t.footerTerms}</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}