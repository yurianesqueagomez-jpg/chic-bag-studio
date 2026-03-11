/**
 * CategoriesSection — Maison Belle
 * Sección visual de categorías de bolsos con tarjetas grandes.
 */

/* ===== Datos de categorías — fácil de editar ===== */
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
];

export default function CategoriesSection() {
  return (
    <section id="colecciones" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">

        {/* Cabecera */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-primary">
            Explora
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-deep-brown mt-3 mb-4">
            Nuestras Categorías
          </h2>
          <p className="font-sans text-muted-foreground max-w-md mx-auto">
            Encuentra el bolso perfecto para cada momento y estilo de vida.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <a
              key={cat.id}
              href={`#catalogo`}
              className={`group relative ${cat.bg} rounded-2xl p-6 md:p-8 flex flex-col items-center text-center cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 animate-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Emoji / Ícono */}
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
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
