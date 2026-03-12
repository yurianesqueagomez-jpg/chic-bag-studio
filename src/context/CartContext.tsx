/**
 * CartContext — Maison Belle
 * Estado global del carrito de compras y del modal de producto.
 */
import { createContext, useContext, useState, ReactNode } from "react";
import bag1 from "@/assets/bag-1.jpg";
import bag2 from "@/assets/bag-2.jpg";
import bag3 from "@/assets/bag-3.jpg";
import bag4 from "@/assets/bag-4.jpg";

/* ===== Tipos ===== */
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  badge: string | null;
  badgeColor: string;
  description: string;
  materials: string;
  dimensions: string;
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  addToCart: (product: Product, color: string) => void;
  removeFromCart: (id: number, color: string) => void;
  updateQuantity: (id: number, color: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
}

/* ===== Datos de productos ===== */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tote Cognac",
    category: "Bolso de mano",
    price: 189,
    originalPrice: 240,
    images: [bag1, bag2],
    badge: "Más vendido",
    badgeColor: "bg-primary text-primary-foreground",
    description:
      "Un tote espacioso confeccionado en cuero genuino color cognac. Perfecto para el día a día, combina elegancia atemporal con practicidad. Su interior forrado en tela premium incluye bolsillo organizador con cremallera y dos compartimentos abiertos.",
    materials: "Cuero bovino de primera calidad, forro de algodón orgánico, herrajes dorados",
    dimensions: "38 × 28 × 14 cm · Asa: 55 cm",
    colors: ["Cognac", "Negro", "Camel"],
  },
  {
    id: 2,
    name: "Crossbody Terra",
    category: "Bolso cruzado",
    price: 129,
    originalPrice: null,
    images: [bag2, bag3],
    badge: "Nuevo",
    badgeColor: "bg-gold text-accent-foreground",
    description:
      "Diseño minimalista con correa ajustable de cuero. Ideal para viajes urbanos, su compartimento principal cierra con solapa magnética de seguridad. El cuero de grano grueso adquiere una pátina única con el uso.",
    materials: "Cuero vegetal de grano grueso, herrajes plateados, correa regulable",
    dimensions: "24 × 16 × 8 cm · Correa: 90–120 cm",
    colors: ["Terra", "Camel", "Burdeos"],
  },
  {
    id: 3,
    name: "Clutch Ivoire",
    category: "Bolso de mano",
    price: 99,
    originalPrice: 130,
    images: [bag3, bag4],
    badge: "Oferta",
    badgeColor: "bg-deep-brown text-cream",
    description:
      "Clutch de noche en cuero marfil con cierre de sobre y cadena desmontable. Elegante y versátil, transita con facilidad del día a la noche. El acabado suave al tacto aporta un toque de lujo discreto.",
    materials: "Cuero napa suave, forro de seda, cadena dorada de 110 cm",
    dimensions: "26 × 14 × 4 cm · Cadena: 110 cm",
    colors: ["Ivoire", "Nude", "Champagne"],
  },
  {
    id: 4,
    name: "Mochila Caramel",
    category: "Mochila",
    price: 159,
    originalPrice: null,
    images: [bag4, bag1],
    badge: null,
    badgeColor: "",
    description:
      "Mochila estructurada en cuero caramel con múltiples compartimentos organizadores. Combina la funcionalidad de una mochila con la elegancia de un bolso de lujo. Soporta hasta un portátil de 13 pulgadas.",
    materials: "Cuero full grain, refuerzos en cuero, correas acolchadas regulables",
    dimensions: "30 × 38 × 12 cm · Correas: ajustables",
    colors: ["Caramel", "Toffee", "Marrón oscuro"],
  },
];

/* ===== Context ===== */
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems]       = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen]         = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, color: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.selectedColor === color);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number, color: string) =>
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.selectedColor === color)));

  const updateQuantity = (id: number, color: string, delta: number) =>
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.selectedColor === color
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems, cartOpen, setCartOpen,
        selectedProduct, setSelectedProduct,
        addToCart, removeFromCart, updateQuantity,
        cartTotal, cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
