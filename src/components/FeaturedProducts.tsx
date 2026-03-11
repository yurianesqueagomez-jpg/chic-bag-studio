/**
 * FeaturedProducts — Maison Belle
 * Cuadrícula de productos destacados con imagen, nombre, precio
 * y botón "Añadir al carrito".
 */
import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import bag1 from "@/assets/bag-1.jpg";
import bag2 from "@/assets/bag-2.jpg";
import bag3 from "@/assets/bag-3.jpg";
import bag4 from "@/assets/bag-4.jpg";

/* ===== Datos de productos — fácil de editar ===== */
const products = [
  {
    id: 1,
    name: "Tote Cognac",
    category: "Bolso de mano",
    price: 189,
    originalPrice: 240,
    image: bag1,
    badge: "Más vendido",
    badgeColor: "bg-primary text-primary-foreground",
  },
  {
    id: 2,
    name: "Crossbody Terra",
    category: "Bolso cruzado",
    price: 129,
    originalPrice: null,
    image: bag2,
    badge: "Nuevo",
    badgeColor: "bg-gold text-accent-foreground",
  },
  {
    id: 3,
    name: "Clutch Ivoire",
    category: "Bolso de mano",
    price: 99,
    originalPrice: 130,
    image: bag3,
    badge: "Oferta",
    badgeColor: "bg-deep-brown text-cream",
  },
  {
    id: 4,
    name: "Mochila Caramel",
    category: "Mochila",
    price: 159,
    originalPrice: null,
    image: bag4,
    badge: null,
    badgeColor: "",
  },
];

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  /* Añade al carrito llamando al handler global del Header */
  const handleAddToCart = (name: string) => {
    (window as any).addToCart?.();
    // Aquí podrías integrar un estado global de carrito
    const toast = document.getElementById("cart-toast");
    if (toast) {
      toast.textContent = `"${name}" añadido al carrito ✓`;
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
      setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.classList.add("opacity-0");
      }, 2500);
    }
  };

  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* Cabecera de sección */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-primary">
            Destacados
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-deep-brown mt-3 mb-4">
            Productos Estelares
          </h2>
          <p className="font-sans text-muted-foreground max-w-md mx-auto">
            Cada pieza es una obra de artesanía seleccionada por nuestro equipo
            de diseño.
          </p>
          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gold/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gold/50" />
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <article
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-400 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Imagen */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-sans font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  aria-label="Añadir a favoritos"
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-cream/80 backdrop-blur-sm hover:bg-cream transition-colors duration-200"
                >
                  <Heart
                    size={16}
                    className={wishlist.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"}
                  />
                </button>

                {/* Overlay rápido */}
                <div className="absolute inset-0 bg-deep-brown/0 group-hover:bg-deep-brown/5 transition-colors duration-300" />
              </div>

              {/* Info del producto */}
              <div className="p-5">
                <p className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-deep-brown mb-3">
                  {product.name}
                </h3>

                {/* Precio */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-sans text-xl font-bold text-primary">
                    €{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-sm text-muted-foreground line-through">
                      €{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Botón añadir al carrito */}
                <button
                  onClick={() => handleAddToCart(product.name)}
                  className="w-full flex items-center justify-center gap-2 bg-deep-brown text-cream font-sans text-xs tracking-widest uppercase py-3 rounded-sm hover:bg-primary transition-colors duration-300"
                >
                  <ShoppingBag size={14} />
                  Añadir al carrito
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Ver todo el catálogo */}
        <div className="text-center mt-12">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 border border-primary text-primary font-sans text-sm tracking-wider uppercase px-10 py-3.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Ver todo el catálogo
          </a>
        </div>
      </div>

      {/* Toast de carrito */}
      <div
        id="cart-toast"
        className="fixed bottom-6 right-6 z-50 bg-deep-brown text-cream font-sans text-sm px-5 py-3 rounded-lg shadow-card opacity-0 transition-opacity duration-300 pointer-events-none"
      />
    </section>
  );
}
