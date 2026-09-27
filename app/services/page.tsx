import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import MagneticButton from "@/components/MagneticButton";
import CoreBackdrop from "@/components/CoreBackdrop";
import CoreMark from "@/components/CoreMark";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import InkBoneWipe from "@/components/InkBoneWipe";
import SceneDivider from "@/components/SceneDivider";
import { disciplines, processSteps, services } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Create, Build and Grow — Creative Core's three connected disciplines, and where each one starts.",
};

export default function ServicesPage() {
  return (
    <>
      <section className={styles.hero}>
        <CoreBackdrop variant="chrome" size="min(96vmin, 820px)" left="84%" top="50%" vignette="radial-gradient(84% 70% at 76% 50%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.68) 52%, #0A0A0A 100%)" />
        <div className={styles.heroInner}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gray-400)" }}>
            {services.hero.eyebrow}
          </span>
          <h1 className={styles.heroHeadline}>
            <span>{services.hero.headline[0]}</span>
            <span className={styles.chromeText}>{services.hero.headline[1]}</span>
          </h1>
          <p className={styles.heroBody}>{services.hero.body}</p>
          <div className={styles.jumpNav}>
            {disciplines.map((d, i) => (
              <Link key={d.key} href={`#${d.key}`} className={styles.jumpTab}>
                <span className={styles.jumpNum}>{String(i + 1).padStart(3, "0")}</span>
                <span className={styles.jumpLabel}>{d.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {disciplines.map((d, i) => (
        <div key={d.key}>
          <section id={d.key} className={styles.discSection}>
            <Reveal className={styles.discInner}>
              <div className={styles.discHead}>
                <div className={styles.discTitleCol}>
                  <SectionEyebrow index={String(i + 1).padStart(2, "0")}>{d.label}</SectionEyebrow>
                  <h2 className={styles.discHeadline}>{d.services.heading}</h2>
                </div>
                <div className={styles.discLedeCol}>
                  <p className={styles.discLede}>{d.services.lede}</p>
                  <div style={{ position: "relative", width: "clamp(96px,11vw,150px)", aspectRatio: 1 }}>
                    <CoreMark fill="chrome" animation="orbit" duration="24s" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>
              <div className={styles.srvList}>
                {d.services.items.map((item, j) => (
                  <Link key={item.title} href={item.href} className={styles.srvRow}>
                    <span className={styles.srvNum}>{String(j + 1).padStart(2, "0")}</span>
                    <h3 className={styles.srvTitle}>{item.title}</h3>
                    <p className={styles.srvDesc}>{item.desc}</p>
                    <span className={styles.srvArrow}>↗</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>
          {i === 0 && <SceneDivider caption="Creativity becoming something real." label="Transition — expressive → structural" />}
          {i === 1 && <SceneDivider caption="Something built becomes something that can grow." label="Transition — structural → accumulative" />}
        </div>
      ))}

      <InkBoneWipe />

      <section className={`${styles.envBone} ${styles.modelStage}`}>
        <Reveal className={styles.modelHead}>
          <h2 className={styles.modelHeadline}>
            {services.connectedModel.headline.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </h2>
          <p className={styles.modelBody}>{services.connectedModel.body}</p>
        </Reveal>
        <div className={styles.modelCores}>
          <div className={styles.modelCoreRow}>
            <CoreMark fill="#0A0A0A" style={{ position: "absolute", width: "clamp(90px,13vw,190px)" }} />
            <CoreMark fill="#D42B15" style={{ position: "absolute", width: "clamp(90px,13vw,190px)", opacity: 0.55 }} />
          </div>
          <div className={styles.modelFoot}>
            <span style={{ color: "var(--vermilion-deep)" }}>Create — a visual state</span>
            <span style={{ color: "var(--gray-600)" }}>{services.connectedModel.label}</span>
          </div>
        </div>
      </section>

      <section className={`${styles.envBone} ${styles.section}`} style={{ paddingTop: 0 }}>
        <div className={styles.inner}>
          <div className={styles.engHead}>
            <h2 className={styles.engHeadline}>
              {services.engagements.headline.map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className={styles.engBody}>{services.engagements.body}</p>
          </div>
          <div className={styles.engList}>
            {services.engagements.items.map((item) => (
              <Link key={item.title} href={item.href} className={styles.engRow}>
                <h3 className={styles.engTitle}>{item.title}</h3>
                <span className={styles.engTag}>{item.tag}</span>
                <span className={styles.engFlow}>{item.flow}</span>
                <span className={styles.engArrow}>↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InkBoneWipe from="var(--bone-100)" to="var(--ink-900)" label="Environment — Bone → Ink" />

      <section className={`${styles.section}`} style={{ background: "var(--ink-900)", color: "var(--bone-100)" }}>
        <Reveal className={styles.inner}>
          <div className={styles.processHead}>
            <div className={styles.processIntro}>
              <SectionEyebrow>{services.process.eyebrow}</SectionEyebrow>
              <p className={styles.processIntroBody}>{services.process.body}</p>
            </div>
            <Link href="/#process" className={styles.processSeeHow}>
              See how we work ↓
            </Link>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <div key={step.idx} className={styles.processStep}>
                <span className={styles.processIdx}>{step.idx}</span>
                <span className={styles.processTitle}>{step.title}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className={styles.finalCta}>
        <CoreBackdrop variant="chrome-warm" size="min(120vmin, 1000px)" left="52%" top="42%" vignette="linear-gradient(100deg, #0A0A0A 24%, rgba(10,10,10,0.5) 58%, rgba(10,10,10,0.82) 100%)" />
        <div className={styles.finalInner}>
          <div className={styles.finalLeft}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--gray-400)" }}>
              {services.finalCta.eyebrow}
            </span>
            <h2 className={styles.finalHeadline}>
              <span className={styles.finalGood}>{services.finalCta.headline[0]}</span>
              <span>{services.finalCta.headline[1]}</span>
              <span className={styles.chromeText}>{services.finalCta.headline[2]}</span>
            </h2>
          </div>
          <div className={styles.finalRight}>
            <p className={styles.finalBody}>{services.finalCta.body}</p>
            <MagneticButton>
              <Button href="/start-a-project">{services.finalCta.cta}</Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
