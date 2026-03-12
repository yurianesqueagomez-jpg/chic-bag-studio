/**
 * FeaturedProducts — Maison Belle
 * Cuadrícula de productos destacados. Al hacer clic en la imagen o en
 * el nombre abre el modal de detalle; el botón añade al carrito.
 */
import { useState } from "react";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { useCart, PRODUCTS } from "@/context/CartContext";

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart, setSelectedProduct } = useCart();

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
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gold/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gold/50" />
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <article
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-400 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Imagen */}
              <div
                className="relative overflow-hidden aspect-[3/4] cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.images[0]}
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
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-cream/80 backdrop-blur-sm hover:bg-cream transition-colors duration-200"
                >
                  <Heart
                    size={16}
                    className={wishlist.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"}
                  />
                </button>

                {/* Overlay ver detalle */}
                <div className="absolute inset-0 bg-deep-brown/0 group-hover:bg-deep-brown/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-background/90 text-foreground font-sans text-[11px] tracking-wider uppercase px-4 py-2 rounded-full shadow-soft">
                    <Eye size={13} /> Ver detalle
                  </span>
                </div>
              </div>

              {/* Info del producto */}
              <div className="p-5">
                <p className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3
                  className="font-serif text-lg text-deep-brown mb-3 cursor-pointer hover:text-primary transition-colors duration-200"
                  onClick={() => setSelectedProduct(product)}
                >
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
                  onClick={() => addToCart(product, product.colors[0])}
                  className="w-full flex items-center justify-center gap-2 bg-deep-brown text-cream font-sans text-xs tracking-widest uppercase py-3 rounded-sm hover:bg-primary transition-colors duration-300"
                >
                  <ShoppingBag size={14} />
                  Añadir al carrito
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Ver todo */}
        <div className="text-center mt-12">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 border border-primary text-primary font-sans text-sm tracking-wider uppercase px-10 py-3.5 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Ver todo el catálogo
          </a>
        </div>
      </div>
    </section>
  );
}
