import CoreMark from "./CoreMark";

/**
 * The large ambient/dimensional Core graphic used behind hero and final-CTA
 * sections: a blurred ghost copy, a chrome (or chrome-warm) front copy with
 * a gentle drift, and a radial vignette so foreground text stays legible.
 */
export default function CoreBackdrop({
  variant = "chrome",
  size = "min(112vmin, 940px)",
  left = "50%",
  top = "52%",
  vignette = "radial-gradient(74% 62% at 50% 52%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.52) 56%, #0A0A0A 100%)",
}: {
  variant?: "chrome" | "chrome-warm";
  size?: string;
  left?: string;
  top?: string;
  vignette?: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left,
          top,
          width: size,
          height: size,
          transform: "translate3d(-50%,-50%,0)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <CoreMark
          fill="#32373D"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", filter: "blur(2px)", opacity: 0.4, transform: "translateY(3%) scale(1.06)" }}
        />
        <CoreMark
          fill={variant}
          animation={variant === "chrome-warm" ? "drift" : "none"}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: vignette, pointerEvents: "none" }} />
    </>
  );
}
