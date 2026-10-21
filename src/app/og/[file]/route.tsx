import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { defaultOgCard, loadPortraitDataUri, renderOgCard } from "@/lib/og";

// Share images as real .png files in the static export: /og/home.png and /og/<slug>.png.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: "home.png" }, ...projects.map((project) => ({ file: `${project.slug}.png` }))];
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const project = getProject(file.replace(/\.png$/, ""));
  if (!project) return renderOgCard({ ...defaultOgCard, portrait: await loadPortraitDataUri() });
  return renderOgCard({
    kicker: `${site.name}  ·  ${project.company}`,
    title: project.name,
    subtitle: project.tagline,
    body: project.platforms.join(" · ") + "  ·  " + project.tech.slice(0, 6).join(", "),
  });
}
