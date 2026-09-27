"use client";

import { useRef } from "react";
import { CORE_PATH } from "@/lib/content";
import { ensureGsap, gsap, ScrollTrigger, useGSAP, useReducedMotion } from "@/lib/motion";

const MASK_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='${encodeURIComponent(
  CORE_PATH,
)}' fill='%23fff'/%3E%3C/svg%3E")`;

/**
 * The environmental transition between an Ink and a Bone section (Design
 * System / PRD §7 "Environmental transitions"): the Core shape grows as a
 * mask over the incoming panel's colour, scroll-scrubbed. Falls back to a
 * plain hairline divider under reduced motion — same elements, just made
 * inert via CSS/inline styles rather than a different returned tree (see
 * the equivalent note in CreateBuildGrowSequence: swapping tree shape while
 * GSAP/ScrollTrigger has touched these nodes is what causes React's
 * unmount to throw "removeChild ... not a child of this node").
 */
export default function InkBoneWipe({
  from = "var(--ink-900)",
  to = "var(--bone-100)",
  label = "Environment — Ink → Bone",
}: {
  from?: string;
  to?: string;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !fieldRef.current) return;
      ensureGsap();
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const size = 20 + self.progress * 680; // 20% -> 700%
          gsap.set(fieldRef.current, { WebkitMaskSize: `${size}% ${size}%`, maskSize: `${size}% ${size}%` });
        },
      });
      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      style={{
        position: "relative",
        height: reduced ? "1px" : "78vh",
        overflow: "hidden",
        background: from,
      }}
    >
      <div
        ref={fieldRef}
        style={{
          position: "absolute",
          inset: 0,
          background: to,
          opacity: reduced ? 0 : 1,
          WebkitMaskImage: MASK_SVG,
          maskImage: MASK_SVG,
          WebkitMaskSize: "20% 20%",
          maskSize: "20% 20%",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "clamp(20px,3.4vw,48px)",
          bottom: "clamp(20px,4vh,40px)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--gray-400)",
          opacity: reduced ? 0 : 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}
