import { ShinkoliteProduct } from "./type";

export const nature : ShinkoliteProduct[]=[
     {
    id: "nt-001-cl",
    name: "Clear",
    code: "NT-001",
    category: "nature",
    heatcut: "10%",
    inStock: true,
    price: 1500,
    description: "Clear (Code NT-001) nature series acrylic sheet offers maximum light transmission with crystal clarity, perfect for applications requiring natural illumination and transparency.",
    specifications: {
      thickness: "6 mm",
      span: "50 cm",
      lightTransmission: "90%",
      heatcut: "10%"
    },
    features: [
      "Maximum light transmission at 90%",
      "Crystal clear transparency",
      "Natural light preservation",
      "UV-resistant acrylic material"
    ],
    application: "Perfect for greenhouses, skylights, conservatories, and applications where maximum natural light is essential.",
    images: ["/nt-001-1.png", "/nt-001-2.png", "/nt-001-3.png", "/shinkolite-nature-banner.jpg"],
    sizes: [
      {
        id: "nt-001-cl-1380x3000",
        name: "1380 x 3000 mm",
        price: 1600,
        inStock: true,
        stockCount: 35
      },
      {
        id: "nt-001-cl-1380x4000",
        name: "1380 x 4000 mm",
        price: 2100,
        inStock: true,
        stockCount: 28
      },
      {
        id: "nt-001-cl-1380x5000",
        name: "1380 x 5000 mm",
        price: 2600,
        inStock: true,
        stockCount: 22
      },
      {
        id: "nt-001-cl-1380x6000",
        name: "1380 x 6000 mm",
        price: 3100,
        inStock: true,
        stockCount: 15
      }
    ]
  },
  {
    id: "nt-332-lg",
    name: "Light Grey",
    code: "NT-332",
    category: "nature",
    heatcut: "30%",
    inStock: true,
    price: 1650,
    description: "Light Grey (Code NT-332) nature series acrylic sheet provides excellent light transmission with subtle grey tinting, offering balanced natural lighting with gentle heat reduction.",
    specifications: {
      thickness: "6 mm",
      span: "50 cm",
      lightTransmission: "70%",
      heatcut: "30%"
    },
    features: [
      "High light transmission at 70%",
      "Subtle light grey aesthetic",
      "Balanced natural lighting",
      "Moderate heat reduction properties"
    ],
    application: "Ideal for residential roofing, patios, garden structures, and areas requiring natural light with gentle shading.",
    images: ["/nt-332-1.png", "/nt-332-2.png", "/nt-332-3.png", "/shinkolite-nature-banner.jpg"],
    sizes: [
      {
        id: "nt-332-lg-1380x3000",
        name: "1380 x 3000 mm",
        price: 1750,
        inStock: true,
        stockCount: 30
      },
      {
        id: "nt-332-lg-1380x4000",
        name: "1380 x 4000 mm",
        price: 2250,
        inStock: true,
        stockCount: 24
      },
      {
        id: "nt-332-lg-1380x5000",
        name: "1380 x 5000 mm",
        price: 2750,
        inStock: true,
        stockCount: 18
      },
      {
        id: "nt-332-lg-1380x6000",
        name: "1380 x 6000 mm",
        price: 3250,
        inStock: true,
        stockCount: 12
      }
    ]
  }
]