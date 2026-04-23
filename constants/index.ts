export const APP_NAME = "Precision Gear";

/** Storefront brand shown in Navbar / Hero (marketing). */
export const BRAND_NAME = "TechGear";

export const ROUTES = {
  home: "/",
  products: "/products",
  product: (id: string) => `/products/${id}`,
  categories: "/categories",
  deals: "/deals",
  wishlist: "/wishlist",
  cart: "/cart",
  checkout: "/checkout",
  account: "/account",
  orders: "/orders",
  admin: {
    root: "/admin",
    products: "/admin/products",
    orders: "/admin/orders",
  },
} as const;

export const PRODUCT_CATEGORIES = [
  "earbuds",
  "chargers",
  "smart-gadgets",
  "cables",
  "cases",
] as const;

export const COOKIE_SESSION = "session";
