import Reveal from "../Reveal";
import CoreMark from "../CoreMark";
import { disciplines, home } from "@/lib/content";
import styles from "./CreateBuildGrowSequence.module.css";

/**
 * Create / Build / Grow, presented as three plain cards that fade up into
 * place as the section scrolls into view (the site's normal axis-reveal,
 * via `Reveal`) plus a closing line underneath. Replaces an earlier pinned,
 * scroll-scrubbing cinematic version: that one scroll-jacked the page,
 * didn't fit small screens (a full-bleed background mark had nowhere to
 * shrink to), and its panel crossfade could land mid-scroll showing two
 * overlapping headlines. This version is the same on every screen size and
 * needs no scroll-linked JS at all.
 */
export default function CreateBuildGrowSequence() {
  return (
    <section id="sequence" className={styles.section}>
      <Reveal as="div" className={styles.grid}>
        {disciplines.map((d, i) => (
          <div key={d.key} className={styles.card}>
            <span className={styles.cardEyebrow}>
              {String(i + 1).padStart(2, "0")} — {d.motif}
            </span>
            <h2 className={styles.cardHeading}>{d.label}</h2>
            <p className={styles.cardBody}>{d.tagline}</p>
            <div className={styles.tags}>
              {d.homeItems.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className={styles.closing}>
        <span className={styles.closingEyebrow}>{home.sequenceEnd.eyebrow}</span>
        <h2 className={styles.closingHeadline}>
          {home.sequenceEnd.headline.map((line) => (
            <span key={line} style={{ display: "block" }}>
              {line}
            </span>
          ))}
        </h2>
        <p className={styles.closingBody}>{home.sequenceEnd.body}</p>
        <CoreMark fill="#F2F0EA" animation="orbit" duration="72s" style={{ width: "clamp(40px,5vw,64px)" }} />
      </Reveal>
    </section>
  );
}
