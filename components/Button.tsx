import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "tertiary";
type Env = "ink" | "bone";

type CommonProps = {
  variant?: Variant;
  env?: Env;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Primary/secondary/tertiary button, styled per the ink or bone environment (Design System §06). */
export default function Button({
  variant = "primary",
  env = "ink",
  className,
  href,
  children,
  ...rest
}: ButtonAsButton | ButtonAsLink) {
  const classes = [styles.btn, styles[env], styles[variant], className].filter(Boolean).join(" ");

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
