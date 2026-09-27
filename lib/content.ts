/**
 * Copy and structured content for Home + Services, transcribed from the
 * Claude Design prototypes ("Creative Core - Homepage.dc.html" /
 * "Creative Core - Services.dc.html") and the PRD. Kept as data so Home and
 * Services can share the CREATE/BUILD/GROW copy and process steps without
 * duplicating strings.
 */

export type DisciplineKey = "create" | "build" | "grow";

/** The four-point "Core" mark's path, shared by every CoreMark instance and by the ink<->bone wipe mask. */
export const CORE_PATH =
  "M50 0 C52.5 44 55.5 47.2 100 50 C55.5 52.8 52.5 56 50 100 C47.5 56 44.5 52.8 0 50 C44.5 47.2 47.5 44 50 0 Z";

export const disciplines: Array<{
  key: DisciplineKey;
  label: string;
  tagline: string; // used in the Home CREATE→BUILD→GROW sequence + capabilities row
  motif: string; // e.g. "Rotational · halftone"
  homeItems: string[]; // short tag list for the sequence panel
  homeSummary: string; // one-line capability-row description
  services: {
    heading: string;
    lede: string;
    items: Array<{ title: string; desc: string; href: string }>;
  };
}> = [
  {
    key: "create",
    label: "Create",
    tagline: "Brands, identities and experiences designed to be remembered.",
    motif: "Rotational · halftone",
    homeItems: ["Brand Identity", "Graphic Design", "UI/UX", "Motion", "Visual Content"],
    homeSummary: "Brand and design work that gives a business a form people remember and recognise.",
    services: {
      heading: "Make it impossible to ignore.",
      lede: "We build visual identities and experiences that give businesses a distinct presence across every touchpoint.",
      items: [
        { title: "Brand Identity", desc: "Visual identity systems, creative direction and the visual language that makes a business recognizable.", href: "/start-a-project?discipline=create&service=brand-identity" },
        { title: "Graphic Design", desc: "Digital and physical design across campaigns, communications, marketing materials and brand touchpoints.", href: "/start-a-project?discipline=create&service=graphic-design" },
        { title: "UI/UX Design", desc: "Interfaces and experiences designed around clarity, usability and the way people actually interact with digital products.", href: "/start-a-project?discipline=create&service=ui-ux" },
        { title: "Web Design", desc: "High-quality digital experiences combining strong art direction, interaction and conversion-focused structure.", href: "/start-a-project?discipline=create&service=web-design" },
        { title: "Motion & Visuals", desc: "Motion graphics, digital animation and visual experiences that bring brands and ideas to life.", href: "/start-a-project?discipline=create&service=motion" },
        { title: "Social & Campaign Design", desc: "Creative systems and visual content built for campaigns, social platforms and ongoing communication.", href: "/start-a-project?discipline=create&service=social-campaign" },
      ],
    },
  },
  {
    key: "build",
    label: "Build",
    tagline: "Websites, products and intelligent systems engineered to perform.",
    motif: "Axial · lattice",
    homeItems: ["Websites", "Web Apps", "Mobile Apps", "Custom Software", "AI Agents", "AI Automation"],
    homeSummary: "Engineering for the things that have to work every day: sites, products, software, agents.",
    services: {
      heading: "Turn ideas into working products.",
      lede: "We design and engineer digital products, software and intelligent systems built around real business problems.",
      items: [
        { title: "Websites", desc: "High-performance marketing and corporate websites combining design, motion, content and production engineering.", href: "/start-a-project?discipline=build&service=websites" },
        { title: "Web Applications", desc: "Custom browser-based products and platforms built around specific workflows and business requirements.", href: "/start-a-project?discipline=build&service=web-applications" },
        { title: "Mobile Applications", desc: "Digital products designed and developed for mobile experiences.", href: "/start-a-project?discipline=build&service=mobile-applications" },
        { title: "Custom Software", desc: "Purpose-built software for businesses whose problems cannot be solved properly with off-the-shelf tools.", href: "/start-a-project?discipline=build&service=custom-software" },
        { title: "AI Agents", desc: "Intelligent agents designed to perform tasks, interact with systems and support real business workflows.", href: "/start-a-project?discipline=build&service=ai-agents" },
        { title: "AI Automation", desc: "Automated workflows combining AI, business logic and existing tools to reduce repetitive work and improve operations.", href: "/start-a-project?discipline=build&service=ai-automation" },
        { title: "Integrations", desc: "Connecting applications, APIs, platforms and business systems into reliable workflows.", href: "/start-a-project?discipline=build&service=integrations" },
      ],
    },
  },
  {
    key: "grow",
    label: "Grow",
    tagline: "Strategy, content and marketing built to turn attention into momentum.",
    motif: "Accumulative · series",
    homeItems: ["Social Media", "Content", "Campaigns", "Digital Strategy", "Growth"],
    homeSummary: "The work that compounds: channels, content and campaigns pointed at one outcome.",
    services: {
      heading: "Make good work travel further.",
      lede: "We combine strategy, content and digital marketing to help businesses reach the right people and create sustained momentum.",
      items: [
        { title: "Social Media Management", desc: "Planning, publishing and managing an intentional presence across relevant social channels.", href: "/start-a-project?discipline=grow&service=social-media-management" },
        { title: "Content Strategy", desc: "Defining what to communicate, who it is for and how content supports wider business goals.", href: "/start-a-project?discipline=grow&service=content-strategy" },
        { title: "Content Creation", desc: "Creative content designed for the formats, platforms and audiences where it will actually live.", href: "/start-a-project?discipline=grow&service=content-creation" },
        { title: "Campaigns", desc: "Creative and digital campaigns built around specific launches, messages and business objectives.", href: "/start-a-project?discipline=grow&service=campaigns" },
        { title: "Digital Strategy", desc: "Connecting channels, content and digital experiences into a coherent direction.", href: "/start-a-project?discipline=grow&service=digital-strategy" },
        { title: "Growth & Optimization", desc: "Learning from performance and continuously improving what works.", href: "/start-a-project?discipline=grow&service=growth-optimization" },
      ],
    },
  },
];

export const processSteps = [
  { idx: "01", title: "Discover", desc: "Business, audience, constraints, what already works." },
  { idx: "02", title: "Define", desc: "The core idea, the scope, the measures of done." },
  { idx: "03", title: "Create", desc: "Identity, design language, interface and content." },
  { idx: "04", title: "Build", desc: "Engineering, integration, automation, QA." },
  { idx: "05", title: "Launch", desc: "Release, handover, documentation, training." },
  { idx: "06", title: "Grow", desc: "Channels, content, iteration against the measures." },
];

export const home = {
  hero: {
    eyebrow: "Creative Core® — Design / Technology / Growth",
    headline: ["Ideas have", "a core."],
    body: "We create identities, digital products and growth experiences for businesses ready to move forward.",
  },
  sequenceEnd: {
    eyebrow: "Recombined",
    headline: ["One core.", "Three disciplines."],
    body: "Creativity, technology and growth are not three suppliers. They are one system with one core.",
  },
  philosophy: {
    eyebrow: "Our position",
    headline: ["We don't separate", "creativity from", "technology."],
    body: "Great businesses need more than a logo, more than software and more than marketing. Creative Core brings design, technology and growth together as one connected system.",
  },
  capabilitiesIntro: {
    headline: ["Three disciplines.", "One way forward."],
    eyebrow: "What we do / 001—003",
  },
  process: {
    eyebrow: "How we work",
    headline: ["From thought", "to impact."],
    body: "One continuous engagement, not a relay between agencies. The same team carries an idea from the first conversation through to the numbers it moves.",
  },
  why: {
    headline: ["Built to work", "as one."],
    items: [
      { idx: "01", title: "One connected team.", body: "Designers, engineers and marketers working toward the same outcome." },
      { idx: "02", title: "Built around your business.", body: "We don't force businesses into templates. The solution follows the problem." },
      { idx: "03", title: "From idea to execution.", body: "Strategy, design, technology and growth without coordinating multiple disconnected partners." },
    ],
  },
  finalCta: {
    eyebrow: "Have an idea?",
    headline: ["Let's find", "its core."],
    cta: "Start a Project ↗",
  },
};

export const services = {
  hero: {
    eyebrow: "Capabilities / 001—003",
    headline: ["One core.", "Three disciplines."],
    body: "Strategy, creativity and technology working together from the first idea to what comes next.",
  },
  connectedModel: {
    headline: ["The best work", "doesn't happen", "in silos."],
    body: "A brand affects the product. The product affects the experience. The experience affects how people respond. Creative Core connects those decisions from the beginning.",
    label: "Create → Build → Grow → Creative Core",
  },
  engagements: {
    headline: ["Start where", "you need us."],
    body: "You don't need all three disciplines to work with Creative Core. Start with the problem. We'll determine what it needs.",
    items: [
      { title: "A new brand", tag: "Create", flow: "Strategy → Identity → Brand System → Digital Presence", href: "/start-a-project?engagement=new-brand" },
      { title: "A digital product", tag: "Create + Build", flow: "Product Strategy → UX/UI → Engineering → Launch", href: "/start-a-project?engagement=digital-product" },
      { title: "AI automation", tag: "Build", flow: "Workflow Discovery → Solution Design → Integration → Deployment", href: "/start-a-project?engagement=ai-automation" },
      { title: "A business ready to grow", tag: "Create + Grow", flow: "Strategy → Content System → Campaigns → Optimization", href: "/start-a-project?engagement=ready-to-grow" },
      { title: "A complete digital launch", tag: "Create + Build + Grow", flow: "Brand → Product → Launch → Growth", href: "/start-a-project?engagement=complete-launch" },
    ],
  },
  process: {
    eyebrow: "How we work",
    body: "Every engagement starts with understanding the problem before choosing the solution.",
  },
  finalCta: {
    eyebrow: "Not sure where your project fits?",
    headline: ["Good.", "Start with", "the idea."],
    body: "Tell us what you're trying to create, build or change. We'll figure out what it needs.",
    cta: "Start a Project ↗",
  },
};

export const footerContent = {
  nav: [
    { label: "Services", href: "/services" },
    { label: "Start a Project", href: "/start-a-project" },
  ],
  contact: ["[ email — tbc ]", "[ phone — tbc ]", "[ studio address — tbc ]"],
  channels: ["[ Instagram — handle tbc ]", "[ LinkedIn — handle tbc ]", "[ X — handle tbc ]"],
};
