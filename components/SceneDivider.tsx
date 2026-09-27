import CoreMark from "./CoreMark";

/**
 * A short decorative beat between two same-environment sections (Services'
 * Create→Build and Build→Grow moments): a grid backdrop, a centered Core,
 * and a caption. The prototype pins and scrubs a longer (190vh) version of
 * this; here it's a static, shorter divider — same texture and copy, without
 * duplicating a second bespoke scroll-pin rig for what is a transitional
 * beat rather than primary content.
 */
export default function SceneDivider({ caption, label }: { caption: string; label: string }) {
  return (
    <div
      style={{
        position: "relative",
        height: "56vh",
        minHeight: 340,
        overflow: "hidden",
        background: "var(--ink-900)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid var(--ink-700)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div style={{ position: "relative", width: "min(38vmin, 280px)", aspectRatio: 1 }}>
        <CoreMark fill="chrome" style={{ width: "100%", height: "100%" }} animation="orbit" duration="40s" />
      </div>
      <div
        style={{
          position: "absolute",
          left: "clamp(20px,3.4vw,48px)",
          right: "clamp(20px,3.4vw,48px)",
          bottom: "clamp(24px,5vh,48px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(20px,3vw,40px)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            maxWidth: "22ch",
          }}
        >
          {caption}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gray-400)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
