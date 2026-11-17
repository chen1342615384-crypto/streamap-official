import { asset } from "../lib/asset";

export type NewsSlug = string;

export type NewsArticle = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: string;
  author?: string;
  heroImage?: string;
  chartImage?: string;
  chartCaption?: string;
  takeaways?: string[];
  body: string[];
};

export function newsPath(slug?: string) {
  return slug ? `/company/news/${slug}` : "/company/news";
}

export const newsPage = {
  heroTitle: "The Streamap News",
  heroDesc:
    "Access unique industry insights and software stories to get an insider's perspective on the world of infrastructure.",
  heroImage: asset("images/assets/news/KH5Oi.png"),
  searchPlaceholder: "Search the blog",
  filterLabel: "Date (newest first)",
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "bentley-survey-data-security-ai",
    date: "NOV 13, 2026",
    title: "Bentley Survey: Data Security Top Priority For AEC Firms Adopting AI",
    excerpt:
      "More than 100 U.S. firms in the architecture, engineering, and construction (AEC) industries provided insights about AI adoption, investment, data strategy, and where they expect AI to create value.",
    tags: ["Perspectives", "Insights"],
    image: asset("images/assets/news/bbAg0.png"),
    author: "By Kathleen Moore",
    heroImage: asset("images/assets/news/wF1Hy.png"),
    chartImage: asset("images/assets/news/G6VZZ1.png"),
    chartCaption:
      "More than 100 U.S. AEC firms shared how they are adopting AI, investing in it, and protecting their proprietary data.",
    takeaways: [
      "Bentley Systems and AEC Advisors LLC polled more than 100 U.S. AEC firms about AI use.",
      "Firms said data security was a top priority, with 45% having strict “zero-sharing” policies on external vendors using their data to train AI models.",
      "Larger firms were more likely to expect a \"significant shift\" away from traditional billing models in the next five years due to AI’s impact.",
    ],
    body: [
      "Data security is paramount as firms increasingly integrate artificial intelligence (AI) into their work, according to a new survey that found nearly half of the participating companies enforce strict controls on how external vendors may use their data.",
      "The survey—by Bentley Systems and AEC Advisors—polled more than 100 U.S. firms in the architecture, engineering, and construction (AEC) industries. Researchers examined AI adoption, investment priorities, data strategy, and where leaders expect AI to create value.",
      "The findings highlight a focus on protecting proprietary data and preserving choice through open ecosystems. The survey also found that larger AEC firms are more likely to anticipate meaningful changes to commercial models as AI reshapes delivery.",
      "Here are key highlights from the survey:",
    ],
  },
  {
    slug: "human-in-the-lead-ai-rules",
    date: "NOV 06, 2026",
    title: "The Human in the Lead: AI and the Rules of the Road",
    excerpt: "Takeaways from the Financial Times Future of AI Summit",
    tags: ["Insights"],
    image: asset("images/assets/news/Chmta.png"),
    author: "By Streamap Editorial",
    body: [
      "Takeaways from the Financial Times Future of AI Summit underscore a simple point for infrastructure leaders: AI can accelerate analysis, but people still own the decision.",
      "Across panels on regulation, workforce, and enterprise adoption, speakers returned to the same theme—governance, accountability, and domain expertise determine whether AI creates durable value.",
      "For operators and engineers, that means pairing new tooling with clear review standards, trusted data, and workflows that keep professional judgment visible.",
    ],
  },
  {
    slug: "ai-gets-real-infrastructure",
    date: "NOV 04, 2026",
    title: "AI Gets Real for the People Who Build America's Infrastructure",
    excerpt:
      "At Illuminate Dallas, infrastructure engineers and executives explored practical questions: What AI can do today, where it falls short, and why human judgment decides what gets built.",
    tags: ["AI", "Insights"],
    image: asset("images/assets/news/aBVu2.png"),
    author: "By Streamap Editorial",
    body: [
      "At Illuminate Dallas, infrastructure engineers and executives explored practical questions: What AI can do today, where it falls short, and why human judgment decides what gets built.",
      "Conversations moved quickly from demos to delivery—how teams validate outputs, protect project data, and keep assurance processes intact as AI enters everyday software.",
      "The takeaway for asset owners and contractors was consistent: useful AI is embedded in real workflows, measured against field outcomes, and supervised by people accountable for the result.",
    ],
  },
  {
    slug: "pothole-is-now-a-data-point",
    date: "NOV 04, 2026",
    title: "The Pothole Is Now a Data Point. That’s Progress.",
    excerpt:
      "At a Dublin smart-city workshop, some 80 digital leaders from governments across Ireland and the U.K. showed how AI is mapping local roads, dying trees, and empty shops—and why AI governance now comes first.",
    tags: ["Perspectives", "Insights"],
    image: asset("images/assets/news/ltzMS.png"),
    author: "By Streamap Editorial",
    body: [
      "At a Dublin smart-city workshop, some 80 digital leaders from governments across Ireland and the U.K. showed how AI is mapping local roads, dying trees, and empty shops—and why AI governance now comes first.",
      "When street defects become structured data, cities can prioritize maintenance with clearer evidence. The harder work is building the policies, roles, and review loops that keep automated insight trustworthy.",
      "That shift—from isolated pilots to governed operating practice—is where infrastructure AI starts to change outcomes on the ground.",
    ],
  },
  {
    slug: "ai-engineering-accountability",
    date: "OCT 23, 2026",
    title: "AI in Engineering: Why Accountability Matters",
    excerpt:
      "Mark Coates, Bentley's Vice President of Infrastructure Policy Advancement, on stage at Berlin's 2026 Illuminate Conference.",
    tags: ["Perspectives", "Insights"],
    image: asset("images/assets/news/VCJry.png"),
    author: "By Mark Coates",
    body: [
      "AI is rapidly moving into engineering practice, changing how information is found, designs are developed, alternatives are assessed, and projects are managed.",
      "Yet the most important question for the profession is becoming less about what the technology can do and more about what happens to professional responsibility when AI becomes part of the engineering process.",
      "Reliable AI ultimately depends on reliable organizations; professional responsibility cannot simply be delegated to a model or software platform.",
      "The strongest engineering firms will be those capable of extensively using AI without weakening the chain of professional responsibility—where assumptions can be challenged, outputs can be independently tested, and somebody is prepared to stand behind the decision.",
    ],
  },
  {
    slug: "smartest-sandbox-campus",
    date: "OCT 23, 2026",
    title: "The World’s Smartest Sandbox in the Heart of a City",
    excerpt:
      "A university campus is proving to be an ideal testbed to deliver better smart city outcomes in the real world.",
    tags: ["iTwin", "Insights"],
    image: asset("images/assets/news/Cfd2o.png"),
    author: "By Streamap Editorial",
    body: [
      "A university campus is proving to be an ideal testbed to deliver better smart city outcomes in the real world.",
      "Contained geography, rich sensor coverage, and willing stakeholders make campuses a practical proving ground for digital twins, mobility experiments, and maintenance workflows.",
      "Lessons learned there—especially around data quality and operating ownership—transfer directly to municipal and corridor-scale infrastructure programs.",
    ],
  },
  {
    slug: "ai-changing-structural-engineering",
    date: "OCT 21, 2026",
    title: "How AI is Changing Structural Engineering",
    excerpt:
      "Structural engineering is faced with several existential pressures which AI can help address, but only if employed thoughtfully and in a way that builds trust with engineers.",
    tags: ["AI", "Structural Analysis & Detailing", "Software Story"],
    image: asset("images/assets/news/wveO9.png"),
    author: "By Annik Carson, Senior Applied AI Scientist",
    takeaways: [
      "Structural engineering faces talent, productivity, and sustainability pressures that thoughtful AI can help address.",
      "Agentic workflows will change how engineering work gets done, while building on skills and software developed over years.",
      "Tools like MCP let engineers access product capabilities through natural language while keeping execution deterministic.",
    ],
    body: [
      "Structural engineers design the \"bones\" of the built world so that buildings, bridges, and infrastructure stand safely under the forces that occupancy, operations, and nature impose.",
      "Disruptive technology like AI might therefore be regarded with understandable caution. Engineers must weigh safety-criticality, professional liability, and the integrity of carefully honed workflows against pressure to adopt new ways of working.",
      "Yet the scale of the challenges facing the profession—a global infrastructure gap, acute talent shortages, and the urgent need to reduce the carbon footprint of the built environment—means that standing still is not a neutral choice.",
      "AI that works inside commonly used workflows is more impactful than specialized tooling with high adoption overhead. Firms making the most progress identify bounded tasks, measure results, and expand from there.",
    ],
  },
  {
    slug: "yii-winners-12-projects",
    date: "OCT 08, 2026",
    title: "12 Projects From 11 Countries Win Bentley Awards",
    excerpt:
      "Independent jurors chose the winners from more than 300 nominations, with nearly 70% of finalists using AI in their work. \"What is today's innovation is tomorrow's best practice,\" said Bentley CEO Nicholas Cumins.",
    tags: ["Perspectives", "YII", "Insights"],
    image: asset("images/assets/news/gH7Zs.png"),
    author: "By Streamap Editorial",
    body: [
      "Independent jurors chose the winners from more than 300 nominations, with nearly 70% of finalists using AI in their work.",
      "\"What is today's innovation is tomorrow's best practice,\" said Bentley CEO Nicholas Cumins.",
      "The awarded projects show how digital delivery, AI-assisted insight, and disciplined engineering practice are converging across geographies and infrastructure types.",
    ],
  },
  {
    slug: "yii-awards-experience",
    date: "OCT 06, 2026",
    title: "Bentley's Year in Infrastructure Awards Experience",
    excerpt:
      "The people shaping the world's infrastructure deserve an experience as extraordinary as the work they do. This year, Bentley built one.",
    tags: ["Perspectives", "YII", "Insights"],
    image: asset("images/assets/news/fOHzF.png"),
    author: "By Streamap Editorial",
    body: [
      "The people shaping the world's infrastructure deserve an experience as extraordinary as the work they do. This year, Bentley built one.",
      "Year in Infrastructure brings together practitioners, owners, and technology leaders to share what is working in the field—and what still needs to improve.",
      "For Streamap, the conversations around inspection, asset intelligence, and AI-assisted operations remain central to how infrastructure gets maintained at scale.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return newsArticles.find((item) => item.slug === slug);
}

export function getNewsNeighbors(slug: string) {
  const index = newsArticles.findIndex((item) => item.slug === slug);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? newsArticles[index - 1] : undefined,
    next: index < newsArticles.length - 1 ? newsArticles[index + 1] : undefined,
  };
}
