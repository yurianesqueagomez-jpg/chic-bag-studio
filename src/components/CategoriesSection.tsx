/**
 * CategoriesSection — Maison Belle
 * Carrusel de categorías con flechas navegables.
 */
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ===== Datos de categorías ===== */
const categories = [
  {
    id: "mano",
    title: "Bolsos de Mano",
    description: "Elegancia que se lleva",
    emoji: "👜",
    bg: "bg-gradient-to-br from-terracotta/20 to-primary/10",
    accent: "text-primary",
  },
  {
    id: "mochilas",
    title: "Mochilas",
    description: "Comodidad y estilo",
    emoji: "🎒",
    bg: "bg-gradient-to-br from-gold/20 to-accent/10",
    accent: "text-accent-foreground",
  },
  {
    id: "casuales",
    title: "Bolsos Casuales",
    description: "Para cada día",
    emoji: "👝",
    bg: "bg-gradient-to-br from-light-brown/30 to-secondary/20",
    accent: "text-deep-brown",
  },
  {
    id: "elegantes",
    title: "Bolsos Elegantes",
    description: "Perfectos para la noche",
    emoji: "✨",
    bg: "bg-gradient-to-br from-deep-brown/10 to-muted/30",
    accent: "text-deep-brown",
  },
  {
    id: "cruzados",
    title: "Bolsos Cruzados",
    description: "Libertad de movimiento",
    emoji: "💼",
    bg: "bg-gradient-to-br from-primary/10 to-gold/20",
    accent: "text-primary",
  },
  {
    id: "clutches",
    title: "Clutches",
    description: "Minimalismo con estilo",
    emoji: "👛",
    bg: "bg-gradient-to-br from-secondary/40 to-terracotta/10",
    accent: "text-deep-brown",
  },
];

export default function CategoriesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 4 },
    },
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const scrollDots = emblaApi ? emblaApi.scrollSnapList() : [];

  return (
    <section id="colecciones" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">

        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-primary">
              Explora
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-deep-brown mt-3 mb-2">
              Nuestras Categorías
            </h2>
            <p className="font-sans text-muted-foreground max-w-md">
              Encuentra el bolso perfecto para cada momento y estilo de vida.
            </p>
          </div>

          {/* Flechas */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              aria-label="Siguiente"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="min-w-0 shrink-0 grow-0 basis-[calc(50%-8px)] md:basis-[calc(50%-12px)] lg:basis-[calc(25%-18px)]"
              >
                <a
                  href="#catalogo"
                  className={`group relative ${cat.bg} rounded-2xl p-6 md:p-8 flex flex-col items-center text-center cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full`}
                >
                  {/* Emoji */}
                  <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {cat.emoji}
                  </div>

                  <h3 className={`font-serif text-lg md:text-xl ${cat.accent} mb-2`}>
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground tracking-wide">
                    {cat.description}
                  </p>

                  {/* Flecha animada */}
                  <div className="mt-4 w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicadores */}
        {scrollDots.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {scrollDots.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir a diapositiva ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
