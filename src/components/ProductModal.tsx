/**
 * ProductModal — Maison Belle
 * Modal de detalle de producto con galería de imágenes, descripción,
 * selector de color y botón de añadir al carrito.
 */
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Ruler, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [activeImg, setActiveImg]         = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded]                 = useState(false);

  /* Reset al cambiar de producto */
  useEffect(() => {
    if (selectedProduct) {
      setActiveImg(0);
      setSelectedColor(selectedProduct.colors[0]);
      setAdded(false);
    }
  }, [selectedProduct]);

  /* Cerrar con Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedProduct(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSelectedProduct]);

  if (!selectedProduct) return null;

  const { name, category, price, originalPrice, images, badge, badgeColor,
          description, materials, dimensions, colors } = selectedProduct;

  const prevImg = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % images.length);

  const handleAdd = () => {
    addToCart(selectedProduct, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-deep-brown/50 backdrop-blur-sm animate-fade-in"
      onClick={() => setSelectedProduct(null)}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-background rounded-2xl shadow-card overflow-hidden flex flex-col md:flex-row animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Galería ── */}
        <div className="relative md:w-1/2 bg-muted flex-shrink-0">
          <img
            key={activeImg}
            src={images[activeImg]}
            alt={`${name} – foto ${activeImg + 1}`}
            className="w-full h-72 md:h-full object-cover animate-fade-in"
            style={{ maxHeight: "560px" }}
          />

          {/* Badge */}
          {badge && (
            <span className={`absolute top-4 left-4 text-[10px] font-sans font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${badgeColor}`}>
              {badge}
            </span>
          )}

          {/* Descuento */}
          {discount && (
            <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}

          {/* Flechas de galería */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background shadow-soft transition-all duration-200"
              >
                <ChevronLeft size={18} className="text-foreground" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background shadow-soft transition-all duration-200"
              >
                <ChevronRight size={18} className="text-foreground" />
              </button>
            </>
          )}

          {/* Miniaturas */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === activeImg ? "border-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Info ── */}
        <div className="md:w-1/2 flex flex-col overflow-y-auto p-7 gap-5">
          {/* Cerrar */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-secondary transition-colors duration-200 z-10"
          >
            <X size={18} className="text-foreground" />
          </button>

          {/* Categoría + Nombre */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
              {category}
            </p>
            <h2 className="font-serif text-3xl text-deep-brown">{name}</h2>
          </div>

          {/* Precio */}
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-3xl font-bold text-primary">€{price}</span>
            {originalPrice && (
              <span className="font-sans text-base text-muted-foreground line-through">
                €{originalPrice}
              </span>
            )}
            {discount && (
              <span className="font-sans text-xs font-bold text-destructive">
                Ahorro €{originalPrice! - price}
              </span>
            )}
          </div>

          {/* Descripción */}
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {/* Separador dorado */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Detalles */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3">
              <Package size={15} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">Materiales</p>
                <p className="font-sans text-sm text-foreground">{materials}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ruler size={15} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">Dimensiones</p>
                <p className="font-sans text-sm text-foreground">{dimensions}</p>
              </div>
            </div>
          </div>

          {/* Selector de color */}
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
              Color: <span className="text-foreground">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`font-sans text-xs px-4 py-2 rounded-sm border transition-all duration-200 ${
                    selectedColor === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            className={`mt-auto w-full flex items-center justify-center gap-2 font-sans text-xs tracking-widest uppercase py-4 rounded-sm transition-all duration-300 ${
              added
                ? "bg-gold text-accent-foreground"
                : "bg-deep-brown text-cream hover:bg-primary"
            }`}
          >
            <ShoppingBag size={15} />
            {added ? "¡Añadido al carrito! ✓" : "Añadir al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
