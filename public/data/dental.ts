// src/data/dental.ts

export interface ProductImage {
  id: number;
  img: string;
  color?: string;
  colorName?: string;
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Product {
  id: number;
  name: string;
  navic_id: string;
  category: string;
  subTitle: string;
  description: string;
  features: ProductFeature[];
  images: ProductImage[];
}

export const productData: Product[] = [
  {
    id: 2,
    name: "MODEL 3",
    category: "Dental",
    navic_id: "model_3",
    subTitle: "3D Photopolymer Dental resin for vacuum/pressure thermoforming",
    description:
      "Resinwork®️ Model 3 is an advanced, IPA & water-washable 3D printing resin engineered specifically for dental thermoforming applications. Designed to deliver high thermal resistance and dimensional accuracy, Model 3 ensures reliable performance under vacuum and pressure forming conditions.Formulated with Resinwork's proprietary Anti-Stick Surface Chemistry, Model 3 enables effortless removal of thermoformed appliances—such as retainers, aligners, nightguards, and sportguards—without damage to the model or appliance. This unique surface release property significantly reduces the risk of breakage and enhances workflow efficiency in dental labs.Unlike conventional resins, Model 3 features a stable, matte finish that resists sticking to heated substrates and ensures consistent results. Its high pigment stability eliminates the need for frequent mixing, while its water-washable composition provides safe, eco- friendly handling—no alcohol or chemical cleaners required.Whether you're fabricating clear aligners or custom appliances, Resinwork Model 3 is your go-to solution for dependable, lab-grade performance.",
    features: [
      {
        id: 1,
        title: "IPA & Water Washable",
        description:
          "Resinwork® Model 3 is an advanced, IPA & water-washable 3D printing resin engineered specifically for dental thermoforming applications. Designed to deliver high thermal resistance and dimensional accuracy, Model 3 ensures reliable performance under vacuum and pressure forming conditions.",
      },
      {
        id: 2,
        title: "Anti-Stick Formula",
        description:
          "Formulated with Resinwork's proprietary Anti-Stick Surface Chemistry, Model 3 enables effortless removal of thermoformed appliances—such as retainers, aligners, nightguards, and sportguards—without damage to the model or appliance. This unique surface release property significantly reduces the risk of breakage and enhances workflow efficiency in dental labs.",
      },
      {
        id: 3,
        title: "Thermoformable & Heat-Resistant",
        description:
          "Unlike conventional resins, Model 3 features a stable, matte finish that resists sticking to heated substrates and ensures consistent results. Its high pigment stability eliminates the need for frequent mixing, while its water-washable composition provides safe, eco- friendly handling—no alcohol or chemical cleaners required.",
      },
      {
        id: 4,
        title: "Lab Grade",
        description:
          "Whether you're fabricating clear aligners or custom appliances, Resinwork Model 3 is your go-to solution for dependable, lab-grade performance.",
      },
    ],
    images: [
      { id: 3, img: "/product-img/s-p1.png" },
      { id: 1, img: "/product-img/s-p4.png" },
      { id: 4, img: "/product-img/s-p3.png" },
      {
        id: 5,
        img: "/product-img/new1.png",
        color: "#808080",
        colorName: "Gray",
      },
      { id: 6, img: "/product-img/s-p5.png", color: "#FFFFFF" },
    ],
  },
  {
    id: 1,
    name: "MODEL 2",
    navic_id: "model_2",
    category: "Dental",
    subTitle: "Water-Washable Photopolymer for Dental Modelling ",
    description:
      "Resinwork Model 2 is a water-washable photopolymer (light-curable) polymerisable resin for 3D printing dental models, which can be used for multiple purposes such as: Study Models, Removable Die-Models, Models to thermoform or fabricate aligners and retainers. It is a specially formulated precise dental resin with a gypsum like texture having excellent dimensional accuracy, thermoforming ability, offers very low shrinkage and high level of detail sufficient for accurate modelling of teeth at a low cost per part.",
    features: [
      {
        id: 1,
        title: "Water Washable",
        description:
          "Unlike traditional resins that require alcohol or other solvents for post-processing, Resinwork® Model 2 can be easily cleaned with just water, simplifying the workflow, reducing chemical usage, and ensuring a safer and more environmentally friendly operation.",
      },
      {
        id: 2,
        title: "Exceptional Dimensional Accuracy",
        description:
          "Formulated with minimal shrinkage properties, Resinwork® Model 2 ensures highly accurate models with precise fitment—critical for producing reliable dental appliances and ensuring patient comfort. ",
      },
      {
        id: 3,
        title: "Thermoformable & Heat-Resistant",
        description:
          "The cured resin maintains structural integrity under heat and pressure, making it perfectly suited for vacuum forming processes to fabricate clear aligners, mouthguards, and retainers. ",
      },
      {
        id: 4,
        title: "Excellent Accuracy",
        description:
          "Digitally build wax up models to show patients the results they can look forward to based on your treatment plans.  ",
      },
    ],
    images: [
      { id: 1, img: "/product-img/f-main.png" },
      { id: 1, img: "/product-img/f-p1.png" },
      { id: 2, img: "/product-img/f-p2.png" },
      { id: 3, img: "/product-img/f-p3.png" },
      {
        id: 4,
        img: "/product-img/f-p4.png",
        color: "#E3CBA4",
        colorName: "Birch Beige",
      },
      {
        id: 5,
        img: "/product-img/f-p5.png",
        color: "#E5E5E5",
        colorName: "Transparent",
      },
      {
        id: 6,
        img: "/product-img/new1.png",
        color: "#808080",
        colorName: "Gray",
      },
      {
        id: 7,
        img: "/product-img/f-p6.png",
        color: "#FFFFFF",
        colorName: "White",
      },
    ],
  },
  {
    id: 3,
    name: "Surgical Guides",
    category: "Dental",
    navic_id: "surgical_guide",
    subTitle:
      "3D print highly-accurate surgical guides for just a few dollars.",
    description:
      "Receive all the clinical benefits of guided surgery with rapid turnaround times and minimal material cost by printing guides in-office. Upload your scan and CBCT data to Resinwork Cloud Design and receive printable 3D files designed specifically for Resinwork Pro. 3D print the surgical guide in as little as 30 minutes. Immediately insert surgical guide sleeves post-print for increased precision, then post-process and sterilize. Resinwork Surgical Guide 2 resin features excellent mechanical properties and can be sterilized using standard autoclave protocols without affecting dimensional accuracy.",
    features: [
      {
        id: 1,
        title: "Full-Arch Surgical Guides",
        description:
          "With Resinwork Pro, you can fabricate surgical guides of all kinds, including full-arch multi-site implant guides, bone reduction guides, and more.",
        icon: "/category-section/1.svg",
      },
      {
        id: 2,
        title: "Quadrant Implant Guides",
        description:
          "For single-unit dental implants, 3D printing provides a rapid, repeatable workflow for the production of implant guides. Simply scan, order your design with Dashboard Design, and fabricate your FDA-compliant guide. ",
        icon: "/category-section/2.svg",
      },
      {
        id: 3,
        title: "Fabricate precision",
        description:
          "A recent university study found Resinwork Pro more accurate and consistent than traditional alginate methods. ",
        icon: "/category-section/3.svg",
      },
      {
        id: 4,
        title: "Economical",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe.  ",
        icon: "/category-section/4.svg",
      },
    ],
    images: [
      { id: 1, img: "/product-img/tmain.png" },
      { id: 2, img: "/product-img/t1.png" },
      { id: 3, img: "/product-img/t2.png" },
    ],
  },
  {
    id: 4,
    category: "Dental",
    navic_id: "splints",
    name: "Splints & Night Guards",
    subTitle:
      "Grow your practice with the most approachable workflow in 3D printing",
    description:
      "Help fight the rise in grinding and clenching by delivering more night guards with Resinwork. Featuring the industry's easiest workflow including AI design, 3D printing, and simple post processing, you can go from scan to place in less than an hour. With long-lasting materials that become flexible at body temperature and a no-CAD design system, protecting smiles has never been this affordable, repeatable, and profitable.",
    features: [
      {
        id: 1,
        title: "Clinically formulated for translucency",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/1.svg",
      },
      {
        id: 2,
        title: "Improved flexibility ",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/2.svg",
      },
      {
        id: 3,
        title: "fracture toughness vs first generation",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/3.svg",
      },
      {
        id: 4,
        title: "Impact Strength",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/4.svg",
      },
      {
        id: 5,
        title: "Resistance to Scratching",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe.",
        icon: "/category-section/4.svg",
      },
    ],
    images: [
      { id: 1, img: "/product-img/p4-main.png" },
      { id: 2, img: "/product-img/p4-1.png" },
    ],
  },
  {
    id: 5,
    name: "Digital Dentures",
    navic_id: "dentures",
    category: "Dental",
    subTitle:
      "Grow your practice with the most approachable workflow in 3D printing",
    description:
      "Help fight the rise in grinding and clenching by delivering more night guards with Resinwork. Featuring the industry's easiest workflow including AI design, 3D printing, and simple post processing, you can go from scan to place in less than an hour. With long-lasting materials that become flexible at body temperature and a no-CAD design system, protecting smiles has never been this affordable, repeatable, and profitable.",
    features: [
      {
        id: 1,
        title: "Clinically formulated for translucency",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/1.svg",
      },
      {
        id: 2,
        title: "Improved flexibility ",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/2.svg",
      },
      {
        id: 3,
        title: "fracture toughness vs first generation ",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/3.svg",
      },
      {
        id: 4,
        title: "Impact Strength",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe ",
        icon: "/category-section/4.svg",
      },
      {
        id: 5,
        title: "Resistance to Scratching",
        description:
          "Highly scalable platform for processing bulk & online remittance transactions  received from Exchange Houses across the globe.",
        icon: "/category-section/4.svg",
      },
    ],
    images: [
      { id: 1, img: "/product-img/new2.png" },
    ],
  },
];

export const dentalProducts: Product[] = productData.filter(
  (product) => product.category === "Dental"
);