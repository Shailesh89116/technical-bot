import { Product } from "./type";

export const products: Product[] = [
  {
    id: "gr-001",
    name: "Grand Clear",
    code: "GR-001",
    category: "grand",
    price: 4200,
    inStock: true,
    description:
      "Grand Series Clear acrylic sheet provides extra strength, exclusive roofing design, and wide skylight spans with superior UV protection.",
    thickness: "10 mm",
    span: "139.2 cm (Type 1), 92 cm (Type 2)",
    sizes: [
      {
        id: "gr-001-1380x3000",
        name: "1380 x 3000 mm",
        price: 4200,
        inStock: true,
        stockCount: 10,
      },
      {
        id: "gr-001-1380x6000",
        name: "1380 x 6000 mm",
        price: 8200,
        inStock: true,
        stockCount: 6,
      },
    ],
    features: [
      "Extra strength and durability (2.5x stronger than tempered glass)",
      "Exclusive acrylic roofing for enclosed spaces",
      "Extra wide skylight up to 920 mm span",
      "Blocks 99.4% UV rays while allowing 90% natural light",
    ],
    application:
      "Ideal for skylights, premium roofing, and modern residential spaces.",
    images: ["/img-1.png", "/img-2.png"],
    attributes: {
      uvCut: "99.4%",
      lightTransmission: "90%",
    },
  },

  // ================= PRIME SERIES =================
  {
    id: "pr-562",
    name: "Prime Brownish Green",
    code: "PR-562",
    category: "prime",
    mainCategory: "building-materials",
    price: 2800,
    inStock: true,
    description:
      "Prime Series Brownish Green sheet reduces infrared heat by 69-75% and makes your space naturally cooler and modern.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "pr-562-1380x3000",
        name: "1380 x 3000 mm",
        price: 2800,
        inStock: true,
        stockCount: 20,
      },
      {
        id: "pr-562-1380x6000",
        name: "1380 x 6000 mm",
        price: 5500,
        inStock: true,
        stockCount: 12,
      },
    ],
    features: [
      "Thermal protection reducing heat by 6°C",
      "Reduces infrared heat 69-75%",
      "UV protection up to 99.6%",
      "Wide transparent skylight",
    ],
    application:
      "Perfect for energy-saving transparent roofs, skylights, and modern designs.",
    images: [
      "/building-material/prime/pr-562-1.jpg",
      "/building-material/prime/pr-562.jpg",
    ],
    attributes: {
      heatcut: "75%",
      uvCut: "99.6%",
      lightTransmission: "13%",
    },
  },
  {
    id: "pr-n828",
    name: "Prime Modern Grey",
    code: "PR-N828",
    category: "prime",
    mainCategory: "building-materials",
    price: 2850,
    inStock: true,
    description:
      "Prime Series Modern Grey acrylic sheet combines thermal protection and aesthetics for modern buildings.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "pr-n828-1380x3000",
        name: "1380 x 3000 mm",
        price: 2850,
        inStock: true,
        stockCount: 18,
      },
      {
        id: "pr-n828-1380x6000",
        name: "1380 x 6000 mm",
        price: 5600,
        inStock: true,
        stockCount: 10,
      },
    ],
    features: [
      "Blocks strong sunlight",
      "Keeps under-roof area 6°C cooler",
      "Reduces infrared heat by 69-75%",
      "99.6% UV cut",
    ],
    application: "Modern homes, skylights, premium roofing.",
    images: [
      "/building-material/prime/pr-n828-1.jpg",
      "/building-material/prime/pr-n828.jpg",
    ],
    attributes: {
      heatcut: "69%",
      uvCut: "99.6%",
      lightTransmission: "14%",
    },
  },

  // ================= HEAT CUT SERIES =================
  {
    id: "hc-g828",
    name: "Heat Cut Mystic Grey",
    code: "HC-G828",
    category: "heatcut",
    mainCategory: "building-materials",
    price: 1900,
    inStock: true,
    description:
      "Heat Cut Mystic Grey reduces infrared heat by 48-59% while maintaining transparency and modern look.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "hc-g828-1380x3000",
        name: "1380 x 3000 mm",
        price: 1900,
        inStock: true,
        stockCount: 22,
      },
      {
        id: "hc-g828-1380x6000",
        name: "1380 x 6000 mm",
        price: 3700,
        inStock: true,
        stockCount: 14,
      },
    ],
    features: [
      "Blocks UV rays up to 99.8%",
      "Reduces infrared heat 48-59%",
      "Keeps space cooler by 5°C",
      "Lightweight and modern",
    ],
    application: "Best for homes needing natural transparency with less heat.",
    images: [
      "/building-material/heatcut/hc-g828-1.jpg",
      "/building-material/heatcut/hc-g828.jpg",
    ],
    attributes: {
      heatcut: "60%",
      uvCut: "99.8%",
      lightTransmission: "14%",
    },
  },
  {
    id: "hc-n828",
    name: "Heat Cut Modern Grey",
    code: "HC-N828",
    category: "heatcut",
    mainCategory: "building-materials",
    price: 2050,
    inStock: true,
    description:
      "Heat Cut Modern Grey balances premium transparency with heat reduction and UV blocking.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "hc-n828-1380x3000",
        name: "1380 x 3000 mm",
        price: 2050,
        inStock: true,
        stockCount: 16,
      },
      {
        id: "hc-n828-1380x6000",
        name: "1380 x 6000 mm",
        price: 3950,
        inStock: true,
        stockCount: 8,
      },
    ],
    features: [
      "UV cut 99.8%",
      "Heat cut 58%",
      "Light transmission 15%",
      "Durable and lightweight",
    ],
    application: "Modern roofing and architectural skylights.",
    images: [
      "/building-material/heatcut/hc-n828-1.jpg",
      "/building-material/heatcut/hc-n828.jpg",
    ],
    attributes: {
      heatcut: "58%",
      uvCut: "99.8%",
      lightTransmission: "15%",
    },
  },
  {
    id: "hc-n590",
    name: "Heat Cut Noble Green",
    code: "HC-N590",
    category: "heatcut",
    mainCategory: "building-materials",
    price: 1950,
    inStock: true,
    description:
      "Heat Cut Noble Green offers eco-friendly aesthetics with effective heat reduction.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "hc-n590-1380x3000",
        name: "1380 x 3000 mm",
        price: 1950,
        inStock: true,
        stockCount: 20,
      },
      {
        id: "hc-n590-1380x6000",
        name: "1380 x 6000 mm",
        price: 3800,
        inStock: true,
        stockCount: 12,
      },
    ],
    features: [
      "UV cut 99.8%",
      "Heat cut 56%",
      "Light transmission 19%",
      "Natural green finish",
    ],
    application: "Eco-friendly roofing, canopies, skylights.",
    images: [
      "/building-material/heatcut/hc-n590-1.jpg",
      "/building-material/heatcut/hc-n590.jpg",
    ],
    attributes: {
      heatcut: "56%",
      uvCut: "99.8%",
      lightTransmission: "19%",
    },
  },
  {
    id: "hc-b703",
    name: "Heat Cut Royal Blue",
    code: "HC-B703",
    category: "heatcut",
    mainCategory: "building-materials",
    price: 2000,
    inStock: true,
    description:
      "Heat Cut Royal Blue provides a premium vibrant look with superior UV blocking.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "hc-b703-1380x3000",
        name: "1380 x 3000 mm",
        price: 2000,
        inStock: true,
        stockCount: 18,
      },
      {
        id: "hc-b703-1380x6000",
        name: "1380 x 6000 mm",
        price: 3850,
        inStock: true,
        stockCount: 9,
      },
    ],
    features: [
      "UV cut 99.6%",
      "Heat cut 48%",
      "Light transmission 23%",
      "Blue premium finish",
    ],
    application: "Residential and commercial skylight solutions.",
    images: [
      "/building-material/heatcut/hc-b703-1.jpg",
      "/building-material/heatcut/hc-b703.jpg",
    ],
    attributes: {
      heatcut: "48%",
      uvCut: "99.6%",
      lightTransmission: "23%",
    },
  },
  {
    id: "hc-570",
    name: "Heat Cut Classic Brown",
    code: "HC-570",
    category: "heatcut",
    mainCategory: "building-materials",
    price: 1850,
    inStock: true,
    description:
      "Heat Cut Classic Brown offers earthy aesthetics with excellent UV blocking and heat reduction.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "hc-570-1380x3000",
        name: "1380 x 3000 mm",
        price: 1850,
        inStock: true,
        stockCount: 22,
      },
      {
        id: "hc-570-1380x6000",
        name: "1380 x 6000 mm",
        price: 3650,
        inStock: true,
        stockCount: 10,
      },
    ],
    features: [
      "UV cut 99.7%",
      "Heat cut 55%",
      "Light transmission 29%",
      "Classic brown look",
    ],
    application: "Decorative roofing, skylights, and modern designs.",
    images: [
      "/building-material/heatcut/hc-570-1.jpg",
      "/building-material/heatcut/hc-570.jpg",
    ],
    attributes: {
      heatcut: "55%",
      uvCut: "99.7%",
      lightTransmission: "29%",
    },
  },

  // ================= NATURE SERIES =================
  {
    id: "nt-001",
    name: "Nature Clear",
    code: "NT-001",
    category: "nature",
    mainCategory: "building-materials",
    price: 1600,
    inStock: true,
    description:
      "Nature Series Clear sheet offers glass-like transparency, connecting you to nature with durability and UV protection.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "nt-001-1380x3000",
        name: "1380 x 3000 mm",
        price: 1600,
        inStock: true,
        stockCount: 25,
      },
      {
        id: "nt-001-1380x6000",
        name: "1380 x 6000 mm",
        price: 3200,
        inStock: true,
        stockCount: 14,
      },
    ],
    features: [
      "Glass-like clarity",
      "UV cut 98.4%",
      "Durable in outdoor conditions",
      "Lightweight yet tough",
    ],
    application:
      "Perfect for areas requiring maximum natural light and outdoor views.",
    images: ["/building-material/nature/nt-001.jpg"],
    attributes: {
      uvCut: "98.4%",
      lightTransmission: "90%",
    },
  },
  {
    id: "nt-332",
    name: "Light Grey",
    code: "NT-332",
    category: "nature",
    mainCategory: "building-materials",
    price: 1600,
    inStock: true,
    description:
      "Nature Series Clear sheet offers glass-like transparency, connecting you to nature with durability and UV protection.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "nt-001-1380x3000",
        name: "1380 x 3000 mm",
        price: 1600,
        inStock: true,
        stockCount: 25,
      },
      {
        id: "nt-001-1380x6000",
        name: "1380 x 6000 mm",
        price: 3200,
        inStock: true,
        stockCount: 14,
      },
    ],
    features: [
      "Glass-like clarity",
      "UV cut 98.4%",
      "Durable in outdoor conditions",
      "Lightweight yet tough",
    ],
    application:
      "Perfect for areas requiring maximum natural light and outdoor views.",
    images: ["/building-material/nature/nt-332.jpg"],
    attributes: {
      uvCut: "98.4%",
      lightTransmission: "90%",
    },
  },

  // ================= SUPERIOR SERIES =================
  {
    id: "sp-b857",
    name: "Superior Marine Blue",
    code: "SP-B857",
    category: "superior",
    mainCategory: "building-materials",
    price: 1700,
    inStock: true,
    description:
      "Superior Series Marine Blue filters light, ensuring comfort for the eyes while maintaining brightness.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "sp-b857-1380x3000",
        name: "1380 x 3000 mm",
        price: 1700,
        inStock: true,
        stockCount: 22,
      },
      {
        id: "sp-b857-1380x6000",
        name: "1380 x 6000 mm",
        price: 3300,
        inStock: true,
        stockCount: 11,
      },
    ],
    features: [
      "Filters strong light for gentle comfort",
      "Provides privacy while maintaining brightness",
      "UV cut up to 99.7%",
      "Modern frosted finish",
    ],
    application: "Ideal for shaded spaces with balanced light.",
    images: [
      "/building-material/superior/sp-b857-1.jpg",
      "/building-material/superior/sp-b857.jpg",
    ],
    attributes: {
      uvCut: "99.7%",
      lightTransmission: "26%",
    },
  },
  {
    id: "sp-nb30",
    name: "Superior Foggy Brown",
    code: "SP-NB30",
    category: "superior",
    mainCategory: "building-materials",
    price: 1750,
    inStock: true,
    description:
      "Superior Series Foggy Brown offers filtered natural light with elegance and privacy.",
    thickness: "6 mm",
    span: "50 cm",
    sizes: [
      {
        id: "sp-nb30-1380x3000",
        name: "1380 x 3000 mm",
        price: 1750,
        inStock: true,
        stockCount: 20,
      },
      {
        id: "sp-nb30-1380x6000",
        name: "1380 x 6000 mm",
        price: 3400,
        inStock: true,
        stockCount: 10,
      },
    ],
    features: [
      "Privacy with natural light",
      "UV cut 99.4%",
      "Durable under all weather",
      "Budget friendly frosted look",
    ],
    application:
      "Perfect for hotels, resorts, and residential projects needing filtered light.",
    images: [
      "/building-material/superior/sp-nb30-1.jpg",
      "/building-material/superior/sp-nb30.jpg",
    ],
    attributes: {
      uvCut: "99.4%",
      lightTransmission: "45%",
    },
  },

  // ================= SHADE SERIES =================
  {
    id: "sp-430s",
    name: "Shade Pearl White",
    code: "430S",
    category: "shade",
    mainCategory: "building-materials",
    price: 1650,
    inStock: true,
    description:
      "Shade Series Pearl White offers superior heat reflection and a modern shaded look for homes.",
    thickness: "4 mm",
    span: "40 cm",
    sizes: [
      {
        id: "sp-430s-1380x3000",
        name: "1380 x 3000 mm",
        price: 1650,
        inStock: true,
        stockCount: 18,
      },
      {
        id: "sp-430s-1380x6000",
        name: "1380 x 6000 mm",
        price: 3000,
        inStock: true,
        stockCount: 9,
      },
    ],
    features: [
      "Reflects over 50% heat",
      "Reduces temperature by 10°C",
      "Long-lasting durability",
      "Lightweight structure",
    ],
    application: "Best for residential shading and energy-efficient roofing.",
    images: ["/img-1.png", "/img-2.png", "/img-3.png", "/shade-banner.jpg"],
    attributes: {
      heatReflection: "50%",
      heatReduction: "10°C",
    },
  },

  // ================= SANITARY SERIES =================
  //   {
  //     id: "sanitary-nd31",
  //     name: "Sanitary Acrylic Sheet - ND 31",
  //     code: "ND31",
  //     category: "sanitary",
  //     price: 2800,
  //     inStock: true,
  //     description: "Sanitary acrylic sheet ND31 with smooth surface, ideal for molding into bathtubs and wash basins.",
  //     sizes: [
  //       { id: "sanitary-nd31-2450x2763-2.5", name: "2450 x 2763 mm - 2.5 mm", price: 2800, inStock: true, stockCount: 15 },
  //       { id: "sanitary-nd31-2450x2763-3.5", name: "2450 x 2763 mm - 3.5 mm", price: 3100, inStock: true, stockCount: 12 }
  //     ],
  //     features: ["Smooth surface for shape forming", "High moldability", "Durable and long-lasting"],
  //     application: "Used for forming bathtubs, sinks, and sanitary ware products.",
  //     images: ["/img-1.png", "/img-2.png", "/sanitary-banner.jpg"],
  //     attributes: {}
  //   },
  {
    id: "sanitary-nd33",
    name: "Sanitary Acrylic Sheet - ND 33",
    code: "ND33",
    category: "sanitary",
    mainCategory: "sanitary",
    price: 2850,
    inStock: true,
    description:
      "Sanitary acrylic sheet ND33 with consistent thickness, suitable for sanitary molding applications.",
    sizes: [
      {
        id: "sanitary-nd33-2450x2763-2.5",
        name: "2450 x 2763 mm - 2.5 mm",
        price: 2850,
        inStock: true,
        stockCount: 14,
      },
      {
        id: "sanitary-nd33-2450x2763-3.5",
        name: "2450 x 2763 mm - 3.5 mm",
        price: 3200,
        inStock: true,
        stockCount: 10,
      },
    ],
    features: ["Even surface", "Minimal impurities", "High moldability"],
    application:
      "Widely used in the production of sanitary ware like wash basins and bathtubs.",
    images: ["/sanitary/sanitary-banner.jpg"],
    attributes: {},
  },
  {
    id: "sanitary-nd09",
    name: "Sanitary Acrylic Sheet - ND 09",
    code: "ND09",
    category: "sanitary",
    mainCategory: "sanitary",
    price: 3000,
    inStock: true,
    description:
      "Sanitary acrylic sheet ND09 with 4 mm thickness, durable and suitable for heavy-duty sanitary applications.",
    sizes: [
      {
        id: "sanitary-nd09-2450x2763-4",
        name: "2450 x 2763 mm - 4 mm",
        price: 3000,
        inStock: true,
        stockCount: 11,
      },
    ],
    features: [
      "Extra durability",
      "High quality molding surface",
      "Smooth and strong",
    ],
    application:
      "Designed for sanitary ware applications requiring stronger sheets.",
    images: ["/sanitary/sanitary-banner-shinkolite-01.jpg"],
    attributes: {},
  },
  {
    id: "adv-001",
    name: "Advertising Acrylic Sheet",
    category: "advertising",
    mainCategory: "advertising",
    price: 1500,
    inStock: true,
    description:
      "High-quality acrylic sheets for advertising applications with multiple color options and excellent durability.",
    thicknessRange: "1.5–10 mm",
    sizes: [
      {
        id: "sp-430s-1380x3000",
        name: "1230 x 2450 mm",
        price: 1650,
        inStock: true,
        stockCount: 18,
      },
      {
        id: "sp-430s-1380x6000",
        name: "1230 x 1840 mm",
        price: 3000,
        inStock: true,
        stockCount: 9,
      },
    ],
    maxCustomSize: { width: "2763 mm", length: "6000 mm" },
    features: [
      "Wide range of vibrant colors",
      "Excellent weather resistance",
      "High light transmission",
      "Perfect for indoor and outdoor signage",
    ],
    application: "Used for signboards, displays, and advertising panels.",
    images: [
      "/advertise/signage.jpg",
      "/advertise/advertising-banner-shinkolite-03.jpg",
    ],
    attributes: {},
    variants: [
      { colorName: "Red", code: "R136", image: "/colors/red.png" },
      { colorName: "Black", code: "502", image: "/colors/black.png" },
      { colorName: "White", code: "430", image: "/colors/white.png" },
      {
        colorName: "Frost White",
        code: "N157",
        image: "/colors/frost-white.png",
      },
    ],
  },


  {
  id: "interior-l001",
  name: "Interior Acrylic Sheet - Clear",
  code: "L-001",
  category: "interior",
  mainCategory: "interior",
  price: 2200,
  inStock: true,
  description: "Clear acrylic sheet for interior applications with excellent transparency and smooth finish.",
  thicknessRange: "1.7 mm – 9.7 mm",
  sizes: [
    { id: "interior-l001-1220x2440", name: "1220 x 2440 mm", price: 2200, inStock: true, stockCount: 25 }
  ],
  features: ["High transparency", "Durable and lightweight", "Smooth surface finish"],
  application: "Ideal for decorative interior designs, furniture, and lighting applications.",
  images: ["/img-1.png", "/img-2.png"],
  attributes: {
    lightTransmission: "90%"
  }
}
];
