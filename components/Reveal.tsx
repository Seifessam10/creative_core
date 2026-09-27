"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { ensureGsap, gsap, motion, useReducedMotion } from "@/lib/motion";

/**
 * Axis-reveal: animates its DIRECT children in from 24px below with a
 * 60ms stagger (max 8), 720ms ease-core — Design System §08 "Axis Reveal".
 * Uses IntersectionObserver (not ScrollTrigger) to detect entry: unlike a
 * scroll-position-based trigger, it reports "already visible" correctly even
 * when the page lands here via an instant anchor jump (nav links, browser
 * back/forward, `#hash` URLs) rather than a continuous scroll gesture.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  style,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children).slice(0, motion.staggerMax);
    if (items.length === 0) return;

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    ensureGsap();
    gsap.set(items, { opacity: 0, y: 24 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: motion.duration.reveal,
          ease: motion.ease.core,
          stagger: motion.stagger,
        });
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
