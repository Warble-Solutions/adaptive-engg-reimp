"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, NAV } from "@/lib/content";
import Icon from "./Icon";
import s from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);


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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href.replace(/\/$/, "")));
  return (
    <header className={`${s.header} ${scrolled || open ? s.scrolled : ""}`} id="site-header">
      <div className={`container ${s.inner}`}>
        <Link href="/" className={s.logo} aria-label={`${COMPANY.name} – Home`} id="header-logo">
          <img src="/brand/logo.png" alt={COMPANY.name} width={232} height={70} />
        </Link>

        <nav className={s.nav} aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`${s.link} ${isActive(n.href) ? s.active : ""}`}
              id={`nav-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className={s.actions}>
          <a href={COMPANY.phoneHref} className={s.phone} id="header-phone">
            <Icon name="phone" />
            <span>{COMPANY.phone}</span>
          </a>
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
          {NAV.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className={`${s.mLink} ${isActive(n.href) ? s.active : ""}`}
              style={{ transitionDelay: open ? `${0.04 * i + 0.05}s` : "0s" }}
            >
              {n.label}
              <Icon name="chevronRight" />
            </Link>
          ))}
          <div className={s.mContact}>
            <a href={COMPANY.phoneHref}>
              <Icon name="phone" /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`}>
              <Icon name="mail" /> {COMPANY.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
