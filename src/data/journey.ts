import d1 from "@/assets/dest-1.jpg.asset.json";
import d2 from "@/assets/dest-2.jpg.asset.json";
import d3 from "@/assets/dest-3.jpg.asset.json";
import d4 from "@/assets/dest-4.jpg.asset.json";
import d5 from "@/assets/dest-5.jpg.asset.json";
import d6 from "@/assets/dest-6.jpg.asset.json";
import d7 from "@/assets/dest-7.jpg.asset.json";
import world from "@/assets/hunza-world.jpg.asset.json";

export const worldImage = world.url;

export type Destination = {
  id: string;
  index: number;
  name: string;
  category: string;
  icon: "fort" | "village" | "lake" | "peak" | "bridge" | "pass";
  /** position in world space, 0..1 */
  x: number;
  y: number;
  image: string;
  description: string;
  location: string;
  elevation: string;
  rating: number;
  facts: string[];
  featured?: boolean;
};

export const destinations: Destination[] = [
  {
    id: "baltit-fort",
    index: 1,
    name: "Baltit Fort",
    category: "Starting Point",
    icon: "fort",
    x: 0.28,
    y: 0.73,
    image: d1.url,
    description:
      "A 700-year-old royal fort watching over Karimabad. Restored timber balconies, whitewashed halls and a terrace that opens onto the whole valley.",
    location: "Karimabad, Hunza",
    elevation: "2,500 m",
    rating: 4.9,
    facts: [
      "Built over 700 years ago by the Mirs of Hunza",
      "Restored in 1996 with Aga Khan Trust for Culture",
      "Balti-Tibetan architecture with cedar beams",
    ],
    featured: true,
  },
  {
    id: "karimabad",
    index: 2,
    name: "Karimabad",
    category: "Village",
    icon: "village",
    x: 0.475,
    y: 0.425,
    image: d2.url,
    description:
      "The beating heart of Hunza. Stone lanes, apricot orchards and rooftop cafés facing Rakaposhi across the valley.",
    location: "Central Hunza",
    elevation: "2,438 m",
    rating: 4.8,
    facts: [
      "Named after Prince Karim Aga Khan",
      "Famous for apricot and cherry blossom season",
      "Base for both Baltit and Altit forts",
    ],
  },
  {
    id: "altit-fort",
    index: 3,
    name: "Altit Fort",
    category: "Historic Fort",
    icon: "fort",
    x: 0.355,
    y: 0.535,
    image: d3.url,
    description:
      "The oldest monument in Gilgit-Baltistan, balanced on a sheer rock above the Hunza River, with the Royal Garden below.",
    location: "Altit, Hunza",
    elevation: "2,400 m",
    rating: 4.7,
    facts: [
      "Over 1,100 years old",
      "Perched on a 300 m cliff above the river",
      "Home of the Mirs before Baltit Fort",
    ],
  },
  {
    id: "attabad-lake",
    index: 4,
    name: "Attabad Lake",
    category: "Lake",
    icon: "lake",
    x: 0.655,
    y: 0.4,
    image: d4.url,
    description:
      "An impossibly turquoise lake born from a 2010 landslide, now the most photographed water in northern Pakistan.",
    location: "Gojal Valley, Hunza",
    elevation: "2,410 m",
    rating: 4.9,
    facts: [
      "Formed by a landslide in January 2010",
      "Roughly 21 km long and 100 m deep",
      "Boating, jet-ski and lakeside resorts",
    ],
  },
  {
    id: "passu-cones",
    index: 5,
    name: "Passu Cones",
    category: "Viewpoint",
    icon: "peak",
    x: 0.34,
    y: 0.275,
    image: d5.url,
    description:
      "The cathedral ridge of Hunza — saw-toothed granite spires that rise straight out of the Karakoram Highway.",
    location: "Passu, Gojal",
    elevation: "6,106 m",
    rating: 5.0,
    facts: [
      "Locally known as Tupopdan, 'the sun-drenched mountain'",
      "One of the most photographed skylines in Pakistan",
      "Best light at sunrise from the KKH viewpoint",
    ],
  },
  {
    id: "hussaini-bridge",
    index: 6,
    name: "Hussaini Bridge",
    category: "Bridge",
    icon: "bridge",
    x: 0.635,
    y: 0.565,
    image: d6.url,
    description:
      "A swaying plank-and-rope crossing over the Hunza River, regularly called one of the most thrilling bridges on earth.",
    location: "Hussaini, Gojal",
    elevation: "2,500 m",
    rating: 4.6,
    facts: [
      "Wooden planks spaced wide over the river",
      "Around 190 m long",
      "Crossing takes roughly 10 nervous minutes",
    ],
  },
  {
    id: "khunjerab-pass",
    index: 7,
    name: "Khunjerab Pass",
    category: "Mountain Pass",
    icon: "pass",
    x: 0.805,
    y: 0.78,
    image: d7.url,
    description:
      "The highest paved border crossing in the world, where the Karakoram Highway meets the Pamir plateau and China.",
    location: "Pak–China Border",
    elevation: "4,693 m",
    rating: 4.8,
    facts: [
      "Highest paved international border crossing",
      "Inside Khunjerab National Park — snow leopard habitat",
      "Open seasonally, roughly May to November",
    ],
  },
];

export const mountainLabels = [
  { id: "rakaposhi", name: "Rakaposhi", elevation: "7,788 m", x: 0.52, y: 0.075 },
  { id: "ultar-sar", name: "Ultar Sar", elevation: "7,388 m", x: 0.855, y: 0.13 },
  { id: "passu-peaks", name: "Passu Cones", elevation: "", x: 0.2, y: 0.2 },
];

/** subtle warm village lights scattered around the valley */
export const warmLights = [
  { x: 0.28, y: 0.73 },
  { x: 0.31, y: 0.7 },
  { x: 0.475, y: 0.425 },
  { x: 0.5, y: 0.45 },
  { x: 0.355, y: 0.535 },
  { x: 0.655, y: 0.4 },
  { x: 0.34, y: 0.275 },
  { x: 0.635, y: 0.565 },
  { x: 0.805, y: 0.78 },
  { x: 0.72, y: 0.62 },
  { x: 0.42, y: 0.48 },
];
