"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { t } from "@/lib/translations";

const PUBLIC_PATHS = ["/login"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login";
  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("qiyuan_logged_in") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        setUserName(localStorage.getItem("qiyuan_user") || "");
      }
      setAuthChecked(true);
      // Redirect to login if not logged in and not on a public page
      if (!loggedIn && !isPublic) {
        router.replace("/login");
      }
    }
  }, [pathname, isPublic, router]);

  const handleLogout = () => {
    localStorage.removeItem("qiyuan_logged_in");
    localStorage.removeItem("qiyuan_user");
    setIsLoggedIn(false);
    setUserName("");
    router.replace("/login");
  };

  const navLinks: { href: string; key: keyof typeof t }[] = [
    { href: "/projects", key: "navProjects" },
    { href: "/showcase", key: "navShowcase" },
    { href: "/stats", key: "navStats" },
    { href: "/partners", key: "navPartners" },
    { href: "/careers", key: "navCareers" },
    { href: "/updates", key: "navUpdates" },
    { href: "/skills", key: "navSkills" },
    { href: "/strategy", key: "navStrategy" },
    { href: "/vision", key: "navVision" },
    { href: "/about", key: "navOrigin" },
    { href: "/founder", key: "navFounder" },
    { href: "/#products", key: "navProducts" },
    { href: "/#philosophy", key: "navPhilosophy" },
    { href: "/#contact", key: "navContact" },
  ];

  const footerLinks: { href: string; key: keyof typeof t }[] = [
    { href: "/projects", key: "navProjects" },
    { href: "/showcase", key: "navShowcase" },
    { href: "/updates", key: "navUpdates" },
    { href: "/skills", key: "navSkills" },
    { href: "/vision", key: "navVision" },
    { href: "/about", key: "navOrigin" },
  ];

  const closeMenu = () => setMenuOpen(false);

  // Don't render anything until auth check completes
  if (!authChecked) {
    return null;
  }

  // Block content for unauthenticated users
  if (!isLoggedIn && !isPublic) {
    return null;
  }

  // ===== MINIMAL HEADER for auth pages =====
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

  // ===== FULL NAV for logged-in pages =====
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-dark-border bg-dark-bg ">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2 sm:gap-3">
            <img src="/logo-icon.svg" alt={t.brandName} className="h-7 w-7 sm:h-9 sm:w-9" />
            <span className="text-base font-bold tracking-[2px] sm:text-lg sm:tracking-[4px] text-brand-gold">{t.brandName}</span>
          </a>
          <div className="hidden items-center gap-3 text-xs tracking-[1px] sm:gap-4 sm:text-sm sm:tracking-[2px] md:flex">
            {navLinks.slice(0, 11).map((l) => (
              <a key={l.href} href={l.href} className="text-gray-400 transition-colors hover:text-brand-gold">{t[l.key]}</a>
            ))}
            <span className="text-gray-500 text-xs">{userName}</span>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors text-xs border border-red-400/30 rounded px-3 py-1 hover:bg-red-400/10">退出</button>
            <a href="/dashboard" className="text-brand-gold hover:text-brand-gold/80 font-medium text-xs">{t.navDashboard}</a>
            <a href="/#contact" className="rounded-full border border-brand-gold/30 px-4 py-1 text-brand-gold transition-all hover:bg-brand-gold/10 sm:px-5 sm:py-1.5">{t.navContact}</a>
          </div>
          <button className="flex flex-col gap-1 p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.mobileMenu}>
            <span className={`block h-0.5 w-5 bg-gray-400 transition-all ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-400 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gray-400 transition-all ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`} onClick={closeMenu} />
      <div className={`mobile-menu-panel ${menuOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <button onClick={closeMenu} className="text-gray-400 text-2xl">&times;</button>
        </div>
        <nav className="flex flex-col gap-4">
          {[{ href: "/dashboard", key: "navDashboard" as const }, ...navLinks].map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu}
              className={`text-base tracking-[2px] py-2 transition-colors ${l.key === "navContact" ? "text-brand-gold" : "text-gray-400 hover:text-brand-gold"}`}>
              {t[l.key]}
            </a>
          ))}
          <button onClick={() => { handleLogout(); closeMenu(); }} className="text-base tracking-[2px] py-2 text-red-400 hover:text-red-300 transition-colors text-left">退出登录 ({userName})</button>
        </nav>
        <div className="mt-8 pt-6 border-t border-dark-border"><p className="text-xs tracking-[2px] text-gray-600">qiyuan.beauty</p></div>
      </div>
      {children}
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