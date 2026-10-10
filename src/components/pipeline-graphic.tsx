import type { ReactNode } from "react";
import "./pipeline-graphic.css";

type Variant = "rag" | "lakehouse" | "aviation";

type PipelineGraphicProps = {
  variant: Variant;
  compact?: boolean;
};

const descriptions: Record<Variant, string> = {
  rag: "Documents in Azure Data Lake are parsed and chunked with Databricks and PySpark, embedded with Azure OpenAI, and indexed in Azure AI Search to support answers with PDF citations.",
  lakehouse: "Sales, customer and promotion data flows through Bronze, Silver and Gold layers into governed dimensional datasets for analytics.",
  aviation: "Fixed-width files and nested JSON are ingested with Azure Data Factory, transformed using PySpark, and stored in Delta tables.",
};

function Symbol({ type, x, y, size = 24 }: { type: "document" | "layers" | "search" | "database" | "code" | "chart"; x: number; y: number; size?: number }) {
  const shapes: Record<typeof type, ReactNode> = {
    document: <><path d="M6 3h8l4 4v14H6zM14 3v5h4" /><path d="M9 12h6M9 16h6" /></>,
    layers: <><path d="m2 7 10-5 10 5-10 5zM2 12l10 5 10-5M2 17l10 5 10-5" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M8 10.5h5M10.5 8v5" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
    code: <><path d="m7 6-5 6 5 6M17 6l5 6-5 6M14 3l-4 18" /></>,
    chart: <><path d="M3 3v18h19M7 15v3M12 10v8M17 5v13" /></>,
  };
  return <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="pg-symbol">{shapes[type]}</svg>;
}

function Connector({ d, delay = 0 }: { d: string; delay?: number }) {
  return <g><path className="pg-connection" d={d} /><path className="pg-connection-flow" d={d} pathLength="1" style={{ animationDelay: `${delay}s` }} /></g>;
}

function Frame({ x, y, width, height, children, featured = false }: { x: number; y: number; width: number; height: number; children?: ReactNode; featured?: boolean }) {
  return <g className={featured ? "pg-node pg-node--featured" : "pg-node"}><rect x={x} y={y} width={width} height={height} rx="12" className="pg-node-background" />{featured && <path d={`M ${x + 16} ${y} H ${x + width - 16}`} className="pg-node-highlight" />}{children}</g>;
}

function RagDiagram() {
  return <>
    <Connector d="M151 176H197" />
    <Connector d="M409 174H433V130H458" delay={0.3} />
    <Connector d="M530 176V218" delay={0.6} />
    <circle cx="173" cy="176" r="3" className="pg-port" />
    <circle cx="433" cy="151" r="3" className="pg-port" />
    <text x="22" y="77" className="pg-kicker">01 / INGEST</text>
    <Frame x={18} y={99} width={133} height={154}>
      <rect x="55" y="116" width="43" height="51" rx="5" className="pg-document-back" transform="rotate(9 76 141)" />
      <rect x="46" y="116" width="43" height="51" rx="5" className="pg-document-front" transform="rotate(-6 67 141)" />
      <Symbol type="document" x={51} y={124} size={30} />
      <text x="35" y="197" className="pg-label">Documents</text>
      <text x="35" y="220" className="pg-small">HTML · XML · PDF</text>
      <text x="35" y="237" className="pg-micro">AZURE DATA LAKE</text>
    </Frame>
    <text x="201" y="42" className="pg-kicker">02 / TRANSFORM</text>
    <Frame x={197} y={62} width={212} height={239} featured>
      <Symbol type="layers" x={218} y={81} size={28} />
      <text x="259" y="101" className="pg-label pg-label--strong">Databricks</text>
      <text x="218" y="134" className="pg-small">Document processing</text>
      <path d="M218 151H388" className="pg-divider" />
      <text x="218" y="177" className="pg-step">01</text><text x="246" y="177" className="pg-small pg-small--bright">Parse &amp; normalize</text>
      <text x="218" y="202" className="pg-step">02</text><text x="246" y="202" className="pg-small pg-small--bright">Chunk &amp; embed</text>
      <rect x="216" y="222" width="53" height="27" rx="4" className="pg-layer pg-layer--bronze" />
      <rect x="277" y="222" width="53" height="27" rx="4" className="pg-layer pg-layer--silver" />
      <rect x="338" y="222" width="53" height="27" rx="4" className="pg-layer pg-layer--gold" />
      <text x="242.5" y="240" textAnchor="middle" className="pg-layer-label">Bronze</text>
      <text x="303.5" y="240" textAnchor="middle" className="pg-layer-label">Silver</text>
      <text x="364.5" y="240" textAnchor="middle" className="pg-layer-label">Gold</text>
      <text x="218" y="279" className="pg-micro">PYSPARK + AZURE OPENAI</text>
    </Frame>
    <text x="461" y="58" className="pg-kicker">03 / RETRIEVE</text>
    <Frame x={458} y={80} width={144} height={96}>
      <Symbol type="search" x={475} y={95} size={22} />
      <text x="475" y="140" className="pg-label">Azure AI Search</text>
      <text x="475" y="161" className="pg-small">Vector index</text>
    </Frame>
    <Frame x={458} y={218} width={144} height={109}>
      <text x="474" y="246" className="pg-label">Grounded answers</text>
      <path d="M475 263h107M475 273h84M475 283h94" className="pg-answer-lines" />
      <rect x="474" y="295" width="106" height="19" rx="4" className="pg-citation-bg" />
      <text x="483" y="308" className="pg-citation">PDF citations ↗</text>
    </Frame>
    <path d="M25 294v20h135" className="pg-annotation-line" />
    <text x="24" y="335" className="pg-micro">FROM DOCUMENTS TO CONTEXT</text>
  </>;
}

function LakehouseDiagram() {
  return <>
    <text x="26" y="62" className="pg-kicker">01 / BUSINESS DATA</text>
    <text x="223" y="62" className="pg-kicker">02 / MEDALLION ARCHITECTURE</text>
    <Connector d="M151 118H176V190H217M151 190H217M151 262H176V190" />
    <Connector d="M295 191H320M398 191H423M501 191H552V272" delay={0.35} />
    {([['Sales', 82], ['Customers', 154], ['Promotions', 226]] as const).map(([label, y]) => <Frame key={label} x={20} y={y} width={131} height={55}><Symbol type="database" x={35} y={y + 15} size={23} /><text x="69" y={y + 33} className="pg-label">{label}</text></Frame>)}
    <rect x="203" y="80" width="316" height="179" rx="16" className="pg-zone" />
    <text x="225" y="111" className="pg-micro">DATABRICKS LAKEHOUSE</text>
    {([{ x: 217, name: 'Bronze', detail: 'Raw', color: 'bronze' }, { x: 320, name: 'Silver', detail: 'Refined', color: 'silver' }, { x: 423, name: 'Gold', detail: 'Dimensional', color: 'gold' }] as const).map(layer => <g key={layer.name}><rect x={layer.x} y="136" width="78" height="94" rx="9" className={`pg-layer pg-layer--${layer.color}`} /><Symbol type="layers" x={layer.x + 27} y={150} size={24} /><text x={layer.x + 39} y="197" textAnchor="middle" className="pg-label">{layer.name}</text><text x={layer.x + 39} y="216" textAnchor="middle" className="pg-layer-label">{layer.detail}</text></g>)}
    <Frame x={373} y={282} width={215} height={61} featured><Symbol type="chart" x={391} y={299} size={25} /><text x="430" y="308" className="pg-label">Governed analytics</text><text x="430" y="329" className="pg-small">Business-ready datasets</text></Frame>
    <path d="M26 319h172" className="pg-annotation-line" /><text x="26" y="340" className="pg-micro">QUALITY AT EVERY LAYER</text>
  </>;
}

function AviationDiagram() {
  return <>
    <text x="24" y="69" className="pg-kicker">01 / SOURCE FILES</text>
    <text x="221" y="69" className="pg-kicker">02 / PROCESSING</text>
    <text x="471" y="69" className="pg-kicker">03 / STORAGE</text>
    <Connector d="M158 137H181V190H217M158 242H181V190" />
    <Connector d="M411 189H463" delay={0.4} />
    <Frame x={19} y={91} width={139} height={94}><Symbol type="document" x={35} y={106} size={24} /><text x="34" y="150" className="pg-label">Fixed-width files</text><text x="34" y="171" className="pg-micro">STRUCTURED RECORDS</text></Frame>
    <Frame x={19} y={216} width={139} height={95}><Symbol type="code" x={35} y={231} size={24} /><text x="34" y="276" className="pg-label">Nested JSON</text><text x="34" y="295" className="pg-micro">COMPLEX HIERARCHIES</text></Frame>
    <Frame x={217} y={91} width={194} height={220} featured><Symbol type="layers" x={237} y={111} size={25} /><text x="237" y="162" className="pg-label pg-label--strong">Azure Data Factory</text><text x="237" y="183" className="pg-small">Ingestion &amp; orchestration</text><path d="M237 202H391" className="pg-divider" /><Symbol type="code" x={237} y={218} size={23} /><text x="274" y="236" className="pg-label">PySpark</text><text x="237" y="265" className="pg-small">Parse · flatten · transform</text><text x="237" y="291" className="pg-micro">DISTRIBUTED PROCESSING</text></Frame>
    <Frame x={463} y={129} width={138} height={145}><Symbol type="database" x={483} y={149} size={30} /><text x="483" y="208" className="pg-label pg-label--strong">Delta tables</text><text x="483" y="232" className="pg-small">Analytics-ready</text><text x="483" y="251" className="pg-small">data</text></Frame>
    <path d="M25 336h385" className="pg-annotation-line" /><text x="25" y="356" className="pg-micro">COMPLEX FORMATS. CONSISTENT DATA.</text>
  </>;
}

function MobileDiagram({ variant }: { variant: Variant }) {
  const steps: Record<Variant, { label: string; detail: string; type: "document" | "layers" | "search" | "database" | "chart" }[]> = {
    rag: [{ label: "Source documents", detail: "HTML · XML · PDF in Azure Data Lake", type: "document" }, { label: "Databricks + Azure OpenAI", detail: "Parse · chunk · embed", type: "layers" }, { label: "Azure AI Search", detail: "Grounded answers with PDF citations", type: "search" }],
    lakehouse: [{ label: "Business data", detail: "Sales · customers · promotions", type: "database" }, { label: "Medallion architecture", detail: "Bronze → Silver → Gold", type: "layers" }, { label: "Governed analytics", detail: "Dimensional, business-ready datasets", type: "chart" }],
    aviation: [{ label: "Source files", detail: "Fixed-width records · nested JSON", type: "document" }, { label: "Azure Data Factory + PySpark", detail: "Ingest · parse · flatten · transform", type: "layers" }, { label: "Delta tables", detail: "Analytics-ready data", type: "database" }],
  };
  return <><Connector d="M160 98V128M160 210V240" />{steps[variant].map((step, index) => <Frame key={step.label} x={15} y={16 + index * 112} width={290} height={82} featured={index === 1}><Symbol type={step.type} x={31} y={35 + index * 112} size={23} /><text x="67" y={48 + index * 112} className="pg-mobile-title">{step.label}</text><text x="67" y={71 + index * 112} className="pg-mobile-detail">{step.detail}</text></Frame>)}</>;
}

export function PipelineGraphic({ variant, compact = false }: PipelineGraphicProps) {
  const labels: Record<Variant, string> = { rag: "Document → intelligence", lakehouse: "Data → decisions", aviation: "Ingest → transform → serve" };
  return <div className={`pipeline-graphic${compact ? " pipeline-graphic--compact" : ""}`} role="img" aria-label={descriptions[variant]}>
    <div className="pg-topline" aria-hidden="true"><span className="pg-top-label"><span className="pg-cross">+</span> SYSTEM ARCHITECTURE</span><span className="pg-top-index">{variant === "rag" ? "01" : variant === "lakehouse" ? "02" : "03"} / 03</span></div>
    <svg className="pg-desktop-diagram" viewBox="0 0 620 380" fill="none" aria-hidden="true">{variant === "rag" ? <RagDiagram /> : variant === "lakehouse" ? <LakehouseDiagram /> : <AviationDiagram />}</svg>
    <svg className="pg-mobile-diagram" viewBox="0 0 320 336" fill="none" aria-hidden="true"><MobileDiagram variant={variant} /></svg>
    <div className="pg-bottomline" aria-hidden="true"><span><i />{labels[variant]}</span><span className="pg-footer-tag">AZURE ECOSYSTEM</span></div>
  </div>;
}
