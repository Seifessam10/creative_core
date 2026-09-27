import { forwardRef } from "react";

export type CoreFill = "chrome" | "chrome-warm" | string;
export type CoreAnimation = "orbit" | "counter" | "drift" | "breathe" | "none";

const ANIMATION_STYLE: Record<CoreAnimation, React.CSSProperties> = {
  orbit: { animation: "cc-orbit 64s linear infinite" },
  counter: { animation: "cc-counter 64s linear infinite" },
  drift: { animation: "cc-drift 12s ease-in-out infinite" },
  breathe: { animation: "cc-breathe 3.2s cubic-bezier(.4,0,.2,1) infinite" },
  none: {},
};

/** The Core mark, referencing the shared <symbol id="core"> from <CoreDefs/>. Forwards its ref to the <svg> for imperative GSAP writes. */
const CoreMark = forwardRef<
  SVGSVGElement,
  {
    fill?: CoreFill;
    animation?: CoreAnimation;
    /** Override the animation's default duration, e.g. "24s". */
    duration?: string;
    /** Animation delay, e.g. "0.16s" — used to stagger repeated marks. */
    delay?: string;
    className?: string;
    style?: React.CSSProperties;
  }
>(function CoreMark({ fill = "chrome", animation = "none", duration, delay, className, style }, ref) {
  const resolvedFill = fill === "chrome" || fill === "chrome-warm" ? `url(#${fill})` : fill;
  const animStyle = { ...ANIMATION_STYLE[animation] };
  if (duration && animStyle.animation) {
    animStyle.animation = (animStyle.animation as string).replace(/^(\S+)\s+\S+/, `$1 ${duration}`);
  }
  if (delay) {
    animStyle.animationDelay = delay;
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      style={{ display: "block", ...animStyle, ...style }}
    >
      <use href="#core" width="100" height="100" fill={resolvedFill} />
    </svg>
  );
});

export default CoreMark;
