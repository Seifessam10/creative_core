import styles from "./SectionEyebrow.module.css";

/** Mono-uppercase eyebrow label, e.g. "01 / Logo" or "Our position". */
export default function SectionEyebrow({
  index,
  children,
  env = "ink",
  className,
}: {
  index?: string;
  children: React.ReactNode;
  env?: "ink" | "bone";
  className?: string;
}) {
  return (
    <span className={[styles.eyebrow, env === "bone" ? styles.bone : "", className].filter(Boolean).join(" ")}>
      {index ? <span className={styles.accent}>{index}</span> : null}
      <span>{children}</span>
    </span>
  );
}
