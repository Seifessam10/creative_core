import { z } from "zod";

export const PROJECT_TYPES = [
  { value: "brand-design", label: "Brand / Design", discipline: "create" },
  { value: "website", label: "Website", discipline: "build" },
  { value: "app", label: "Web or Mobile App", discipline: "build" },
  { value: "custom-software", label: "Custom Software", discipline: "build" },
  { value: "ai-automation", label: "AI / Automation", discipline: "build" },
  { value: "social-marketing", label: "Social / Marketing", discipline: "grow" },
  { value: "multiple", label: "Multiple Disciplines", discipline: "all" },
  { value: "something-else", label: "Something Else", discipline: "none" },
] as const;

export const BUDGET_BANDS = [
  { value: "band-1", label: "[ Band 1 — to be configured ]" },
  { value: "band-2", label: "[ Band 2 — to be configured ]" },
  { value: "band-3", label: "[ Band 3 — to be configured ]" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-months", label: "Within 1–2 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "later", label: "Exploring for later" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];
export type BudgetBand = (typeof BUDGET_BANDS)[number]["value"];
export type Timeline = (typeof TIMELINES)[number]["value"];
export type ContactMethod = "email" | "whatsapp";

/**
 * Authoritative shape for a Start a Project submission (PRD §4.5/§5): the
 * server re-validates everything the client already checked. `hp` is the
 * honeypot field — real visitors never see or fill it.
 */
export const inquirySchema = z
  .object({
    types: z.array(z.string()).min(1, "Pick at least one project type."),
    description: z.string().trim().min(40, "A little more detail — around 40 characters or more."),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    name: z.string().trim().min(1, "We need a name to reply to."),
    email: z.string().trim().email("That email doesn't look complete."),
    company: z.string().trim().optional(),
    website: z.string().trim().optional(),
    contactMethod: z.enum(["email", "whatsapp"]),
    phone: z.string().trim().optional(),
    consent: z.literal(true, { message: "Please confirm you've read the privacy notice." }),
    // Deliberately unconstrained: a filled honeypot must still pass schema
    // validation so the route can fake a normal success response instead of
    // handing a bot a validation error that reveals the trap.
    hp: z.string().optional(),
  })
  .refine((data) => data.contactMethod !== "whatsapp" || (data.phone && data.phone.length > 0), {
    message: "Include the country code, digits only after the +.",
    path: ["phone"],
  });

export type InquiryInput = z.infer<typeof inquirySchema>;

export function projectTypeLabels(values: string[]): string {
  return values
    .map((v) => PROJECT_TYPES.find((t) => t.value === v)?.label ?? v)
    .join(" · ");
}

export function primaryDiscipline(values: string[]): string {
  const found = PROJECT_TYPES.find((t) => values.includes(t.value));
  return found?.discipline ?? "none";
}

/** Plain-text email body sent to the configured business inbox. */
export function renderInquiryEmail(data: InquiryInput, ref: string): string {
  const lines = [
    `New project inquiry — ${ref}`,
    "",
    `Needs: ${projectTypeLabels(data.types)}`,
    `Description: ${data.description}`,
    `Budget: ${data.budget ?? "Not given"}`,
    `Timeline: ${data.timeline ?? "Not given"}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Company website: ${data.website || "—"}`,
    `Preferred contact: ${data.contactMethod}${data.contactMethod === "whatsapp" ? ` (${data.phone})` : ""}`,
  ];
  return lines.join("\n");
}
