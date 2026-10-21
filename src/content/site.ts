export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmadhussain.dev"
).replace(/\/$/, "");

export const site = {
  name: "Ahmad Hussain",
  title: "Senior Mobile Engineer",
  /** Second line of the homepage H1; mirrors the CV headline. */
  specialisation: "Android (Kotlin) & Flutter",
  /** <title> of the homepage; keep under ~65 characters. */
  seoTitle: "Ahmad Hussain | Senior Android & Mobile Engineer · Kotlin, Flutter",
  focus: ["Android", "Kotlin", "Flutter", "iOS", "IoT", "Automotive"],
  location: "Islamabad, Pakistan",
  remoteStatement: "Open to remote roles with international teams",
  currentRole: { title: "Senior Software Engineer", company: "MRS Technologies" },
  summary:
    "I build production Android applications in Kotlin and Java (9+ years) and cross-platform Flutter apps (5+ years) for automotive, IoT and connected-device products (BLE, CAN and MQTT), as well as healthcare, fintech and e-commerce.",
  metaDescription:
    "Senior Android & mobile engineer in Pakistan with 9+ years of Kotlin/Java and 5+ of Flutter, building automotive and IoT apps over BLE, CAN and MQTT. Open to remote roles.",
  /** Short line used for social share cards. */
  shareDescription: "Senior Mobile Engineer · Android • Kotlin • Flutter • IoT • Automotive",
  email: "ahmadhussain0335@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmad-hussain-b3268a15a/",
  github: "https://github.com/Ahmadhussain0335",
  npm: "https://www.npmjs.com/~ahmadhussain0335",
  /** Replace the file in /public/resume to update the downloadable CV. */
  cvPath: "/resume/Ahmad-Hussain-CV.pdf",
  /** Background-removed portrait; replace the file to update it everywhere. */
  portrait: {
    /** PNG for the Open Graph renderer and the sitemap; `webSrc` (840 px WebP) is what the page loads. */
    src: "/images/ahmad-hussain.png",
    webSrc: "/images/ahmad-hussain.webp",
    alt: "Ahmad Hussain, Senior Mobile Engineer, in a dark suit",
    width: 1254,
    height: 1254,
  },
  languages: [
    { name: "English", level: "Professional working proficiency" },
    { name: "Urdu", level: "Native" },
  ],
} as const;

export const navItems = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Open source", href: "/#open-source" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
] as const;
