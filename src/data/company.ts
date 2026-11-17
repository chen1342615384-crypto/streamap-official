import { asset } from "../lib/asset";

export type CompanySlug = "about-us" | "contact-us" | "news";

export function companyPath(slug: CompanySlug | string) {
  return `/company/${slug}`;
}

export const companyMenu = [
  { label: "About us", slug: "about-us" as const },
  { label: "Contact us", slug: "contact-us" as const },
  { label: "News", slug: "news" as const },
];

export const aboutContent = {
  heroTitle: "About us",
  heroDesc: "A Global Intelligent Road Solutions Provider Powered by AI and Big Data",
  heroImage: asset("images/assets/about/NWRRN.png"),
  partnerEyebrow: "FULL-VEHICLE HD VISIBILITY",
  partnerTitle: "The partner of choice for road inspection professionals",
  partnerBody:
    "In 2020, Streamax spun off its road digitalization business to establish Streamap, a specialized subsidiary focused on AI-powered road solutions. We cover video data from 1M+ commercial vehicles nationwide with specialized low-lux inspection cameras, mapping defect evolution, identifying maintenance timing, and supporting data-driven decisions across 32 provinces in China and multiple countries worldwide.",
  partnerMedia: asset("images/assets/about/gzU69.png"),
  statsTitle: "Built different.\nProven where it counts.",
  statsDesc:
    "This is placeholder text for layout preview only. It carries no practical information and will be replaced with official copy later.",
  stats: [
    { value: "380+", label: "AI Detections" },
    { value: "1.8M+", label: "km covered daily" },
    { value: "28+", label: "Countries Covered" },
  ],
  timelineEyebrow: "CONNECT WITH US",
  timelineTitle: "Built from the ground up.\nStill going.",
  timelineDesc: "This is placeholder text for layout preview only.",
  milestones: [
    {
      year: "2020",
      title: "Streamap was founded",
      body: "This text is for layout filling only and contains no actual business meaning. As long as you work diligently, you can gain rewards from your efforts. Anyone engaged in study and work should do their best, avoid unnecessary troubles and stay away from distress.",
      image: asset("images/assets/about/timeline/l7plbq.png"),
    },
    {
      year: "2021",
      title: "Safety and compliance, shaped by drivers",
      body: "This is placeholder text for layout preview only. It carries no practical information and will be replaced with official copy later.",
      image: asset("images/assets/about/timeline/vLu6N.png"),
    },
    {
      year: "2023",
      title: "Beyond the vehicle",
      body: "This is placeholder text for layout preview only. It carries no practical information and will be replaced with official copy later.",
      image: asset("images/assets/about/timeline/yfhbS.png"),
    },
    {
      year: "2021",
      title: "One connected platform. Public company.",
      body: "The Connected Operations Platform and App Marketplace bring telematics, equipment, and worksite visibility together. In December, Samsara lists on the NYSE under the ticker IOT.",
      image: asset("images/assets/about/timeline/aJmLe.png"),
    },
    {
      year: "2024",
      title: "Scale as proof",
      body: "Trillions of data points and 80B+ miles of real-world operator data now flow through the platform every year, the most honest feedback loop in the industry, and the foundation for operator-grade AI.",
      image: asset("images/assets/about/timeline/SE9WE.png"),
    },
    {
      year: "2025",
      title: "The agentic chapter",
      body: "Samsara's AI stops waiting to be asked. It flags risk before it becomes an incident and surfaces cost before it lands, the current chapter, still being written with 20,000+ operations.",
      image: asset("images/assets/about/timeline/G0tcx.png"),
    },
    {
      year: "Beyond",
      title: "Written with operators, not for them.",
      body: "Operators told us what wasn't working, and we built it with them. The next chapter isn't AI bolted onto the old way of working—it's changing how the work gets done, with the people who do it. One shift at a time.",
      image: asset("images/assets/about/timeline/s4KBim.png"),
    },
  ],
  awardsTitle: "Awards and recognition.",
  awardsDesc:
    "We’re honored to share the awards that recognize our leadership and the real-world impact of our work worldwide.",
  awards: [
    asset("images/assets/about/awards/IJks3.png"),
    asset("images/assets/about/awards/xIZlK.png"),
    asset("images/assets/about/awards/pGiin.png"),
    asset("images/assets/about/awards/NqFwp.png"),
  ],
  ctaTitle: "Infrastructure depends on the people who get it right.",
  ctaDesc: "Behind them is Streamap.",
};

export const contactContent = {
  heroTitle: "Contact a Streamap rep today",
  heroDesc:
    "If you are interested in our products or have any questions, please fill out the form and we will get back to you as soon as possible.",
  heroImage: asset("images/assets/about/NWRRN.png"),
  eyebrow: "TALK WITH US",
  title: "Let's connect",
  intro: "You can also reach us directly through the following methods.",
  details: [
    { label: "Phone", value: "86 755 8614 0275" },
    { label: "Email", value: "SALES@STREAMAP.COM" },
    { label: "Fax", value: "0755-33633506" },
    {
      label: "HQ Address",
      value: "3/F, Building J, No. 1001, Xueyuan Avenue, Nanshan District, Shenzhen, China.",
    },
  ],
  formTitle: "Ready to start the conversation?",
  formDesc: "Fill out the form and a member of our team will be in touch soon.",
};
