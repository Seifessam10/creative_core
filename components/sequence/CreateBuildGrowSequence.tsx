"use client";

import { useRef } from "react";
import { disciplines, home } from "@/lib/content";
import CoreMark from "../CoreMark";
import { ensureGsap, ScrollTrigger, useGSAP, useReducedMotion } from "@/lib/motion";
import styles from "./CreateBuildGrowSequence.module.css";

const LAYER_BY_PANEL: Array<"halftone" | "grid" | "swarm" | null> = ["halftone", "grid", "swarm", null];

/**
 * The primary CREATE→BUILD→GROW cinematic scroll sequence (PRD §7): a
 * pinned stage that scrubs through four panels — one per discipline plus a
 * "Recombined" close — as the visitor scrolls. Under reduced motion it
 * renders the exact same panels as a plain stacked, always-visible list
 * instead (PRD's "performance fallback" requirement) — via CSS only, not by
 * returning a different element tree, since swapping tree shape out from
 * under GSAP's pin (which restructures the DOM with its own spacer element)
 * mid-session can crash React's reconciler on unmount. For the same reason,
 * the ScrollTrigger/pin setup itself uses `useGSAP` (not a bare
 * `useEffect`): its cleanup reverts the pin's DOM surgery (it inserts a
 * pin-spacer wrapper and moves this section into it) synchronously in a
 * layout-effect phase, before React's own unmount tries to remove this
 * section from its original parent — otherwise navigating away mid-scroll
 * throws "Failed to execute 'removeChild' ... not a child of this node".
 */
export default function CreateBuildGrowSequence() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const coreSignalRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  const panels = [
    ...disciplines.map((d) => ({ eyebrow: `${d.label} — ${d.motif}`, heading: d.label, body: d.tagline, tags: d.homeItems, center: false })),
    { eyebrow: "Recombined", heading: home.sequenceEnd.headline.join(" "), body: home.sequenceEnd.body, tags: [], center: true },
  ];

  useGSAP(() => {
    if (reduced || !sectionRef.current) return;
    ensureGsap();

    const panelEls = panelRefs.current;
    if (panelEls[0]) panelEls[0].style.opacity = "1";

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const t = self.progress * 3; // 0..3 across 4 panels
        const idx = Math.min(3, Math.floor(t));
        const rawBlend = t - idx;
        // Hold each panel for the middle of its segment and only crossfade
        // in a short window at the edges — a snap along an axis rather than
        // a long double-exposed dissolve (Design System: "arrive, settle
        // once, stop").
        const blend = Math.min(1, Math.max(0, (rawBlend - 0.38) / 0.24));
        const travel = 22; // px of axis travel during the snap

        panelEls.forEach((el, i) => {
          if (!el) return;
          let o = 0;
          let y = 0;
          if (i === idx) {
            o = 1 - blend;
            y = -blend * travel;
          } else if (i === idx + 1) {
            o = blend;
            y = (1 - blend) * travel;
          } else {
            y = travel;
          }
          el.style.opacity = String(o);
          el.style.transform = `translate3d(0, ${y}px, 0)`;
        });

        (Object.keys(layerRefs.current) as Array<string>).forEach((key) => {
          const el = layerRefs.current[key];
          if (!el) return;
          let o = 0;
          if (LAYER_BY_PANEL[idx] === key) o = 1 - blend;
          if (LAYER_BY_PANEL[idx + 1] === key) o = Math.max(o, blend);
          el.style.opacity = String(o);
        });

        if (coreSignalRef.current) {
          const signal = Math.min(1, Math.max(0, t - 2));
          coreSignalRef.current.style.opacity = String(signal);
        }

        // The hold/snap remap above can make the *next* panel visually
        // dominant before `t` crosses its integer boundary — key the HUD
        // label/readout off whichever panel is actually most visible.
        const displayIdx = Math.min(panels.length - 1, blend >= 0.5 ? idx + 1 : idx);

        if (barRef.current) barRef.current.style.width = `${self.progress * 100}%`;
        if (labelRef.current) labelRef.current.textContent = panels[displayIdx].heading;
        if (readoutRef.current) readoutRef.current.textContent = String(displayIdx).padStart(3, "0");
      },
    });

    return () => trigger.kill();
    // panels is derived from static content each render; safe to omit from deps.
  }, { scope: sectionRef, dependencies: [reduced] });

  return (
    <section id="sequence" ref={sectionRef} className={styles.section}>
      <div className={`${styles.stage} ${reduced ? styles.stageStatic : ""}`}>
        {!reduced && (
          <div className={styles.core}>
            <CoreMark fill="chrome" />
            <CoreMark ref={coreSignalRef} fill="#FF3B22" className={styles.coreSignal} />
          </div>
        )}

        <div ref={(el) => { layerRefs.current.grid = el; }} className={`${styles.layer} ${styles.grid} ${reduced ? styles.layerHidden : ""}`} />
        <div ref={(el) => { layerRefs.current.halftone = el; }} className={`${styles.layer} ${styles.halftone} ${reduced ? styles.layerHidden : ""}`} />
        <div ref={(el) => { layerRefs.current.swarm = el; }} className={`${styles.layer} ${styles.swarm} ${reduced ? styles.layerHidden : ""}`}>
          {["#2A2A2A", "#3E3E3E", "#6B6B6B", "#8E8E8E", "#B5B3AD"].map((c) => (
            <CoreMark key={c} fill={c} />
          ))}
        </div>

        {panels.map((p, i) => (
          <div
            key={p.heading}
            ref={(el) => { panelRefs.current[i] = el; }}
            className={`${styles.panel} ${p.center ? styles.center : ""} ${reduced ? styles.panelStatic : ""}`}
          >
            <span className={styles.hudLabel} style={{ color: "var(--vermilion)" }}>
              {p.eyebrow}
            </span>
            <h2 className={styles.panelHeading}>{p.heading}</h2>
            <p className={styles.panelBody}>{p.body}</p>
            {p.tags.length > 0 && (
              <div className={styles.tags}>
                {p.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className={`${styles.hud} ${reduced ? styles.layerHidden : ""}`}>
          <span ref={labelRef} className={styles.hudLabel}>
            Create
          </span>
          <div className={styles.hudTrack}>
            <div ref={barRef} className={styles.hudBar} />
          </div>
          <span ref={readoutRef} className={styles.hudReadout}>
            000
          </span>
        </div>
      </div>
    </section>
  );
}
