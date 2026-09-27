"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CoreMark from "./CoreMark";
import MagneticButton from "./MagneticButton";
import styles from "./Nav.module.css";

/** Fixed nav, transparent over the hero and solid once scrolled — readable over both ink and bone sections (PRD §3). */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <Link href="/" className={styles.brand}>
        <CoreMark fill="#F2F0EA" animation="orbit" style={{ width: 22, height: 22 }} />
        <span>Creative Core</span>
      </Link>
      <div className={styles.links}>
        <Link href="/services" className={`${styles.link} ${styles.servicesLink}`}>
          Services
        </Link>
        <MagneticButton>
          <Link href="/start-a-project" className={styles.cta}>
            Start a Project ↗
          </Link>
        </MagneticButton>
      </div>
    </nav>
  );
}
