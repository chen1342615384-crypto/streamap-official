import { asset } from "../lib/asset";

export type SolutionSlug =
  | "road-pavement"
  | "roadside-facility"
  | "city-environment"
  | "work-site-safety"
  | "infrastructure-asset-management";

export type Solution = {
  slug: SolutionSlug;
  title: string;
  heroDesc: string;
  assetsHeadline: string;
  assetsDesc: string;
  assetImages: string[];
  features: {
    title: string;
    desc: string;
    media: string;
    mediaLeft: boolean;
  }[];
};

const featureMedia = asset("images/assets/solutions/CyllS.png");

const defaultFeatures = (mediaLeftFirst = true) =>
  [
    {
      title: "Get the full story with HD video and audio",
      desc: "Gain 360° visibility with up to four 1080p HD auxiliary camera feeds—eight with Dual AI Multicam—supplementing the dash cam. Protect drivers with live in-cab monitor feed and configurable triggers. Ensure every detail is captured with optional audio recording.",
      media: featureMedia,
      mediaLeft: mediaLeftFirst,
    },
    {
      title: "Get the full story with HD video and audio",
      desc: "Gain 360° visibility with up to four 1080p HD auxiliary camera feeds—eight with Dual AI Multicam—supplementing the dash cam. Protect drivers with live in-cab monitor feed and configurable triggers. Ensure every detail is captured with optional audio recording.",
      media: featureMedia,
      mediaLeft: !mediaLeftFirst,
    },
    {
      title: "Get the full story with HD video and audio",
      desc: "Gain 360° visibility with up to four 1080p HD auxiliary camera feeds—eight with Dual AI Multicam—supplementing the dash cam. Protect drivers with live in-cab monitor feed and configurable triggers. Ensure every detail is captured with optional audio recording.",
      media: featureMedia,
      mediaLeft: mediaLeftFirst,
    },
    {
      title: "Get the full story with HD video and audio",
      desc: "Gain 360° visibility with up to four 1080p HD auxiliary camera feeds—eight with Dual AI Multicam—supplementing the dash cam. Protect drivers with live in-cab monitor feed and configurable triggers. Ensure every detail is captured with optional audio recording.",
      media: featureMedia,
      mediaLeft: !mediaLeftFirst,
    },
  ] as const;

const gridA = [
  asset("images/assets/solutions/pwpaO.png"),
  asset("images/assets/solutions/K46Vcb.png"),
  asset("images/assets/solutions/rOwmr.png"),
  asset("images/assets/solutions/MIFQ0.png"),
  asset("images/assets/solutions/Fr97u.png"),
  asset("images/assets/solutions/Ra84n.png"),
  asset("images/assets/solutions/TbKIL.png"),
  asset("images/assets/solutions/OxnR6.png"),
];

const sharedCopy = {
  heroDesc:
    "An open ecosystem of engineering software, data, and AI for the people who make infrastructure possible.",
  assetsHeadline: "120+ Assets And Counting",
  assetsDesc:
    "Across thousands of operations, the results keep showing up in the same places: fewer accidents, lower costs, and a business that's built to grow.",
  assetImages: gridA,
  features: [...defaultFeatures(true)],
};

export const solutions: Solution[] = [
  { slug: "road-pavement", title: "Road & Pavement", ...sharedCopy },
  { slug: "roadside-facility", title: "Roadside Facility", ...sharedCopy },
  { slug: "city-environment", title: "City & Environment", ...sharedCopy },
  { slug: "work-site-safety", title: "Work Site Safety", ...sharedCopy },
  {
    slug: "infrastructure-asset-management",
    title: "Infrastructure Asset Management",
    ...sharedCopy,
  },
];

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s])) as Record<
  SolutionSlug,
  Solution
>;

export function solutionPath(slug: SolutionSlug | string) {
  return `/solutions/${slug}`;
}

/** Inspection items shown in nav / stories order */
export const solutionMenu = [
  { label: "Road & Pavement", slug: "road-pavement" as const },
  { label: "Roadside Facility", slug: "roadside-facility" as const },
  { label: "City & Environment", slug: "city-environment" as const },
  { label: "Work Site Safety", slug: "work-site-safety" as const },
];
