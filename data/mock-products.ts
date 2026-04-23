import type { Product } from "@/types";

const now = new Date().toISOString();

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "mock-1",
    name: "Nova Buds Pro",
    slug: "nova-buds-pro",
    description:
      "Active noise cancellation, 32h battery with case, and studio-tuned drivers for daily commutes.",
    price: 129.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1590658260037-6b121765eace?auto=format&fit=crop&w=800&q=80",
    ],
    category: "earbuds",
    sku: "EAR-NOVA-001",
    stock: 42,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-2",
    name: "Pulse USB-C GaN Charger",
    slug: "pulse-gan-charger",
    description:
      "65W fast charging in a pocket-sized brick — ideal for laptops, tablets, and phones.",
    price: 49.5,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1583863788444-eab2ddfded77?auto=format&fit=crop&w=800&q=80",
    ],
    category: "chargers",
    sku: "CHG-PULSE-65",
    stock: 120,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "mock-3",
    name: "Orbit Smartwatch S2",
    slug: "orbit-smartwatch-s2",
    description:
      "AMOLED display, SpO2, sleep tracking, and 7-day battery for workouts and notifications.",
    price: 199,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    ],
    category: "smart-gadgets",
    sku: "WCH-ORBIT-S2",
    stock: 28,
    createdAt: now,
    updatedAt: now,
  },
];
