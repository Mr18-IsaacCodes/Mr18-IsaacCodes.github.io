import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Award, Boxes, Braces, Check, Cloud, Code2, Database, GraduationCap, Layers3, MapPin, Sparkles, Terminal, Users } from "lucide-react";
import { PipelineGraphic } from "@/components/pipeline-graphic";
import { Reveal } from "@/components/reveal";
import { certifications, education, experience, leadership, profile, projects, skillGroups } from "@/content/portfolio";

const variants = ["rag", "lakehouse", "aviation"] as const;
const skillIcons = [Code2, Layers3, Cloud, Database, Sparkles, Terminal];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <Reveal><div className="eyebrow hero-eyebrow"><span className="small-square" /> ISAAC PANDRAJU <span className="eyebrow-divider" /> SENIOR DATA ENGINEER</div></Reveal>
          <Reveal delay={0.08}><h1 id="hero-title">Data, engineered<br />for <span className="hero-accent">real impact<span className="accent-period">.</span><svg viewBox="0 0 480 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 14 C100 1 320 1 476 10" /></svg></span></h1></Reveal>
          <Reveal delay={0.16}><p className="hero-description">I turn complex data into reliable platforms<br className="desktop-break" /> and useful AI. Built with care. Built to scale.</p></Reveal>
          <Reveal delay={0.23} className="hero-actions"><a href="#work" className="button button-primary">Explore my work <ArrowDownRight size={18} /></a><a href="#contact" className="button button-text">Let’s talk <ArrowUpRight size={18} /></a></Reveal>
          <Reveal delay={0.3} className="hero-location"><MapPin size={13} /><span>Hyderabad, India</span><span className="location-dot" /><span>Azure · Databricks · GenAI</span></Reveal>
        </div>
        <Reveal delay={0.18} className="hero-visual">
          <div className="hero-visual-topline"><span><span className="tiny-cross">+</span> FROM RAW DATA TO REAL POSSIBILITIES</span><span>FIG. 01</span></div>
          <PipelineGraphic variant="rag" />
          <div className="hero-visual-caption"><span className="caption-line" /><span>Connected by design. Engineered for purpose.</span></div>
        </Reveal>
        <div className="hero-bottom"><span>COMPLEXITY IN. CLARITY OUT.</span><a href="#work" aria-label="Scroll to selected work"><ArrowDown size={15} /> SCROLL TO EXPLORE</a></div>
      </section>

      <section className="proof-band" aria-label="Experience and credentials">
        <div className="container proof-inner">
          <div className="proof-intro">A strong foundation.<br /><span>A measurable difference.</span></div>
          <div className="proof-item"><strong>4<span>+</span></strong><span>Years in data engineering</span></div>
          <div className="proof-item"><strong>6</strong><span>Professional certifications</span></div>
          <div className="proof-item"><strong>2</strong><span>Production RAG chatbots</span></div>
          <div className="proof-item"><strong>30<span>+</span></strong><span>Engineers mentored</span></div>
        </div>
      </section>

      <section id="work" className="section section-work container">
        <Reveal className="section-heading"><div><div className="eyebrow"><span className="section-number">01 /</span> SELECTED WORK</div><h2>Less complexity.<br /><span className="muted-heading">More possibility.</span></h2></div><p>A few things I’ve built.<br />Real challenges. Thoughtful solutions.</p></Reveal>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal className={`project-card ${index === 0 ? "project-featured" : ""}`} key={project.slug} delay={index === 0 ? 0 : 0.08}>
              <div className={`project-art project-art-${index}`}>
                <div className="project-art-label"><span>{index === 0 ? "GENAI / RAG" : index === 1 ? "ANALYTICS / LAKEHOUSE" : "INGESTION / ETL"}</span><span>0{index + 1}</span></div>
                <PipelineGraphic variant={variants[index]} compact />
              </div>
              <div className="project-info">
                <div className="project-category">{project.category}</div>
                <h3><Link href={`/work/${project.slug}`}>{project.title}<ArrowUpRight size={24} /></Link></h3>
                <p>{project.summary}</p>
                <div className="tag-list">{project.stack.slice(0, 3).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
                <div className="project-bottom"><div className="project-outcome"><strong>{project.outcomes[0].value}</strong><span>{project.outcomes[0].label}</span></div><Link href={`/work/${project.slug}`} className="project-link" aria-label={`Read case study: ${project.title}`}>View case study <ArrowUpRight size={16} /></Link></div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="work-note"><span>Enterprise work. Clients kept confidential.</span><a href={profile.github} target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div>
      </section>

      <section id="experience" className="section section-experience">
        <div className="container experience-layout">
          <Reveal className="experience-intro"><div className="eyebrow"><span className="section-number">02 /</span> THE JOURNEY</div><h2>Built through<br /><span className="muted-heading">experience.</span></h2><p>From tuning Spark workloads to engineering production AI platforms. Always learning. Always building.</p><a href="/Isaac_Pandraju_Data_Engineer.pdf" download className="inline-link">The full story, in my resume <ArrowUpRight size={16} /></a><div className="experience-annotation"><Braces size={30} strokeWidth={1.2} /><span>Good engineering is a practice.<br />Not a destination.</span></div></Reveal>
          <div className="experience-list">
            {experience.map((item, index) => <Reveal className="experience-item" key={item.company} delay={index * 0.08}><div className="timeline-dot" /><div className="experience-period">{item.period}<span>{index === 0 ? "CURRENT" : ""}</span></div><h3>{item.role}</h3><div className="experience-company">{item.company}<span>· {item.location}</span></div><p>{item.summary}</p><ul>{item.highlights.map((highlight) => <li key={highlight}><Check size={14} />{highlight}</li>)}</ul></Reveal>)}
          </div>
        </div>
      </section>

      <section id="expertise" className="section container">
        <Reveal className="section-heading"><div><div className="eyebrow"><span className="section-number">03 /</span> THE TOOLKIT</div><h2>The right tools.<br /><span className="muted-heading">A systems mindset.</span></h2></div><p>From the first byte to the final insight.<br />Built to work together.</p></Reveal>
        <div className="skills-grid">{skillGroups.map((group, index) => { const Icon = skillIcons[index % skillIcons.length]; return <Reveal className="skill-group" key={group.title} delay={(index % 3) * 0.06}><div className="skill-icon"><Icon size={22} strokeWidth={1.4} /></div><h3>{group.title}</h3><div className="skill-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></Reveal>; })}</div>
        <div className="stack-note"><Boxes size={17} /><span>Azure at the core. Open to what’s next.</span><span className="stack-note-line" /></div>
      </section>

      <section className="section section-credentials">
        <div className="container">
          <Reveal className="section-heading"><div><div className="eyebrow"><span className="section-number">04 /</span> ALWAYS LEARNING</div><h2>Expertise, <span className="muted-heading">validated.</span></h2></div><p>Microsoft certified.<br />Five times Databricks certified.</p></Reveal>
          <div className="certification-grid">{certifications.map((cert, index) => <Reveal className="certification" key={cert.name} delay={(index % 2) * 0.06}><div className={`certification-icon ${cert.issuer.toLowerCase().includes("microsoft") ? "cert-microsoft" : ""}`}>{cert.issuer.toLowerCase().includes("microsoft") ? <span className="microsoft-mark"><i /><i /><i /><i /></span> : <Layers3 size={25} strokeWidth={1.5} />}</div><div><span className="certification-issuer">{cert.issuer}</span><h3>{cert.name.replace("Microsoft Certified: ", "").replace("Databricks Certified ", "")}</h3></div><Award size={19} className="certification-check" /></Reveal>)}</div>
        </div>
      </section>

      <section className="section container section-beyond">
        <Reveal className="section-heading"><div><div className="eyebrow"><span className="section-number">05 /</span> BEYOND THE PIPELINE</div><h2>Better platforms.<br /><span className="muted-heading">Stronger teams.</span></h2></div><p>Sharing what I know.<br />Growing what we can do.</p></Reveal>
        <div className="leadership-grid">{leadership.map((item, index) => <Reveal key={item.title} className="leadership-item" delay={index * 0.06}><span className="leadership-icon">{index === 0 ? <Users size={22} /> : index === 1 ? <Award size={22} /> : <Code2 size={22} />}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div>
        <Reveal className="education-row"><div className="education-label"><GraduationCap size={25} strokeWidth={1.5} /><span>THE FOUNDATION</span></div><div><h3>{education.degree}</h3><p>{education.institution} <span>· {education.period}</span></p></div><div className="education-grade"><strong>{education.cgpa}</strong><span>CGPA</span></div></Reveal>
      </section>
    </main>
  );
}
