export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  period: string;
  summary: string;
  description: string;
  role: string;
  stack: string[];
  outcomes: { value: string; label: string }[];
  challenge: string;
  highlights: { title: string; body: string }[];
  architecture: { title: string; body: string }[];
};

export const profile = {
  name: "Isaac Pandraju",
  role: "Senior Data Engineer",
  location: "Hyderabad, India",
  email: "pandrajuisaac@outlook.com",
  linkedin: "https://www.linkedin.com/in/isaacpandraju",
  github: "https://github.com/Mr18-IsaacCodes",
  resume: "/Isaac_Pandraju_Data_Engineer.pdf",
  intro:
    "I turn complex data into dependable platforms. From Azure lakehouses to production GenAI, I build the foundations that make better answers possible.",
} as const;

export const projects: Project[] = [
  {
    slug: "industrial-rag",
    number: "01",
    title: "From manuals to answers",
    category: "GENAI / RAG PLATFORM",
    period: "Mar 2025 — Present",
    summary:
      "Turning industrial equipment manuals into searchable knowledge, with answers that point back to the exact PDF page.",
    description:
      "A config-driven data platform for an industrial equipment manufacturer in mining and construction. It powers two production RAG chatbots across six document divisions, helping field technicians ask natural-language questions and verify answers against the source material.",
    role: "Platform architecture & data engineering",
    stack: [
      "Azure Databricks",
      "PySpark",
      "Delta Lake",
      "Azure OpenAI",
      "Azure AI Search",
      "Unity Catalog",
      "Azure Document Intelligence",
      "ADLS Gen2",
      "Cosmos DB",
      "Azure DevOps",
      "Python",
      "SQL",
    ],
    outcomes: [
      { value: "2", label: "production RAG chatbots" },
      { value: "6", label: "document divisions supported" },
      { value: "800 MB+", label: "ZIP packages processed in parallel" },
    ],
    challenge:
      "Equipment knowledge arrived in large ZIP packages containing HTML, XML, and PDFs. A duplicated legacy codebase repeated transformations three to five times per division, while single-driver extraction constrained processing. The platform needed a reusable foundation and a reliable connection between retrieved content and its original PDF page.",
    highlights: [
      {
        title: "One platform, configured by division",
        body: "Re-engineered copied notebooks into a single versioned Python wheel. YAML descriptors define table names, composite keys, feature flags, and index targets, reducing new-division onboarding from a notebook rewrite to a configuration file.",
      },
      {
        title: "Distributed document processing",
        body: "Used PySpark mapInPandas to distribute ZIP extraction and BeautifulSoup HTML crawls across executors. Bronze, Silver, and Gold pipelines handle parsing, metadata, entity mapping, token-aware chunking, embeddings, and indexing.",
      },
      {
        title: "Answers with a traceable source",
        body: "Designed an Exact → Suffix → Fuzzy → Chapter page-mapping waterfall that joins extracted HTML to PDF table-of-contents bookmarks, achieving near-complete content-to-source-page mapping for verifiable citations.",
      },
      {
        title: "Retrieval built for production",
        body: "Generated 3,072-dimensional text-embedding-3-large embeddings with batching and retry/backoff. Built HNSW indexes in Azure AI Search with idempotent upsert-first pushes in 500-document batches across 16 partitions.",
      },
      {
        title: "Incremental and recoverable by design",
        body: "Classified source packages as new, updated, or unchanged, tracked progress in Delta audit tables, and enabled per-entity recovery. Fourteen-task Databricks workflows coordinate fan-in dependencies, retries, and repair runs.",
      },
      {
        title: "A dependable path to deployment",
        body: "Implemented Azure DevOps CI/CD with pytest, bundle validation, development deployment, and approval-gated test deployment. Added Key Vault-backed secrets, RBAC, structured logging, and a Cosmos DB-to-Delta feedback pipeline for chatbot interactions and ratings.",
      },
    ],
    architecture: [
      {
        title: "Ingest & extract",
        body: "Land source ZIP packages and distribute HTML, XML, and PDF extraction across Spark executors.",
      },
      {
        title: "Refine & connect",
        body: "Use Delta Lake Bronze, Silver, and Gold layers to map entities, preserve metadata, and connect content to PDF pages.",
      },
      {
        title: "Embed & index",
        body: "Create token-aware chunks, generate Azure OpenAI embeddings, and publish HNSW vector indexes to Azure AI Search.",
      },
      {
        title: "Retrieve & improve",
        body: "Serve two RAG chatbots with source citations and ingest interaction feedback from Cosmos DB into Delta.",
      },
    ],
  },
  {
    slug: "food-beverage-lakehouse",
    number: "02",
    title: "A clearer picture of performance",
    category: "ANALYTICS / LAKEHOUSE",
    period: "Apr 2024 — Feb 2025",
    summary:
      "A governed lakehouse connecting sales, customers, promotions, and model outputs to business decisions.",
    description:
      "A Medallion data platform for a food and beverage client, bringing diverse operational and analytical datasets into a clean, centrally governed foundation. Curated dimensional datasets help stakeholders understand promotion effectiveness, customer behavior, and revenue performance.",
    role: "Data engineering & dimensional modeling",
    stack: [
      "Azure Databricks",
      "PySpark",
      "SQL",
      "Delta Lake",
      "Databricks Workflows",
      "Azure Data Factory",
      "Azure DevOps",
      "Dimensional Modeling",
    ],
    outcomes: [
      { value: "50%", label: "lower deployment time & operational overhead" },
      { value: "Gold", label: "curated dimensional datasets" },
      { value: "Near real-time", label: "business performance tracking" },
    ],
    challenge:
      "Sales, customer, promotion, and ML model outputs needed to work together as a consistent analytical foundation. Business stakeholders needed governed datasets for tracking campaigns and revenue, alongside a repeatable way to deploy and operate the pipelines that supplied them.",
    highlights: [
      {
        title: "Diverse sources, a common foundation",
        body: "Ingested and integrated sales, customer, promotion, and machine-learning outputs through a Medallion architecture to deliver clean, scalable, centrally governed data for analytics.",
      },
      {
        title: "Modeled around business questions",
        body: "Built curated Gold-layer dimensional datasets for promotional effectiveness, customer trends, and revenue performance, enabling stakeholders to track these measures in near real-time.",
      },
      {
        title: "Repeatable delivery",
        body: "Implemented Azure DevOps CI/CD workflows to deploy, monitor, and version-control data pipelines, reducing deployment time and operational overhead by 50%.",
      },
      {
        title: "Insights that informed campaigns",
        body: "Delivered promotional-effectiveness insights that enabled targeted campaigns and measurable uplift in tracked sales performance.",
      },
    ],
    architecture: [
      {
        title: "Integrate source data",
        body: "Bring sales, customer, promotion, and ML outputs into the data platform.",
      },
      {
        title: "Refine through Medallion layers",
        body: "Use PySpark, Databricks, and Delta Lake to transform data into clean, centrally governed datasets.",
      },
      {
        title: "Model the Gold layer",
        body: "Curate dimensional datasets around customer trends, promotion effectiveness, and revenue performance.",
      },
      {
        title: "Enable business analytics",
        body: "Supply near real-time performance tracking and campaign insights, supported by version-controlled deployment workflows.",
      },
    ],
  },
  {
    slug: "aviation-etl",
    number: "03",
    title: "Built for data at altitude",
    category: "INGESTION / ETL",
    period: "Jul 2023 — Mar 2024",
    summary:
      "Reliable, scalable pipelines that bring fixed-width files and nested JSON into query-ready Delta tables.",
    description:
      "An Azure-based ETL platform for an aviation client, standardizing complex source data through a Medallion architecture. Explicit source schemas and optimized transformations improve reliability while making downstream datasets easier to query.",
    role: "ETL pipeline development & transformation",
    stack: [
      "Azure Data Factory",
      "Azure Databricks",
      "PySpark",
      "Python",
      "Delta Lake",
      "ADLS Gen2",
    ],
    outcomes: [
      { value: "30%", label: "faster batch processing" },
      { value: "Explicit", label: "schemas for fixed-width source files" },
      { value: "Delta", label: "query-efficient analytical tables" },
    ],
    challenge:
      "Fixed-width files and complex nested JSON required consistent interpretation before they could support reliable analytics. The platform needed scalable ingestion and standardized transformations while reducing the time required to process each batch.",
    highlights: [
      {
        title: "A faster batch pipeline",
        body: "Built scalable ETL pipelines in Azure Data Factory, reducing batch processing time by 30%.",
      },
      {
        title: "Structure at the point of ingestion",
        body: "Engineered explicit schemas for fixed-width source files, improving ETL reliability and downstream data quality.",
      },
      {
        title: "Consistent transformation layers",
        body: "Developed a Medallion architecture on Azure Databricks and Delta Lake to standardize and streamline data transformations.",
      },
      {
        title: "Complex payloads, accessible data",
        body: "Used PySpark to transform nested JSON payloads into optimized, query-efficient Delta tables.",
      },
    ],
    architecture: [
      {
        title: "Ingest source files",
        body: "Use Azure Data Factory pipelines to bring fixed-width files and JSON data into the Azure platform.",
      },
      {
        title: "Apply explicit schemas",
        body: "Define reliable source structure and interpret complex payloads with Python and PySpark.",
      },
      {
        title: "Standardize transformations",
        body: "Process data through a Medallion architecture on Databricks and Delta Lake.",
      },
      {
        title: "Publish query-ready tables",
        body: "Deliver optimized Delta tables for downstream use with faster batch processing.",
      },
    ],
  },
];

export const experience = [
  {
    company: "Celebal Technologies",
    role: "Senior Software Engineer",
    period: "Sep 2022 — Present",
    location: "Hyderabad, India",
    summary:
      "Building production data platforms across industrial manufacturing, food & beverage, aviation, and FMCG.",
    highlights: [
      "Architected a config-driven platform powering two production RAG chatbots across six document divisions.",
      "Delivered Medallion lakehouses, dimensional models, and CI/CD workflows on Azure.",
      "Built reusable ingestion frameworks and mentored incoming engineers through training and onboarding.",
    ],
  },
  {
    company: "Futurense Technologies",
    role: "Data Engineer",
    period: "Nov 2021 — Sep 2022",
    location: "Bangalore, India",
    summary:
      "Optimizing Azure Databricks and Delta Lake pipelines for financial-sector analytics.",
    highlights: [
      "Reduced pipeline runtimes by 40% through Azure Databricks notebook optimization.",
      "Improved query performance by 30% with Delta table Z-Ordering.",
      "Tuned Spark configurations, partitioning strategies, and caching to reduce cluster costs and job latency.",
    ],
  },
] as const;

export const skillGroups = [
  {
    title: "Languages & compute",
    skills: ["Python", "SQL", "PySpark", "Apache Spark", "Structured Streaming", "Linux Shell"],
  },
  {
    title: "Data architecture",
    skills: ["Medallion Architecture", "Dimensional Modeling", "ETL / ELT", "Incremental & CDC Loads", "Data Quality", "Data Governance"],
  },
  {
    title: "Cloud platforms",
    skills: ["Azure Databricks", "Azure Data Factory", "ADLS Gen2", "Azure Synapse", "Azure Event Hubs", "Azure Key Vault"],
  },
  {
    title: "Databases & storage",
    skills: ["Delta Lake", "PostgreSQL", "MySQL", "Azure Cosmos DB", "Azure Blob Storage", "Unity Catalog"],
  },
  {
    title: "GenAI & retrieval",
    skills: ["RAG Pipelines", "Azure OpenAI", "Azure AI Search", "Vector Search / HNSW", "Embeddings", "Token-Aware Chunking", "Citation Mapping", "Document Intelligence"],
  },
  {
    title: "Delivery & reliability",
    skills: ["Azure DevOps", "CI / CD", "Databricks Asset Bundles", "Databricks Workflows", "Git", "pytest", "Python Packaging", "Azure Key Vault"],
  },
] as const;

export const certifications = [
  {
    name: "Azure Data Engineer Associate",
    issuer: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/users/isaacpandraju-7646/credentials/9e0f8b665084b3f6",
  },
  {
    name: "Databricks Credentials Overview",
    issuer: "Databricks",
    url: "https://credentials.databricks.com/3dfd475e-d285-49be-a81a-d24ecb1c199a",
  },
  {
    name: "Data Engineer Associate",
    issuer: "Databricks",
    url: "https://credentials.databricks.com/d6497558-50d6-4426-9f3b-f90f2499e07e#acc.6PpXuASL",
  },
  {
    name: "Associate Developer for Apache Spark 3.0",
    issuer: "Databricks",
    url: "https://credentials.databricks.com/4dc9d727-c689-4085-8cec-f7b4931ea476#acc.HU6IBe1z",
  },
  {
    name: "Data Analyst Associate",
    issuer: "Databricks",
    url: "https://credentials.databricks.com/6a0e28ef-07a1-4f01-ab1f-254ef2b8e979#acc.EKIhQ0sp",
  },
  {
    name: "Generative AI Engineer Associate",
    issuer: "Databricks",
    url: "https://credentials.databricks.com/ab4d5f17-7c65-4d39-ad66-32b2e8505013#acc.v8eQtrGy",
  },
  {
    name: "Generative AI Engineer Associate — Badge View",
    issuer: "Databricks",
    url: "https://credentials.databricks.com/ab4d5f17-7c65-4d39-ad66-32b2e8505013#acc.nF2N1Mrl",
  },
] as const;

export const education = {
  institution: "NRI Institute of Technology",
  degree: "B.Tech., Electronics and Communication Engineering",
  period: "Jun 2018 — Apr 2022",
  cgpa: "9.2 / 10",
} as const;

export const leadership = [
  {
    title: "30+ engineers. One strong start.",
    body: "Led the intern-to-FTE pipeline for 30+ candidates, from technical training and mentoring to interview evaluation and full-time onboarding.",
  },
  {
    title: "Knowledge, passed forward.",
    body: "Designed and delivered Azure Databricks, PySpark, and ETL training to strengthen onboarding readiness and code quality.",
  },
  {
    title: "Recognized for raising the bar.",
    body: "Received a Special Appreciation Award for Databricks Performance Tuning and Optimization training delivered through the Catalyst program.",
  },
] as const;
