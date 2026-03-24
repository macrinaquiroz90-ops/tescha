"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useEffectEvent, useState } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  items: Array<{
    href: string;
    label: string;
  }>;
};

export function Header({ items }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const syncScroll = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 18);
  });

  useEffect(() => {
    const handleScroll = () => {
      syncScroll();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <Link className={styles.brandLockup} href="/" onClick={() => setIsMenuOpen(false)}>
        <div className={styles.brandMark}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/Logo_Ingenieria_Sistemas.png"
            alt="Logo ISC TESCHA"
            className={styles.brandLogo}
          />
        </div>
        <div>
          <p className={styles.brandName}>Ingeniería en Sistemas</p>
          <p className={styles.brandMeta}>TESCHA · Arquitectura digital</p>
        </div>
      </Link>

      <button
        type="button"
        className={styles.menuToggle}
        aria-expanded={isMenuOpen}
        aria-label="Abrir menú"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              className={styles.navItem}
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
              data-active={isActive}
            >
              {isActive && (
                <motion.span
                  className={styles.navIndicator}
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
