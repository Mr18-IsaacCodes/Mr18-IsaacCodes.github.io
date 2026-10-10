import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/reveal";
import { profile } from "@/content/portfolio";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <Reveal className="contact-grid">
          <div>
            <div className="eyebrow"><span className="small-square" /> LET’S CONNECT</div>
            <h2>Good things start<br />with a <span className="accent-text">conversation.</span></h2>
          </div>
          <div className="contact-detail">
            <p>Have a data challenge, an interesting opportunity, or just a good question? I’d love to hear about it.</p>
            <div className="email-row">
              <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a>
              <CopyEmail email={profile.email} />
            </div>
            <div className="social-links">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>
              <a href={`mailto:${profile.email}`}><Mail size={16} /> Email <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </Reveal>
        <div className="footer-bottom">
          <a href="/" className="footer-signature">isaac<span>.</span></a>
          <p>Thoughtfully engineered. Just like the data.</p>
          <span>© {new Date().getFullYear()} Isaac Pandraju</span>
        </div>
      </div>
    </footer>
  );
}
