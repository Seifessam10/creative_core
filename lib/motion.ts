"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Register GSAP plugins exactly once, client-side only. */
export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;

  // Variable-font swaps (Anybody/Public Sans/Azeret Mono loading in) reflow
  // the page after ScrollTrigger has already measured trigger positions —
  // without a refresh, sections below a reflow can end up with their
  // "enter" point already behind the scroll position, so Reveal content
  // never appears. Refresh once fonts and the full page have settled.
  if ("fonts" in document) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/** Motion tokens mirrored from styles/tokens.css, for use in GSAP calls (which read raw numbers, not CSS vars). */
export const motion = {
  duration: {
    tap: 0.12,
    fast: 0.24,
    base: 0.42,
    reveal: 0.72,
    cine: 1.2,
  },
  ease: {
    core: "cubic-bezier(.16,1,.3,1)" as const,
    axis: "cubic-bezier(.76,0,.24,1)" as const,
    drift: "cubic-bezier(.4,0,.2,1)" as const,
  },
  stagger: 0.06,
  staggerMax: 8,
  lerpMagnet: 0.12,
};

/**
 * Tracks prefers-reduced-motion plus the design system's own manual
 * data-motion="off" escape hatch, so components can gate cinematic effects
 * on a single boolean instead of re-deriving this everywhere.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setReduced(query.matches || document.documentElement.dataset.motion === "off");

    update();
    query.addEventListener("change", update);

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });

    return () => {
      query.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  return reduced;
}

/** Tracks a max-width breakpoint so components can swap heavy, scroll-jacking desktop effects for lighter mobile ones. */
export function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export { gsap, ScrollTrigger, useGSAP };
