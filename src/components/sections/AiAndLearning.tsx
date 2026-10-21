import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/ui/FadeIn";
import { ChipList } from "@/components/ui/Chip";

const columns = [
  {
    label: "In daily work",
    title: "AI-assisted development",
    body: "Claude Code and GitHub Copilot are part of my regular workflow for code generation, debugging, test scaffolding and technical documentation. I publish mobile-dev-kit, a set of Agent Skills for mobile teams, on npm and pub.dev.",
    chips: ["Claude Code", "GitHub Copilot", "Agent Skills"],
  },
  {
    label: "Foundation",
    title: "MSc Data Science",
    body: "Coursework in machine learning, deep learning and artificial intelligence at SZABIST, alongside recent Anthropic and IBM certifications on agentic coding, agent skills and prompting.",
    chips: ["Machine Learning", "Deep Learning", "Prompting"],
  },
  {
    label: "Currently",
    title: "Exploring AI engineering",
    body: "Currently exploring AI engineering and LLM-powered applications, and how they can be applied to mobile and connected-device products. This is a learning area, not professional AI product work.",
    chips: ["LLM-powered applications"],
  },
];

export function AiAndLearning() {
  return (
    <Section
      id="ai"
      eyebrow="AI & emerging technology"
      title="Where AI fits in my work"
      intro="My profession is mobile engineering. AI is a tool I use every day and an area I am actively studying."
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {columns.map((col, i) => (
          <li key={col.title}>
            <FadeIn className="h-full" index={i}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{col.label}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{col.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{col.body}</p>
                <div className="mt-5">
                  <ChipList items={col.chips} label={`${col.title} topics`} />
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>
    </Section>
  );
}
