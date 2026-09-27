import Button from "@/components/Button";
import MagneticButton from "@/components/MagneticButton";
import CoreBackdrop from "@/components/CoreBackdrop";
import CoreMark from "@/components/CoreMark";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import InkBoneWipe from "@/components/InkBoneWipe";
import ProcessTimeline from "@/components/ProcessTimeline";
import CreateBuildGrowSequence from "@/components/sequence/CreateBuildGrowSequence";
import { disciplines, home, processSteps } from "@/lib/content";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section id="hero" className={styles.hero}>
        <CoreBackdrop variant="chrome" />
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>{home.hero.eyebrow}</span>
          <h1 className={styles.heroHeadline}>
            <span>{home.hero.headline[0]}</span>
            <span className={styles.chromeText}>{home.hero.headline[1]}</span>
          </h1>
          <div className={styles.heroFoot}>
            <p className={styles.heroBody}>{home.hero.body}</p>
            <div className={styles.ctaRow}>
              <MagneticButton>
                <Button href="/start-a-project">Start a Project ↗</Button>
              </MagneticButton>
              <Button href="#sequence" variant="secondary">
                Explore the Core ↓
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CreateBuildGrowSequence />

      <InkBoneWipe />

      <section id="philosophy" className={`${styles.section} ${styles.envBone}`}>
        <Reveal className={styles.inner}>
          <SectionEyebrow env="bone">{home.philosophy.eyebrow}</SectionEyebrow>
          <h2 className={styles.headline}>
            {home.philosophy.headline.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </h2>
          <div className={styles.philosophyGrid}>
            <p className={styles.philosophyBody}>{home.philosophy.body}</p>
            <div className={styles.philosophyMark}>
              <CoreMark fill="#0A0A0A" animation="orbit" duration="96s" style={{ width: "clamp(80px,12vw,170px)" }} />
            </div>
          </div>
        </Reveal>
      </section>

      <section id="capabilities" className={`${styles.section} ${styles.envBone}`} style={{ paddingTop: 0 }}>
        <div className={styles.inner} style={{ gap: "clamp(32px,4vw,64px)" }}>
          <div className={styles.capHead}>
            <h2 className={styles.capHeadline}>
              Three disciplines.
              <br />
              One way forward.
            </h2>
            <span className={styles.capIndex}>{home.capabilitiesIntro.eyebrow}</span>
          </div>
          <div className={styles.capRows}>
            {disciplines.map((d, i) => (
              <a key={d.key} href="#capabilities" className={styles.capRow}>
                <div className={styles.capRowGrid}>
                  <span className={styles.capNum}>{String(i + 1).padStart(3, "0")}</span>
                  <div className={styles.capTitleCol}>
                    <h3 className={styles.capTitle}>{d.label}</h3>
                    <span className={styles.capMotif}>{d.motif}</span>
                  </div>
                  <p className={styles.capSummary}>{d.homeSummary}</p>
                  <ul className={styles.capList}>
                    {d.homeItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className={styles.capMarkCell}>
                    <CoreMark fill="#0A0A0A" style={{ width: "60%" }} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className={`${styles.section} ${styles.envInk} ${styles.borderTop}`}>
        <Reveal className={styles.inner}>
          <div className={styles.rowHead}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <SectionEyebrow>{home.process.eyebrow}</SectionEyebrow>
              <h2 className={styles.headline} style={{ fontSize: "clamp(34px,5.4vw,88px)", lineHeight: 0.88 }}>
                {home.process.headline.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <p className={styles.rowHeadBody}>{home.process.body}</p>
          </div>
          <ProcessTimeline steps={processSteps} showCore />
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.envInk} ${styles.borderTop}`}>
        <Reveal className={styles.whyGrid}>
          <h2 className={styles.whyHeadline}>
            {home.why.headline.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </h2>
          <div className={styles.whyList}>
            {home.why.items.map((item) => (
              <div key={item.idx} className={styles.whyItem}>
                <span className={styles.whyIdx}>{item.idx}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyBody}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className={`${styles.finalCta} ${styles.borderTop}`}>
        <CoreBackdrop variant="chrome-warm" size="min(86vmin, 700px)" vignette="radial-gradient(70% 60% at 50% 50%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.66) 58%, #0A0A0A 100%)" />
        <div className={styles.finalCtaInner}>
          <span className={styles.heroEyebrow}>{home.finalCta.eyebrow}</span>
          <h2 className={styles.finalHeadline}>
            <span>{home.finalCta.headline[0]}</span>
            <span className={styles.chromeText}>{home.finalCta.headline[1]}</span>
          </h2>
          <div className={styles.ctaRow}>
            <MagneticButton>
              <Button href="/start-a-project">{home.finalCta.cta}</Button>
            </MagneticButton>
            <a href="mailto:support@creativecore.pro" className={styles.ctaContact}>
              support@creativecore.pro
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
