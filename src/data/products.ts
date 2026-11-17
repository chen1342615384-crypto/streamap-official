import { asset } from "../lib/asset";

export type ProductSlug =
  | "p4-set"
  | "c40p-set"
  | "p2-set"
  | "pixel-platform"
  | "asset-management-platform";

export type SpecRow = { label: string; value: string };

export type SpecBlock = {
  title: string;
  description: string;
  rows: SpecRow[];
};

export type Product = {
  slug: ProductSlug;
  name: string;
  headline: string;
  kitLine: string;
  summary: string;
  heroImage: string;
  heroStats: SpecRow[];
  specs: SpecBlock[];
  ctaTitle: string;
  ctaDesc: string;
};

const sharedSpecDesc =
  "Core hardware parameters are displayed here to present imaging performance at a glance, helping you quickly select the right model and facilitate technical communication.";

const cameraRows: SpecRow[] = [
  { label: "Total Pixels", value: "103MP" },
  { label: "Resolution", value: "11276(H)*9200(V)" },
  { label: "Sensor Size", value: "36.1*29.4mm" },
  { label: "Focal Length", value: "75 / 120mm" },
  { label: "Shutter Speed", value: "1/16000" },
  { label: "Sensor Type", value: "Global Shutter" },
  { label: "Digital Zoom", value: "1x 4x 8x 16x 32x 64x" },
  { label: "Storage Capacity", value: "256GB" },
  { label: "Parameter Setting", value: "Remote Controller / Bluetooth / Serial Port" },
];

const p4HeroStats: SpecRow[] = [
  { label: "Sensor Size", value: "36.1*29.4mm" },
  { label: "Focal Length", value: "75 / 120mm" },
  { label: "Total Pixels", value: "103MP" },
  { label: "Resolution", value: "11276(H)*9200(V)" },
];

const defaultCta = {
  ctaTitle: "Get Product Selection and Platform Adaptation Advice",
  ctaDesc:
    "Contact Streamap to learn about product configuration, delivery and project application information.",
};

function cameraSpecs(prefix: string): SpecBlock[] {
  return [
    {
      title: `${prefix}\nTechnical Specifications`,
      description: sharedSpecDesc,
      rows: cameraRows,
    },
  ];
}

export const products: Product[] = [
  {
    slug: "p4-set",
    name: "P4 Set",
    headline: "P4 Set",
    kitLine:
      "1 × front camera (P4C), 1 × rear camera (P4H), 1 × MDVR (PBoxPro), 1 × GNSS (M2)",
    summary:
      "Medium format global shutter inspection camera with 103 MP for infrastructure surface defect detection.",
    heroImage: asset("images/assets/products/o6V4Ov.png"),
    heroStats: p4HeroStats,
    specs: [
      {
        title: "P4C\nTechnical Specifications",
        description: sharedSpecDesc,
        rows: cameraRows,
      },
      {
        title: "P4H\nTechnical Specifications",
        description: sharedSpecDesc,
        rows: cameraRows,
      },
      {
        title: "PBoxPro\nTechnical Specifications",
        description: sharedSpecDesc,
        rows: cameraRows,
      },
    ],
    ...defaultCta,
  },
  {
    slug: "c40p-set",
    name: "C40P Set",
    headline: "C40P Set",
    kitLine: "Compact multi-camera inspection set for city and roadside capture.",
    summary:
      "High-efficiency imaging package engineered for continuous roadside and urban asset surveys.",
    heroImage: asset("images/assets/products/o6V4Ov.png"),
    heroStats: p4HeroStats,
    specs: cameraSpecs("C40P"),
    ...defaultCta,
  },
  {
    slug: "p2-set",
    name: "P2 Set",
    headline: "P2 Set",
    kitLine: "Lightweight dual-camera set for rapid pavement assessment.",
    summary:
      "Portable inspection kit balancing resolution, stability, and deployment speed.",
    heroImage: asset("images/assets/products/o6V4Ov.png"),
    heroStats: p4HeroStats,
    specs: cameraSpecs("P2"),
    ...defaultCta,
  },
  {
    slug: "pixel-platform",
    name: "Pixel Platform",
    headline: "Pixel Platform",
    kitLine: "Cloud + edge platform for detection, grading, and workflow orchestration.",
    summary:
      "Turn raw inspection imagery into actionable maintenance decisions at national scale.",
    heroImage: asset("images/assets/products/o6V4Ov.png"),
    heroStats: [
      { label: "Models", value: "380+" },
      { label: "Coverage", value: "1.8M+ km" },
      { label: "Countries", value: "28+" },
      { label: "Latency", value: "Near-real-time" },
    ],
    specs: [
      {
        title: "Pixel Platform\nTechnical Specifications",
        description: sharedSpecDesc,
        rows: [
          { label: "Deployment", value: "Cloud / On-prem / Hybrid" },
          { label: "Ingestion", value: "Video · Image · GNSS" },
          { label: "Detection Models", value: "380+" },
          { label: "Export", value: "GIS · CSV · API" },
          { label: "Auth", value: "SSO / RBAC" },
          { label: "Scale", value: "Nationwide fleet" },
        ],
      },
    ],
    ...defaultCta,
  },
  {
    slug: "asset-management-platform",
    name: "Asset Management Platform",
    headline: "Asset Management Platform",
    kitLine: "Lifecycle management for roads, facilities, and urban assets.",
    summary:
      "Connect inspection results to maintenance planning, budgeting, and field execution.",
    heroImage: asset("images/assets/products/o6V4Ov.png"),
    heroStats: [
      { label: "Assets", value: "120+" },
      { label: "Workflows", value: "End-to-end" },
      { label: "Integrations", value: "GIS / ERP" },
      { label: "Reporting", value: "Live dashboards" },
    ],
    specs: [
      {
        title: "Asset Management\nTechnical Specifications",
        description: sharedSpecDesc,
        rows: [
          { label: "Asset Types", value: "Pavement · Facility · City" },
          { label: "Planning", value: "Priority · Budget · SLA" },
          { label: "Field Ops", value: "Work orders · Mobile" },
          { label: "Analytics", value: "Condition · Risk · Cost" },
          { label: "Integrations", value: "GIS · ERP · API" },
          { label: "Access", value: "Web · Role-based" },
        ],
      },
    ],
    ...defaultCta,
  },
];

export const productBySlug = Object.fromEntries(products.map((p) => [p.slug, p])) as Record<
  ProductSlug,
  Product
>;

export function productPath(slug: ProductSlug | string) {
  return `/products/${slug}`;
}

export const productMenu = {
  devices: [
    { label: "P4 Set", slug: "p4-set" as const },
    { label: "C40P Set", slug: "c40p-set" as const },
    { label: "P2 Set", slug: "p2-set" as const },
  ],
  platforms: [
    { label: "Pixel Platform", slug: "pixel-platform" as const },
    { label: "Asset Management Platform", slug: "asset-management-platform" as const },
  ],
};
