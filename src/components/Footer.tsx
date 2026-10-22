import Link from "next/link";
import { COMPANY, NAV } from "@/lib/content";
import { SOLUTIONS_MENU } from "@/lib/solutions";
import Icon from "./Icon";
import s from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer} id="site-footer">
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <img src="/brand/logo.png" alt={COMPANY.name} width={253} height={80} className={s.logo} />
          <p>
            India&apos;s Market Leader in Renewable Energy Technology – SCADA, PPC, EMS-BESS, PM-KUSUM solutions and
            LT/MV panels, engineered and manufactured in-house.
          </p>
          <div className={s.socials}>
            <a href={COMPANY.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" id="footer-linkedin">
              <Icon name="linkedin" />
            </a>
            <a href={COMPANY.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" id="footer-youtube">
              <Icon name="youtube" />
            </a>
            <a href={COMPANY.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" id="footer-facebook">
              <Icon name="facebook" />
            </a>
            <a href={COMPANY.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" id="footer-instagram">
              <Icon name="instagram" />
            </a>
            <a href={COMPANY.socials.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)" id="footer-x">
              <Icon name="x" />
            </a>
          </div>
        </div>

        <div>
          <h3 className={s.h}>Company</h3>
          <ul className={s.list}>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={s.h}>Solutions</h3>
          <ul className={s.list}>
            {SOLUTIONS_MENU.map((sol) => (
              <li key={sol.href}>
                <Link href={sol.href}>{sol.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={s.h}>Get in touch</h3>
          <ul className={`${s.list} ${s.contact}`}>
            <li>
              <Icon name="pin" />
              <span>
                {COMPANY.address.map((l) => (
                  <span key={l} className={s.line}>
                    {l}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <Icon name="phone" />
              <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            </li>
            <li>
              <Icon name="mail" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.bottom}>
        <div className={`container ${s.bottomInner}`}>
          <span>
            © {year} {COMPANY.name} All rights reserved.
          </span>
          <a href="https://honestsol.com/" target="_blank" rel="noopener" className={s.powered} id="footer-powered-by">
            <span>Powered by</span>
            <img src="/brand/hone-st.webp" alt="" width={28} height={28} />
            <strong>Hone ST Solutions</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
