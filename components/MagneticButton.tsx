"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { ensureGsap, gsap, motion, useReducedMotion } from "@/lib/motion";

/**
 * Wraps a button/link so it tracks the cursor up to 7px and settles with a
 * 0.12 lerp (Design System §06 "Buttons"). No-ops under reduced motion.
 */
export default function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    ensureGsap();
    const el = ref.current;
    const quickX = gsap.quickTo(el, "x", { duration: motion.duration.base, ease: motion.ease.core });
    const quickY = gsap.quickTo(el, "y", { duration: motion.duration.base, ease: motion.ease.core });
    const maxOffset = 7;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX(gsap.utils.clamp(-maxOffset, maxOffset, relX * motion.lerpMagnet));
      quickY(gsap.utils.clamp(-maxOffset, maxOffset, relY * motion.lerpMagnet));
    };
    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </div>
  );
}
