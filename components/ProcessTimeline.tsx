"use client";

import { useRef } from "react";
import CoreMark from "./CoreMark";
import { ensureGsap, ScrollTrigger, useGSAP, useReducedMotion } from "@/lib/motion";
import styles from "./ProcessTimeline.module.css";

export type ProcessStep = { idx: string; title: string; desc?: string };

/**
 * The scroll-linked reading-progress bar under "How we work" (both the Home
 * and Services prototypes: `data-process-bar`/`data-proc-bar`): a hairline
 * track fills with vermilion as the section scrolls through view, and each
 * step lights up (dim gray -> bone, hairline -> vermilion) once the bar
 * passes it. Home additionally carries a small Core dot riding the bar's
 * leading edge (`data-process-core`) — pass `showCore` for that variant.
 * Reduced motion renders every step already "read" — same DOM either way.
 */
export default function ProcessTimeline({
  steps,
  showCore = false,
  compact = false,
}: {
  steps: ProcessStep[];
  showCore?: boolean;
  compact?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<SVGSVGElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!wrapRef.current) return;

      if (reduced) {
        if (barRef.current) barRef.current.style.width = "100%";
        if (coreRef.current) coreRef.current.style.left = "100%";
        stepRefs.current.forEach((el) => el?.classList.add(styles.active));
        return;
      }

      ensureGsap();
      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: true,
        onUpdate: (self) => {
          const pct = self.progress * 100;
          if (barRef.current) barRef.current.style.width = `${pct}%`;
          if (coreRef.current) coreRef.current.style.left = `${pct}%`;
          const activeCount = Math.round((self.progress * steps.length + Number.EPSILON) * 1000) / 1000;
          stepRefs.current.forEach((el, i) => {
            if (!el) return;
            el.classList.toggle(styles.active, i < activeCount);
          });
        },
      });
      return () => trigger.kill();
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${showCore ? styles.withCore : ""} ${compact ? styles.compact : ""}`}>
      <div className={styles.track} />
      <div ref={barRef} className={styles.bar} />
      {showCore && <CoreMark ref={coreRef} fill="#FF3B22" className={styles.coreDot} />}
      <div className={styles.grid}>
        {steps.map((s, i) => (
          <div
            key={s.idx}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={styles.step}
          >
            <span className={styles.idx}>{s.idx}</span>
            <span className={styles.title}>{s.title}</span>
            {!compact && s.desc && <span className={styles.desc}>{s.desc}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
