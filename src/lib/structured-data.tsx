import { site, siteUrl } from "@/content/site";
import { education } from "@/content/education";
import { reviewsSource } from "@/content/reviews";
import type { Project } from "@/content/types";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

/** Facts here must match what the page shows; see docs/SEO.md. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    jobTitle: site.title,
    description: site.metaDescription,
    url: siteUrl,
    image: `${siteUrl}${site.portrait.src}`,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    sameAs: [site.linkedin, site.github, site.npm, reviewsSource.profileUrl],
    worksFor: { "@type": "Organization", name: site.currentRole.company },
    hasOccupation: {
      "@type": "Occupation",
      name: site.title,
      skills: "Android, Kotlin, Java, Jetpack Compose, Flutter, Dart, Bluetooth Low Energy, CAN Bus, MQTT, Clean Architecture, MVVM",
    },
    alumniOf: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution })),
    knowsAbout: [
      "Android development",
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Flutter",
      "Dart",
      "iOS development",
      "Bluetooth Low Energy",
      "CAN Bus",
      "MQTT",
      "IoT",
      "Automotive software",
      "Clean Architecture",
      "CI/CD",
    ],
    knowsLanguage: site.languages.map((language) => language.name),
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: `${site.name} | ${site.title}`,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: site.seoTitle,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
      personSchema(),
    ],
  };
}

export function projectGraph(project: Project) {
  const url = `${siteUrl}/projects/${project.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: siteUrl },
          { "@type": "ListItem", position: 2, name: project.name, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.name,
        headline: project.seoTitle,
        description: project.summary,
        url,
        author: { "@id": personId },
        keywords: project.tech.join(", "),
        ...(project.screenshots?.length ? { image: project.screenshots.map((shot) => `${siteUrl}${shot.src}`) } : {}),
        ...(project.links.playStore || project.links.appStore
          ? { sameAs: [project.links.playStore, project.links.appStore].filter(Boolean) }
          : {}),
        about: project.domain,
        isPartOf: { "@id": websiteId },
      },
      { "@type": "Person", "@id": personId, name: site.name, url: siteUrl, jobTitle: site.title, sameAs: [site.linkedin, site.github, site.npm] },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
