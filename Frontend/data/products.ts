export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  link?: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "iphone-17-pro-max-savanna-series-genuine-santa-barbara-leather-case",
    title: "iPhone 17 Pro Max Savanna Series Genuine Caseoholic Leather Case",
    description: `Caseoholic Polo & Racquet Club ® Leather Savanna Case, an excellent choice for your iPhone 17 Pro Max. This Case is designed with threaded emboidery on the leather that gives vintage look to your iPhone.

Features
Compatible Brand: Apple.
Compatible Model: iPhone 17 Pro Max.
Genuine Leather
Threaded Emboidery
Precise fitting of buttons
Embodying the lush polo fields and lively spirit that define Caseoholic, each Caseoholic Polo & Racquet phone case boasts superior quality and design - a testament to 100 years of rich heritage.`,
    price: 1500,
    images: ["/product1_1.webp", "/product1_2.webp", "/product1_3.webp"],
  },
  {
    id: "2",
    slug: "iphone-17-pro-max-justin-series-genuine-santa-barbara-leather-case",
    title: "iPhone 17 Pro Max Justin Series Genuine Caseoholic Leather Case",
    description: `Caseoholic Polo & Racquet Club ® Leather Justin Case, an excellent choice for your iPhone 17 Pro. This Case is designed with threaded emboidery on the leather that gives vintage look to your iPhone.

Features
Compatible Brand: Apple.
Compatible Model: iPhone 17 Pro.
Genuine Leather
Threaded Emboidery
Precise fitting of buttons
Embodying the lush polo fields and lively spirit that define Caseoholic, each Caseoholic Polo & Racquet phone case boasts superior quality and design - a testament to 100 years of rich heritage.`,
    price: 1600,
    images: ["/product2_1.webp", "/product2_2.webp", "/product2_3.webp"],
  },
  {
    id: "3",
    slug: "iphone-17-pro-max-boris-series-genuine-santa-barbara-leather-case",
    title: "iPhone 17 Pro Max Boris Series Genuine Caseoholic Leather Case",
    description: `Caseoholic Polo & Racquet Club ® Leather Boris Case, an excellent choice for your iPhone 17 Pro Max. This Case is designed with threaded emboidery on the leather that gives vintage look to your iPhone.

Features
Compatible Brand: Apple.
Compatible Model: iPhone 17 Pro Max.
Genuine Leather
Threaded Emboidery
Precise fitting of buttons
Embodying the lush polo fields and lively spirit that define Caseoholic, each Caseoholic Polo & Racquet phone case boasts superior quality and design - a testament to 100 years of rich heritage.`,
    price: 1400,
    images: ["/product3_1.webp", "/product3_2.webp", "/product3_3.webp"],
  },
  {
    id: "4",
    slug: "iphone-17-pro-max-primo-series-genuine-santa-barbara-leather-case",
    title: "iPhone 17 Pro Max Primo Series Genuine Caseoholic Leather Case",
    description: `Caseoholic Polo & Racquet Club ® Leather Primo Case, an excellent choice for your iPhone 17 Pro Max. This Case is designed with threaded emboidery on the leather that gives vintage look to your iPhone.

Features
Compatible Brand: Apple.
Compatible Model: iPhone 17 Pro Max.
Genuine Leather
Threaded Emboidery
Precise fitting of buttons
Embodying the lush polo fields and lively spirit that define Caseoholic, each Caseoholic Polo & Racquet phone case boasts superior quality and design - a testament to 100 years of rich heritage.`,
    price: 1600,
    images: ["/product4_1.webp", "/product4_2.webp", "/product4_3.webp"],
  },
];
