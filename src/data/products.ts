export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  brand: string
  features: string[]
  specifications: Record<string, string>
  variants?: {
    type: string
    options: string[]
  }[]
  tags: string[]
  isFeatured?: boolean
  isBestseller?: boolean
  isNewArrival?: boolean
  reviews?: Array<{
    id: string
    author: string
    rating: number
    title: string
    content: string
    verified: boolean
    helpfulCount: number
    date: string
  }>
}

export interface Category {
  id: string
  name: string
  icon: string
  subcategories: string[]
  image: string
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "Smartphone",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories", "Audio"],
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"],
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: "Home",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Garden", "Building Materials"],
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: "Dumbbell",
    subcategories: ["Fitness", "Outdoor", "Team Sports", "Water Sports", "Camping"],
    image: "https://images.unsplash.com/photo-1461896836934- voices-1ac82db46af4?w=400&h=300&fit=crop",
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    icon: "Sparkles",
    subcategories: ["Skincare", "Makeup", "Haircare", "Wellness", "Fragrances"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
  },
  {
    id: "books",
    name: "Books & Media",
    icon: "BookOpen",
    subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics", "Magazines"],
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones Pro",
    description:
      "Experience crystal-clear audio with our flagship noise-cancelling headphones. Features 40-hour battery life, premium memory foam ear cushions, and advanced Bluetooth 5.3 technology.",
    price: 299.99,
    originalPrice: 399.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    subcategory: "Audio",
    rating: 4.8,
    reviewCount: 2547,
    inStock: true,
    stockCount: 150,
    brand: "AudioMax",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Premium memory foam cushions",
      "Bluetooth 5.3",
      "Multi-device connectivity",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohms",
      Weight: "250g",
    },
    variants: [{ type: "Color", options: ["Midnight Black", "Pearl White", "Navy Blue"] }],
    tags: ["wireless", "noise-cancelling", "premium"],
    isFeatured: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Ultra-Slim Laptop 15 Pro",
    description:
      "Powerful performance meets stunning design. Featuring the latest processor, 16GB RAM, and a gorgeous 4K OLED display in an incredibly thin profile.",
    price: 1299.99,
    originalPrice: 1499.99,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    subcategory: "Laptops",
    rating: 4.7,
    reviewCount: 1823,
    inStock: true,
    stockCount: 45,
    brand: "TechPro",
    features: ["4K OLED Display", "Latest Gen Processor", "16GB DDR5 RAM", "512GB NVMe SSD", "Thunderbolt 4 ports"],
    specifications: {
      "Screen Size": "15.6 inches",
      Resolution: "3840 x 2160",
      "Battery Life": "Up to 12 hours",
      Weight: "1.4kg",
    },
    variants: [
      { type: "Storage", options: ["512GB", "1TB", "2TB"] },
      { type: "Color", options: ["Space Gray", "Silver"] },
    ],
    tags: ["laptop", "ultrabook", "4k"],
    isFeatured: true,
  },
  {
    id: "3",
    name: "Smart Watch Series X",
    description:
      "Your ultimate fitness and lifestyle companion. Track your health, stay connected, and look great with our most advanced smartwatch yet.",
    price: 449.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    subcategory: "Accessories",
    rating: 4.6,
    reviewCount: 3421,
    inStock: true,
    stockCount: 200,
    brand: "SmartLife",
    features: [
      "Always-on Retina display",
      "Blood oxygen monitoring",
      "ECG app",
      "Water resistant 50m",
      "GPS + Cellular",
    ],
    specifications: {
      Display: "1.9 inch OLED",
      "Battery Life": "18 hours",
      "Water Resistance": "50 meters",
      Storage: "32GB",
    },
    variants: [
      { type: "Size", options: ["41mm", "45mm"] },
      { type: "Band", options: ["Sport Band", "Leather", "Steel Mesh"] },
    ],
    tags: ["smartwatch", "fitness", "health"],
    isBestseller: true,
  },
  {
    id: "4",
    name: "Designer Leather Jacket",
    description:
      "Timeless style meets modern craftsmanship. This genuine leather jacket features premium materials and expert tailoring for a perfect fit.",
    price: 399.99,
    originalPrice: 549.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop",
    ],
    category: "fashion",
    subcategory: "Men's Clothing",
    rating: 4.9,
    reviewCount: 856,
    inStock: true,
    stockCount: 30,
    brand: "UrbanStyle",
    features: ["100% Genuine Leather", "Quilted lining", "YKK zippers", "Multiple pockets", "Adjustable waist"],
    specifications: {
      Material: "Genuine Cowhide Leather",
      Lining: "Polyester",
      Closure: "Zipper",
      Care: "Professional leather care",
    },
    variants: [
      { type: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { type: "Color", options: ["Black", "Brown", "Tan"] },
    ],
    tags: ["leather", "jacket", "premium"],
    isFeatured: true,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair Pro",
    description:
      "Work in comfort all day long. This premium ergonomic chair features adjustable lumbar support, breathable mesh, and customizable armrests.",
    price: 549.99,
    originalPrice: 699.99,
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop",
    ],
    category: "home",
    subcategory: "Furniture",
    rating: 4.7,
    reviewCount: 1245,
    inStock: true,
    stockCount: 75,
    brand: "ComfortPlus",
    features: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "4D adjustable armrests",
      "Tilt lock mechanism",
      "Premium casters",
    ],
    specifications: {
      "Weight Capacity": "300 lbs",
      "Seat Height": "17-21 inches",
      Warranty: "10 years",
      Assembly: "Required",
    },
    variants: [{ type: "Color", options: ["Black", "Gray", "Blue"] }],
    tags: ["office", "ergonomic", "chair"],
    isBestseller: true,
  },
  {
    id: "6",
    name: "Professional DSLR Camera Kit",
    description:
      "Capture life's moments in stunning detail. This professional camera kit includes everything you need to start your photography journey.",
    price: 1899.99,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop",
    ],
    category: "electronics",
    subcategory: "Accessories",
    rating: 4.8,
    reviewCount: 678,
    inStock: true,
    stockCount: 25,
    brand: "ProShot",
    features: [
      "45.7 Megapixel sensor",
      "4K 60fps video",
      "Dual card slots",
      "Weather sealed body",
      "5-axis stabilization",
    ],
    specifications: {
      Sensor: "Full Frame CMOS",
      "ISO Range": "64-25600",
      "Autofocus Points": "493",
      "Shutter Speed": "1/8000 - 30s",
    },
    tags: ["camera", "photography", "professional"],
    isNewArrival: true,
  },
  {
    id: "7",
    name: "Running Shoes Ultra Boost",
    description:
      "Engineered for performance. These running shoes feature responsive cushioning and a breathable upper for your best run yet.",
    price: 179.99,
    originalPrice: 219.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    ],
    category: "sports",
    subcategory: "Fitness",
    rating: 4.6,
    reviewCount: 2134,
    inStock: true,
    stockCount: 180,
    brand: "RunPro",
    features: [
      "Responsive cushioning",
      "Breathable mesh upper",
      "Continental rubber outsole",
      "Sock-like fit",
      "Reflective details",
    ],
    specifications: {
      Weight: "310g",
      Drop: "10mm",
      Type: "Neutral",
      Surface: "Road",
    },
    variants: [
      { type: "Size", options: ["7", "8", "9", "10", "11", "12"] },
      { type: "Color", options: ["Black/White", "Blue/Orange", "Gray/Red"] },
    ],
    tags: ["running", "shoes", "athletic"],
    isBestseller: true,
  },
  {
    id: "8",
    name: "Luxury Skincare Set",
    description:
      "Transform your skincare routine with our premium collection. Includes cleanser, serum, moisturizer, and eye cream for complete care.",
    price: 249.99,
    originalPrice: 320.0,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    ],
    category: "beauty",
    subcategory: "Skincare",
    rating: 4.9,
    reviewCount: 1567,
    inStock: true,
    stockCount: 60,
    brand: "GlowLux",
    features: [
      "Organic ingredients",
      "Dermatologist tested",
      "Cruelty-free",
      "Suitable for all skin types",
      "Anti-aging formula",
    ],
    specifications: {
      Cleanser: "150ml",
      Serum: "30ml",
      Moisturizer: "50ml",
      "Eye Cream": "15ml",
    },
    tags: ["skincare", "luxury", "organic"],
    isNewArrival: true,
    isFeatured: true,
  },
  {
    id: "9",
    name: "Premium Birch Plywood 3/4\" x 4' x 8'",
    description:
      "High-quality birch plywood ideal for furniture, cabinetry, and construction projects. A+ Grade veneer with excellent strength and durability.",
    price: 89.99,
    originalPrice: 109.99,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45e003008e2e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607984307792-5d0c3f09d8b0?w=600&h=600&fit=crop",
    ],
    category: "home",
    subcategory: "Building Materials",
    rating: 4.7,
    reviewCount: 342,
    inStock: true,
    stockCount: 120,
    brand: "Global Imports",
    features: [
      "A+ Grade Veneer",
      "Excellent strength-to-weight ratio",
      "Moisture resistant",
      "Smooth surface finish",
      "FSC Certified",
    ],
    specifications: {
      Material: "Birch Plywood",
      Thickness: "3/4 inch",
      Length: "8 feet",
      Width: "4 feet",
      Grade: "A+",
      Weight: "95 lbs",
    },
    variants: [
      { type: "Thickness", options: ['1/4"', '1/2"', '3/4"', '1"'] },
      { type: "Grade", options: ["A+", "A", "B", "C"] },
    ],
    tags: ["plywood", "construction", "furniture"],
    isFeatured: true,
    isBestseller: true,
    reviews: [
      {
        id: "1",
        author: "John Smith",
        rating: 5,
        title: "Excellent quality plywood",
        content:
          "Used this for a kitchen cabinet project. The veneer is flawless and the wood is straight. Highly recommended!",
        verified: true,
        helpfulCount: 24,
        date: "2024-01-15",
      },
      {
        id: "2",
        author: "Sarah Johnson",
        rating: 4,
        title: "Great value for money",
        content: "Good quality plywood at a reasonable price. Shipped well packaged and arrived without damage.",
        verified: true,
        helpfulCount: 18,
        date: "2024-01-10",
      },
    ],
  },
  {
    id: "10",
    name: "Oak Plywood 1/2\" x 4' x 8' - Premium Grade",
    description:
      "Beautiful oak plywood with a stunning natural grain. Perfect for fine furniture, decorative panels, and high-end cabinetry projects.",
    price: 129.99,
    originalPrice: 159.99,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    ],
    category: "home",
    subcategory: "Building Materials",
    rating: 4.9,
    reviewCount: 287,
    inStock: true,
    stockCount: 85,
    brand: "Global Imports",
    features: [
      "Premium oak veneer",
      "Uniform grain pattern",
      "Stain-ready surface",
      "Water resistant core",
      "Eco-friendly sourced",
    ],
    specifications: {
      Material: "Oak Plywood",
      Thickness: "1/2 inch",
      Length: "8 feet",
      Width: "4 feet",
      Grade: "Premium A+",
      Weight: "75 lbs",
    },
    variants: [
      { type: "Thickness", options: ['1/4"', '1/2"', '3/4"'] },
      { type: "Finish", options: ["Natural", "Pre-stained", "Pre-finished"] },
    ],
    tags: ["plywood", "oak", "furniture"],
    isNewArrival: true,
    isFeatured: true,
    reviews: [
      {
        id: "1",
        author: "Mike Davis",
        rating: 5,
        title: "Beautiful grain pattern",
        content:
          "The oak veneer has an absolutely beautiful grain. Made a gorgeous bookshelf and customers are asking where I got it!",
        verified: true,
        helpfulCount: 31,
        date: "2024-01-20",
      },
    ],
  },
  {
    id: "11",
    name: "Maple Plywood 3/4\" x 4' x 8'",
    description:
      "High-quality hard maple plywood for fine woodworking. Excellent for guitar bodies, musical instruments, and premium furniture.",
    price: 149.99,
    originalPrice: 189.99,
    images: [
      "https://images.unsplash.com/photo-1516535541661-29a1b244cc32?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579452545215-cf4502b2c1c8?w=600&h=600&fit=crop",
    ],
    category: "home",
    subcategory: "Building Materials",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    stockCount: 45,
    brand: "Global Imports",
    features: [
      "Hard maple veneer",
      "Premium grade A+ thickness",
      "Excellent stain receptivity",
      "Superior stability",
      "Premium wood quality",
    ],
    specifications: {
      Material: "Hard Maple Plywood",
      Thickness: "3/4 inch",
      Length: "8 feet",
      Width: "4 feet",
      Grade: "A+",
      Weight: "110 lbs",
    },
    variants: [
      { type: "Thickness", options: ['1/2"', '3/4"', '1"'] },
      { type: "Veneer Pattern", options: ["Book Match", "Slip Match", "Random"] },
    ],
    tags: ["plywood", "maple", "premium", "woodworking"],
    isBestseller: true,
    reviews: [
      {
        id: "1",
        author: "Robert Wilson",
        rating: 5,
        title: "Perfect for guitar making",
        content:
          "Used this for my custom guitar project. The stability and consistent grain are exactly what I needed. Excellent quality!",
        verified: true,
        helpfulCount: 28,
        date: "2024-01-18",
      },
    ],
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id)
}

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((p) => p.category === categoryId)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured)
}

export const getBestsellers = (): Product[] => {
  return products.filter((p) => p.isBestseller)
}

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNewArrival)
}

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(lowerQuery)),
  )
}
