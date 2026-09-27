import Link from "next/link";
import CoreMark from "./CoreMark";
import { footerContent } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <CoreMark fill="#F2F0EA" animation="orbit" style={{ width: 32, height: 32 }} />
          <span className={styles.wordmark}>
            Creative
            <br />
            Core
          </span>
          <span className={styles.disciplines}>Create / Build / Grow</span>
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>Navigate</span>
          {footerContent.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>Contact</span>
          {footerContent.contact.map((line) => (
            <span key={line} className={styles.placeholder}>
              {line}
            </span>
          ))}
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>Channels</span>
          {footerContent.channels.map((line) => (
            <span key={line} className={styles.placeholder}>
              {line}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {year} Creative Core. All rights reserved.</span>
      </div>
    </footer>
  );
}
