/** City markers — same dataset shape as Streamax `window.CITIES_DATA` */
export type City = {
  id: number;
  tag: string;
  name: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  src: string;
  icon: string;
};

const CDN = "http://cn.streamax.com";

export const CITIES: City[] = [
  {
    id: 1,
    tag: "深圳公司",
    name: "深圳公司",
    lat: 22.54,
    lng: 114.08,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/cc6dfaa2-2175-4275-a208-96edc5a792c4.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
  {
    id: 2,
    tag: "日本子公司",
    name: "日本子公司",
    lat: 35.64,
    lng: 139.84,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/48f0db18-8522-4116-b835-5de94130d3f1.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
  {
    id: 3,
    tag: "美国子公司",
    name: "美国子公司",
    lat: 34.04,
    lng: -86.44,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/db5439da-5824-4b9f-97b4-40b1a32bb437.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
  {
    id: 4,
    tag: "新加坡子公司",
    name: "新加坡子公司",
    lat: 1.32,
    lng: 103.88,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/083558c0-ca80-410e-bdcc-f41a707ab213.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
  {
    id: 5,
    tag: "中东子公司",
    name: "中东子公司",
    lat: 24.4,
    lng: 54.49,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/fa96c06e-28f9-48e3-8599-a313f449ee77.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
  {
    id: 6,
    tag: "荷兰子公司",
    name: "荷兰子公司",
    lat: 52.39,
    lng: 4.81,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/5812a3b2-f1bf-4388-9a53-acc2ca7903ca.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
  {
    id: 7,
    tag: "巴西办公室",
    name: "巴西办公室",
    lat: -23.53,
    lng: -46.84,
    size: 0.7,
    color: "#122B57",
    src: `${CDN}/upload/image/2026/01/07/8189faa0-5352-4038-bf64-5f3d7861922e.png`,
    icon: `${CDN}/static/en/img/jjtt.png`,
  },
];

/** Same as Streamax `window.GLOBE_STYLE` */
export const GLOBE_STYLE = {
  globeColor: "#f2f2f2",
  atmosphereColor: "#000000",
  atmosphereAltitude: 0.03,
} as const;

export const ACTIVE_COLOR = "#ABCD03";
export const INACTIVE_COLOR = "#122B57";
