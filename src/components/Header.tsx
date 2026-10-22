"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, NAV } from "@/lib/content";
import { SOLUTIONS_MENU } from "@/lib/solutions";
import Icon from "./Icon";
import s from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mSol, setMSol] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes
  const [navPath, setNavPath] = useState(pathname);
  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Drop focus after navigating so the hover dropdown doesn't stay open via :focus-within
  useEffect(() => {
    const el = document.activeElement as HTMLElement | null;
    if (el?.closest(`.${s.dd}`)) el.blur();
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href.replace(/\/$/, "")));
  const navId = (label: string) => `nav-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
  return (
    <header className={`${s.header} ${scrolled || open ? s.scrolled : ""}`} id="site-header">
      <div className={`container ${s.inner}`}>
        <Link href="/" className={s.logo} aria-label={`${COMPANY.name} – Home`} id="header-logo">
          <img src="/brand/logo.png" alt={COMPANY.name} width={222} height={70} />
        </Link>

        <nav className={s.nav} aria-label="Main">
          {NAV.map((n) =>
            n.href === "/solutions/" ? (
              <div key={n.href} className={s.dd}>
                <Link href={n.href} className={`${s.link} ${s.ddToggle} ${isActive(n.href) ? s.active : ""}`} id={navId(n.label)} aria-haspopup="true">
                  {n.label}
                  <Icon name="chevronDown" />
                </Link>
                <div className={s.ddPanel}>
                  <ul className={s.ddMenu}>
                    {SOLUTIONS_MENU.map((item) => (
                      <li key={item.href} className={item.children ? s.hasSub : undefined}>
                        <Link href={item.href} className={`${s.ddLink} ${pathname?.startsWith(item.href.replace(/\/$/, "")) ? s.ddActive : ""}`} id={navId(`sol ${item.label}`)}>
                          {item.label}
                          {item.children && <Icon name="chevronRight" />}
                        </Link>
                        {item.children && (
                          <ul className={s.subMenu}>
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className={`${s.ddLink} ${pathname === c.href || pathname === c.href.replace(/\/$/, "") ? s.ddActive : ""}`} id={navId(`sol ${c.label}`)}>
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href} className={`${s.link} ${isActive(n.href) ? s.active : ""}`} id={navId(n.label)}>
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className={s.actions}>
          <Link href="/contact/" className="btn btn-sm" id="header-cta">
            Let&apos;s Connect
          </Link>
          <button
            className={s.burger}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            id="menu-toggle"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${s.mobile} ${open ? s.mobileOpen : ""}`}>
        <nav className="container" aria-label="Mobile">
          {NAV.map((n, i) =>
            n.href === "/solutions/" ? (
              <div key={n.href} className={s.mGroup}>
                <div className={`${s.mLink} ${s.mRow} ${isActive(n.href) ? s.active : ""}`} style={{ transitionDelay: open ? `${0.04 * i + 0.05}s` : "0s" }}>
                  <Link href={n.href}>{n.label}</Link>
                  <button
                    type="button"
                    className={`${s.mToggle} ${mSol ? s.mToggleOpen : ""}`}
                    onClick={() => setMSol((v) => !v)}
                    aria-expanded={mSol}
                    aria-controls="mobile-solutions"
                    aria-label={mSol ? "Hide solutions" : "Show solutions"}
                    id="mobile-solutions-toggle"
                  >
                    <Icon name="chevronDown" />
                  </button>
                </div>
                <ul id="mobile-solutions" className={`${s.mSub} ${mSol ? s.mSubOpen : ""}`}>
                  {SOLUTIONS_MENU.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={s.mSubLink}>
                        {item.label}
                      </Link>
                      {item.children && (
                        <ul className={s.mSubChildren}>
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className={s.mSubLink}>
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className={`${s.mLink} ${isActive(n.href) ? s.active : ""}`}
                style={{ transitionDelay: open ? `${0.04 * i + 0.05}s` : "0s" }}
              >
                {n.label}
                <Icon name="chevronRight" />
              </Link>
            ),
          )}
          <div className={s.mContact}>
            <a href={`mailto:${COMPANY.email}`}>
              <Icon name="mail" /> {COMPANY.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
