import { featuredProjects, moreProjects } from "@/content/projects";
import { earlierProjects } from "@/content/earlier-projects";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Slider } from "@/components/ui/Slider";

const mainProjects = [...featuredProjects, ...moreProjects];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected projects"
      intro="Production Android and Flutter applications for automotive, IoT, smart home, healthcare and e-commerce, most of them shipped on Google Play and the App Store."
    >
      <h3 className="sr-only">Featured projects</h3>
      <FadeIn>
        <Slider label="Featured projects" slideLabels={mainProjects.map((project) => project.name)} autoplay={6000}>
          {mainProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Slider>
      </FadeIn>

      <div className="mt-20">
        <FadeIn>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">Earlier projects</h3>
          <p className="mt-1 text-muted">Android and web products from 2017 to 2020.</p>
        </FadeIn>
        <FadeIn className="mt-6">
          <Slider label="Earlier projects" slideLabels={earlierProjects.map((project) => project.name)} variant="compact">
            {earlierProjects.map((project) => (
              <article
                key={project.name}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-strong hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.3)]"
              >
                <p className="font-mono text-xs text-subtle">
                  {project.period}
                  {project.context ? ` · ${project.context}` : null}
                </p>
                <h4 className="mt-2 font-semibold tracking-tight text-foreground">{project.name}</h4>
                <p className="text-sm text-muted">{project.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
                <p className="mt-4 text-xs leading-relaxed text-subtle">{project.tech.join(" · ")}</p>
              </article>
            ))}
          </Slider>
        </FadeIn>
      </div>
    </Section>
  );
}
