"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, NAV, RESOURCES_MENU } from "@/lib/content";
import { SOLUTIONS_MENU } from "@/lib/solutions";
import Icon from "./Icon";
import s from "./Header.module.css";

type MenuItem = { label: string; href: string; children?: { label: string; href: string }[] };

/**
 * Dropdown menus by top-level nav href.
 * `linked: false` → the top label only opens the menu (it is not a page link).
 */
const MENUS: Record<string, { items: MenuItem[]; linked: boolean }> = {
  "/solutions/": { items: SOLUTIONS_MENU, linked: true },
  "/resources/": { items: RESOURCES_MENU, linked: false },
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mOpen, setMOpen] = useState<string | null>(null);

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
  const isExact = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");
  const navId = (label: string) => `nav-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;

  return (
    <header className={`${s.header} ${scrolled || open ? s.scrolled : ""}`} id="site-header">
      <div className={`container ${s.inner}`}>
        <Link href="/" className={s.logo} aria-label={`${COMPANY.name} – Home`} id="header-logo">
          <img src="/brand/logo.png" alt={COMPANY.name} width={222} height={70} />
        </Link>

        <nav className={s.nav} aria-label="Main">
          {NAV.map((n) => {
            const menu = MENUS[n.href];
            if (!menu) {
              return (
                <Link key={n.href} href={n.href} className={`${s.link} ${isActive(n.href) ? s.active : ""}`} id={navId(n.label)}>
                  {n.label}
                </Link>
              );
            }
            const toggleCls = `${s.link} ${s.ddToggle} ${isActive(n.href) ? s.active : ""}`;
            return (
              <div key={n.href} className={s.dd}>
                {menu.linked ? (
                  <Link href={n.href} className={toggleCls} id={navId(n.label)} aria-haspopup="true">
                    {n.label}
                    <Icon name="chevronDown" />
                  </Link>
                ) : (
                  <button type="button" className={`${toggleCls} ${s.ddButton}`} id={navId(n.label)} aria-haspopup="true">
                    {n.label}
                    <Icon name="chevronDown" />
                  </button>
                )}
                <div className={s.ddPanel}>
                  <ul className={`${s.ddMenu} ${menu.items.some((i) => i.children) ? "" : s.ddMenuSimple}`}>
                    {menu.items.map((item) => (
                      <li key={item.href} className={item.children ? s.hasSub : undefined}>
                        <Link
                          href={item.href}
                          className={`${s.ddLink} ${(item.children ? isActive(item.href) : isExact(item.href) || isActive(item.href)) ? s.ddActive : ""}`}
                          id={navId(`${n.label} ${item.label}`)}
                        >
                          {item.label}
                          {item.children && <Icon name="chevronRight" />}
                        </Link>
                        {item.children && (
                          <ul className={s.subMenu}>
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className={`${s.ddLink} ${isExact(c.href) ? s.ddActive : ""}`} id={navId(`${n.label} ${c.label}`)}>
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
            );
          })}
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
          {NAV.map((n, i) => {
            const menu = MENUS[n.href];
            const delay = { transitionDelay: open ? `${0.04 * i + 0.05}s` : "0s" };
            if (!menu) {
              return (
                <Link key={n.href} href={n.href} className={`${s.mLink} ${isActive(n.href) ? s.active : ""}`} style={delay}>
                  {n.label}
                  <Icon name="chevronRight" />
                </Link>
              );
            }
            const expanded = mOpen === n.href;
            const listId = `mobile-${navId(n.label)}`;
            const toggle = () => setMOpen((v) => (v === n.href ? null : n.href));
            return (
              <div key={n.href} className={s.mGroup}>
                <div className={`${s.mLink} ${s.mRow} ${isActive(n.href) ? s.active : ""}`} style={delay}>
                  {menu.linked ? (
                    <Link href={n.href}>{n.label}</Link>
                  ) : (
                    <button type="button" className={s.mRowLabel} onClick={toggle} aria-expanded={expanded} aria-controls={listId}>
                      {n.label}
                    </button>
                  )}
                  <button
                    type="button"
                    className={`${s.mToggle} ${expanded ? s.mToggleOpen : ""}`}
                    onClick={toggle}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    aria-label={`${expanded ? "Hide" : "Show"} ${n.label.toLowerCase()}`}
                    id={`${listId}-toggle`}
                  >
                    <Icon name="chevronDown" />
                  </button>
                </div>
                <ul id={listId} className={`${s.mSub} ${expanded ? s.mSubOpen : ""}`}>
                  {menu.items.map((item) => (
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
            );
          })}
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
