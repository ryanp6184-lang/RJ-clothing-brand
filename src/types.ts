export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Architectural Wool Coat",
    price: 850,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    category: "Outerwear",
    tag: "Limited Edition",
    stock: 3
  },
  {
    id: "2",
    name: "Silk Layering Shirt",
    price: 320,
    image: "https://images.unsplash.com/photo-1594932224037-940028b9d077?q=80&w=800&auto=format&fit=crop",
    category: "Tops",
    stock: 12
  },
  {
    id: "3",
    name: "Pleated Tapered Trousers",
    price: 450,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    category: "Bottoms",
    tag: "Featured",
    stock: 8
  },
  {
    id: "4",
    name: "Handcrafted Leather Chelsea",
    price: 590,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop",
    category: "Footwear",
    tag: "Restock",
    stock: 5
  },
  {
    id: "5",
    name: "Cashmere Oversized Scarf",
    price: 280,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
    category: "Accessories",
    stock: 15
  },
  {
    id: "6",
    name: "Midnight Satin Slip Dress",
    price: 640,
    image: "https://images.unsplash.com/photo-1539008835279-434693882754?q=80&w=800&auto=format&fit=crop",
    category: "Dresses",
    tag: "Limited Edition",
    stock: 2
  }
];
