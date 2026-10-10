import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PipelineGraphic } from "@/components/pipeline-graphic";
import { Reveal } from "@/components/reveal";
import { profile, projects } from "@/content/portfolio";

type PageProps = { params: Promise<{ slug: string }> };

const variants = {
  "industrial-rag": "rag",
  "food-beverage-lakehouse": "lakehouse",
  "aviation-etl": "aviation",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${profile.name}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const variant = variants[project.slug as keyof typeof variants];

  return (
    <main id="main-content" className="case-page">
      <div className="container">
        <Link className="case-back" href="/#work">
          <ArrowLeft size={16} aria-hidden="true" /> All selected work
        </Link>

        <Reveal className="case-hero">
          <p className="eyebrow">CASE STUDY {project.number} / {project.category}</p>
          <h1 className="case-title">{project.title}<span className="accent-text">.</span></h1>
          <p className="case-summary">{project.summary}</p>

          <dl className="case-meta">
            <div className="case-meta-item">
              <dt>Contribution</dt>
              <dd>{project.role}</dd>
            </div>
            <div className="case-meta-item">
              <dt>Timeline</dt>
              <dd>{project.period}</dd>
            </div>
            <div className="case-meta-item">
              <dt>Delivered at</dt>
              <dd>Celebal Technologies</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="case-architecture">
          <PipelineGraphic variant={variant} />
          <p className="case-diagram-caption">A high-level view of the documented data flow.</p>
        </Reveal>

        <div className="case-metrics">
          {project.outcomes.map((outcome, index) => (
            <Reveal className="case-metric" key={outcome.label} delay={index * 0.08}>
              <strong>{outcome.value}</strong>
              <span>{outcome.label}</span>
            </Reveal>
          ))}
        </div>

        <section className="case-section" aria-labelledby="overview-title">
          <div className="case-section-label">
            <p className="eyebrow">01 / THE CONTEXT</p>
            <h2 id="overview-title">The right foundation changes everything.</h2>
          </div>
          <div className="case-section-content">
            <p>{project.description}</p>
            <h3>The challenge</h3>
            <p>{project.challenge}</p>
          </div>
        </section>

        <section className="case-section" aria-labelledby="approach-title">
          <div className="case-section-label">
            <p className="eyebrow">02 / MY CONTRIBUTION</p>
            <h2 id="approach-title">Built with intention.<br />Ready for production.</h2>
          </div>
          <div className="case-highlights">
            {project.highlights.map((highlight, index) => (
              <Reveal className="case-highlight" key={highlight.title}>
                <span className="case-highlight-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="case-section" aria-labelledby="flow-title">
          <div className="case-section-label">
            <p className="eyebrow">03 / THE DATA FLOW</p>
            <h2 id="flow-title">From source<br />to something useful.</h2>
          </div>
          <ol className="case-section-content case-flow">
            {project.architecture.map((step, index) => (
              <li key={step.title}>
                <span className="case-flow-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-section" aria-labelledby="stack-title">
          <div className="case-section-label">
            <p className="eyebrow">04 / THE TOOLKIT</p>
            <h2 id="stack-title">The technology<br />behind the work.</h2>
          </div>
          <div className="case-section-content">
            <ul className="tag-list" aria-label="Project technologies">
              {project.stack.map((technology) => <li key={technology} className="tag">{technology}</li>)}
            </ul>
            <a className="case-contact-link" href={`mailto:${profile.email}`}>
              Have a similar challenge? Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <Link className="next-project" href={`/work/${nextProject.slug}`}>
          <div>
            <span className="eyebrow">NEXT CASE STUDY / {nextProject.number}</span>
            <h2>{nextProject.title}</h2>
            <p>{nextProject.category}</p>
          </div>
          <ArrowRight size={32} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
