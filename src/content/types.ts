export type ExternalLink = {
  label: string;
  href: string;
  /** Small line above the label on download-style buttons, e.g. "Android APK on APKPure". */
  caption?: string;
  /** Icon shown on project cards and download buttons. */
  icon?: "customer" | "rider" | "restaurant" | "download";
};

export type Role = {
  title: string;
  period: string;
};

export type Experience = {
  company: string;
  location: string;
  domain: string;
  roles: Role[];
  highlights: string[];
  tech: string[];
  projectSlugs?: string[];
};

export type EngineeringNote = {
  label: string;
  detail: string;
};

export type ProjectLinks = {
  appStore?: string;
  playStore?: string;
  website?: string;
  /** Any further public links, e.g. store mirrors for each app of a multi-app product. */
  other?: ExternalLink[];
};

export type Screenshot = {
  src: string;
  /** Describe only what is visible on the screen. */
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Descriptive <title> for the project page; keep under ~50 characters (" | Ahmad Hussain" is appended). */
  seoTitle: string;
  company: string;
  /** End client the product was built for, when a source names one. */
  client?: string;
  role: string;
  /** Only set when a source document states the project dates. */
  period?: string;
  domain: string;
  platforms: string[];
  summary: string;
  overview: string[];
  contributions: string[];
  engineering: EngineeringNote[];
  tech: string[];
  /** Published on these stores according to the CV; URLs go in `links`. */
  distribution: string[];
  links: ProjectLinks;
  /** Public store screenshots, shown in the project gallery; the first also appears on the card. */
  screenshots?: Screenshot[];
  /** Attribution shown under the gallery, e.g. "Screenshots: Google Play listing © MAFELL AG". */
  screenshotCredit?: string;
  featured: boolean;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  focus: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

export type OpenSourceRepo = {
  name: string;
  description: string;
  language?: string;
  href: string;
};

/** A published package or open-source app with its own card in the Open source section. */
export type OpenSourcePackage = {
  name: string;
  /** e.g. "Flutter plugin", "Agent Skills + CLI", "Android app". */
  kind: string;
  /** Shown as a small badge, e.g. "Beta"; omit for stable releases. */
  status?: string;
  summary: string;
  highlights: string[];
  tech: string[];
  license?: string;
  links: {
    github: string;
    npm?: string;
    pubDev?: string;
  };
  /** Install commands with a copy button, e.g. ["flutter pub add ble_keeper"]. */
  install?: string[];
  screenshots?: Screenshot[];
};

/** Smaller, earlier projects shown in a compact list without detail pages. */
export type EarlierProject = {
  name: string;
  tagline: string;
  period: string;
  /** Employer, university or engagement, only when the source states it. */
  context?: string;
  summary: string;
  tech: string[];
};

/** A client review copied verbatim from a public marketplace profile. */
export type ClientReview = {
  /** Public marketplace username, shown so the review can be verified. */
  author: string;
  country: string;
  rating: number;
  /** Approximate year, derived from the relative date shown on the profile. */
  year: string;
  /** Verbatim text — do not edit wording or spelling. */
  quote: string;
};
