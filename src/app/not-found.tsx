import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="container not-found"><span className="eyebrow">404 / A MISSING CONNECTION</span><h1>This path doesn’t<br />lead to a project.</h1><p>Let’s get you back to the work.</p><Link href="/#work" className="button button-primary"><ArrowLeft size={17} /> Explore selected work</Link></main>;
}
