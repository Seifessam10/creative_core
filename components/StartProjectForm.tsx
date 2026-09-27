"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CoreMark from "./CoreMark";
import {
  PROJECT_TYPES,
  TIMELINES,
  primaryDiscipline,
  projectTypeLabels,
  type ContactMethod,
} from "@/lib/inquiry";
import styles from "./StartProjectForm.module.css";

const SECTIONS = [
  { id: "q-type", label: "What you need" },
  { id: "q-desc", label: "The project" },
  { id: "q-planning", label: "Timing" },
  { id: "q-contact", label: "Who you are" },
  { id: "q-review", label: "Review & send" },
];

type FormState = {
  types: string[];
  description: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  website: string;
  contactMethod: ContactMethod;
  phone: string;
  consent: boolean;
  hp: string;
};

const EMPTY_FORM: FormState = {
  types: [],
  description: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  website: "",
  contactMethod: "email",
  phone: "",
  consent: false,
  hp: "",
};

function validateTypes(types: string[]) {
  return types.length > 0 ? "" : "Pick at least one so we know who should read this.";
}
function validateDesc(desc: string) {
  return desc.trim().length >= 40 ? "" : "A little more detail — around 40 characters or more.";
}
function validateName(name: string) {
  return name.trim().length > 0 ? "" : "We need a name to reply to.";
}
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "That email doesn't look complete.";
}
function validatePhone(phone: string, method: ContactMethod) {
  if (method !== "whatsapp") return "";
  return phone.trim().length > 0 ? "" : "Include the country code, digits only after the +.";
}
function validateConsent(consent: boolean) {
  return consent ? "" : "Please confirm you've read the privacy notice.";
}

export default function StartProjectForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [successRef, setSuccessRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
          if (idx !== -1) setActiveSection(idx);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function toggleType(value: string) {
    setForm((f) => {
      const types = f.types.includes(value) ? f.types.filter((t) => t !== value) : [...f.types, value];
      return { ...f, types };
    });
    setErrors((e) => ({ ...e, type: "" }));
  }

  function pickSingle(field: "timeline", value: string) {
    setForm((f) => ({ ...f, [field]: f[field] === value ? "" : value }));
  }

  function pickMethod(method: ContactMethod) {
    setForm((f) => ({ ...f, contactMethod: method }));
    if (method === "email") setErrors((e) => ({ ...e, phone: "" }));
  }

  function scrollToSection(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = {
      type: validateTypes(form.types),
      desc: validateDesc(form.description),
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone, form.contactMethod),
      consent: validateConsent(form.consent),
    };
    setErrors(newErrors);
    const firstInvalid = (["type", "desc", "name", "email", "phone", "consent"] as const).find(
      (k) => newErrors[k],
    );
    if (firstInvalid) {
      const sectionId =
        firstInvalid === "type"
          ? "q-type"
          : firstInvalid === "desc"
            ? "q-desc"
            : "q-contact";
      scrollToSection(sectionId);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          types: form.types,
          description: form.description,
          timeline: form.timeline || undefined,
          name: form.name,
          email: form.email,
          company: form.company || undefined,
          website: form.website || undefined,
          contactMethod: form.contactMethod,
          phone: form.phone || undefined,
          consent: form.consent,
          hp: form.hp,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccessRef(data.ref);
        setStatus("success");
      } else {
        setErrorMessage(data.message || "Something didn't go through. Nothing was lost — try sending again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error — check your connection and try again.");
      setStatus("error");
    }
  }

  const progressPct = ((activeSection + 1) / SECTIONS.length) * 100;
  const timelineLabel = TIMELINES.find((t) => t.value === form.timeline)?.label;
  const discipline = form.types.length ? primaryDiscipline(form.types) : "";

  return (
    <>
      <main className={styles.main}>
        <div aria-hidden="true" style={{ position: "fixed", right: "-18vmin", top: "50%", width: "min(60vmin,480px)", height: "min(60vmin,480px)", transform: "translate3d(0,-50%,0)", opacity: 0.18, pointerEvents: "none", zIndex: 0 }}>
          <CoreMark fill="chrome" animation="drift" style={{ width: "100%", height: "100%" }} />
        </div>

        <form className={styles.layout} onSubmit={handleSubmit}>
          <nav className={styles.rail}>
            <span className={styles.railKicker}>Start a Project / 001</span>
            <div className={styles.railLinks}>
              {SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`${styles.railLink} ${i === activeSection ? styles.active : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                >
                  <span className={styles.railTick}>—</span>
                  {s.label}
                </a>
              ))}
            </div>
            <div className={styles.railProgress}>
              <div className={styles.railTrack}>
                <div className={styles.railBar} style={{ width: `${progressPct}%` }} />
              </div>
              <span className={styles.railCount}>
                {activeSection + 1}/{SECTIONS.length}
              </span>
            </div>
            <p className={styles.railNote}>Name and work email are the only two answers we truly need. Everything else helps us respond properly.</p>
          </nav>

          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.headline}>
                <span>What are we</span>
                <span className={styles.chromeText}>creating?</span>
              </h1>
              <p className={styles.headerBody}>Tell us where you want to go. We&rsquo;ll figure out what it takes to get there.</p>
            </header>

            {/* honeypot — hidden from real visitors */}
            <input
              type="text"
              name="company_website_url"
              value={form.hp}
              onChange={(e) => setForm((f) => ({ ...f, hp: e.target.value }))}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />

            <section
              id="q-type"
              ref={(el) => {
                sectionRefs.current["q-type"] = el;
              }}
              className={styles.section}
            >
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>What do you need?</h2>
                <span className={styles.required}>Required · pick any</span>
              </div>
              <div className={styles.typeGrid}>
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    className={`${styles.typeBtn} ${form.types.includes(t.value) ? styles.selected : ""}`}
                    onClick={() => toggleType(t.value)}
                  >
                    <span>{t.label}</span>
                    <span className={styles.typeTick}>{form.types.includes(t.value) ? "×" : "+"}</span>
                  </button>
                ))}
              </div>
              {errors.type && <span className={styles.errorText}>{errors.type}</span>}
            </section>

            <section
              id="q-desc"
              ref={(el) => {
                sectionRefs.current["q-desc"] = el;
              }}
              className={styles.section}
            >
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Tell us about it.</h2>
                <span className={styles.required}>Required</span>
              </div>
              <label className={styles.fieldRow}>
                <span className={styles.fieldLabel}>What are you trying to create, change or solve?</span>
                <textarea
                  className={styles.textarea}
                  rows={6}
                  placeholder="A sentence or two is plenty to start."
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  onBlur={() => setErrors((e) => ({ ...e, desc: validateDesc(form.description) }))}
                />
              </label>
              <div className={styles.countRow}>
                {errors.desc && <span className={styles.errorText}>{errors.desc}</span>}
                <span className={styles.count}>{form.description.length} characters</span>
              </div>
            </section>

            <section
              id="q-planning"
              ref={(el) => {
                sectionRefs.current["q-planning"] = el;
              }}
              className={styles.section}
              style={{ gap: "clamp(28px,3.4vw,44px)" }}
            >
              <div className={styles.fieldRow} style={{ gap: 20 }}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitleSm}>When do you want to move?</h2>
                  <span className={styles.optional}>Optional</span>
                </div>
                <div className={styles.optionGroup}>
                  {TIMELINES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      className={`${styles.optionBtn} ${form.timeline === t.value ? styles.selected : ""}`}
                      onClick={() => pickSingle("timeline", t.value)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section
              id="q-contact"
              ref={(el) => {
                sectionRefs.current["q-contact"] = el;
              }}
              className={styles.section}
              style={{ gap: "clamp(28px,3.4vw,44px)" }}
            >
              <div className={styles.fieldRow} style={{ gap: 22 }}>
                <h2 className={styles.sectionTitle}>Who are we talking to?</h2>
                <div className={styles.contactGrid}>
                  <label className={styles.textField}>
                    <span className={styles.fieldLabel}>
                      Name <span style={{ color: "var(--vermilion)" }}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onBlur={() => setErrors((e) => ({ ...e, name: validateName(form.name) }))}
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </label>
                  <label className={styles.textField}>
                    <span className={styles.fieldLabel}>
                      Work Email <span style={{ color: "var(--vermilion)" }}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onBlur={() => setErrors((e) => ({ ...e, email: validateEmail(form.email) }))}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </label>
                  <label className={styles.textField}>
                    <span className={styles.fieldLabel}>Company</span>
                    <input
                      className={styles.input}
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    />
                  </label>
                  <label className={styles.textField}>
                    <span className={styles.fieldLabel}>Company Website</span>
                    <input
                      className={styles.input}
                      type="url"
                      autoComplete="url"
                      value={form.website}
                      onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.fieldRow} style={{ gap: 20 }}>
                <h2 className={styles.sectionTitleSm}>How should we get back to you?</h2>
                <div className={styles.optionGroup}>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${form.contactMethod === "email" ? styles.selected : ""}`}
                    onClick={() => pickMethod("email")}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${form.contactMethod === "whatsapp" ? styles.selected : ""}`}
                    onClick={() => pickMethod("whatsapp")}
                  >
                    WhatsApp
                  </button>
                </div>
                {form.contactMethod === "whatsapp" && (
                  <label className={styles.phoneWrap}>
                    <span className={styles.fieldLabel}>
                      Phone / WhatsApp Number <span style={{ color: "var(--vermilion)" }}>*</span>
                    </span>
                    <input
                      className={styles.input}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+ country code first"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      onBlur={() => setErrors((e) => ({ ...e, phone: validatePhone(form.phone, form.contactMethod) }))}
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </label>
                )}
              </div>
            </section>

            <section
              id="q-review"
              ref={(el) => {
                sectionRefs.current["q-review"] = el;
              }}
              className={styles.section}
            >
              <div className={styles.sectionHead} style={{ justifyContent: "space-between" }}>
                <h2 className={styles.sectionTitle}>Your project / 01</h2>
                <span className={styles.optional}>Edit anything before sending</span>
              </div>

              <div className={styles.reviewList}>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Discipline</span>
                  <span className={styles.reviewValue} style={{ textTransform: "capitalize" }}>
                    {discipline || "Not selected"}
                  </span>
                  <a href="#q-type" className={styles.reviewEdit} onClick={(e) => { e.preventDefault(); scrollToSection("q-type"); }}>
                    Edit
                  </a>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Needs</span>
                  <span className={styles.reviewValueMono}>{form.types.length ? projectTypeLabels(form.types) : "—"}</span>
                  <a href="#q-type" className={styles.reviewEdit} onClick={(e) => { e.preventDefault(); scrollToSection("q-type"); }}>
                    Edit
                  </a>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Project</span>
                  <span className={styles.reviewValue}>{form.description || "—"}</span>
                  <a href="#q-desc" className={styles.reviewEdit} onClick={(e) => { e.preventDefault(); scrollToSection("q-desc"); }}>
                    Edit
                  </a>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Timeline</span>
                  <span className={styles.reviewValueMono}>{timelineLabel || "Not given"}</span>
                  <a href="#q-planning" className={styles.reviewEdit} onClick={(e) => { e.preventDefault(); scrollToSection("q-planning"); }}>
                    Edit
                  </a>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Reply via</span>
                  <span className={styles.reviewValueMono}>
                    {form.contactMethod === "whatsapp" ? `WhatsApp · ${form.phone || "awaiting number"}` : "Email"}
                  </span>
                  <a href="#q-contact" className={styles.reviewEdit} onClick={(e) => { e.preventDefault(); scrollToSection("q-contact"); }}>
                    Edit
                  </a>
                </div>
              </div>

              <label className={styles.consentRow}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, consent: e.target.checked }));
                    setErrors((er) => ({ ...er, consent: "" }));
                  }}
                />
                <span className={styles.consentText}>
                  I understand Creative Core will use what I&rsquo;ve shared here only to reply to my enquiry.
                </span>
              </label>
              {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}

              <div className={styles.submitRow}>
                <button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Start the conversation ↗"}
                </button>
                <p className={styles.submitNote}>
                  We use what you send here only to reply to your enquiry.
                </p>
              </div>
            </section>
          </div>
        </form>
      </main>

      {status === "success" && (
        <div className={styles.overlay}>
          <div className={styles.overlayInner}>
            <span className={styles.overlayEyebrow}>
              Received · <span>{successRef}</span>
            </span>
            <h2 className={styles.overlayHeadline}>
              <span>It&rsquo;s in</span>
              <span className={styles.chromeText}>the core.</span>
            </h2>
            <p className={styles.overlayBody}>We&rsquo;ve received your project. We&rsquo;ll take it from here.</p>
            <div className={styles.overlayActions}>
              <Link href="/" className={styles.submitBtn}>
                Back to home ↗
              </Link>
              <Link href="/services" style={{ minHeight: 56, display: "inline-flex", alignItems: "center", border: "1px solid var(--border-interactive)", padding: "17px 28px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Explore services
              </Link>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className={styles.errorBanner}>
          <div className={styles.errorBannerInner}>
            <div className={styles.errorBannerText}>
              <span className={styles.errorBannerTitle}>Something didn&rsquo;t go through.</span>
              <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--gray-300)" }}>{errorMessage}</span>
            </div>
            <div className={styles.errorBannerActions}>
              <button className={styles.errorBannerBtn} onClick={handleSubmit}>
                Try again ↗
              </button>
              <button className={styles.errorBannerDismiss} onClick={() => setStatus("idle")}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
