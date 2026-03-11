/**
 * HeroSection — Maison Belle
 * Imagen principal con titular de marca, subtítulo y CTA "Comprar ahora".
 */
import heroBags from "@/assets/hero-bags.jpg";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/30" />
        <div className="absolute bottom-12 left-8 w-32 h-32 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-24 right-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-28 md:py-0">

        {/* Texto del hero */}
        <div className="order-2 md:order-1 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Etiqueta */}
          <span className="inline-block font-sans text-xs tracking-[0.3em] uppercase text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-6">
            Nueva Colección 2025
          </span>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-deep-brown mb-6">
            El Arte de<br />
            <em className="text-primary not-italic">Llevar</em> lo<br />
            Esencial
          </h1>

          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-10">
            Bolsos artesanales de cuero genuino, diseñados para la mujer
            contemporánea que elige calidad sin renunciar al estilo.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground font-sans text-sm tracking-wider uppercase px-8 py-4 rounded-sm shadow-cta hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Comprar Ahora
            </a>
            <a
              href="#colecciones"
              className="inline-flex items-center gap-2 border border-deep-brown/30 text-deep-brown font-sans text-sm tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-secondary transition-all duration-300"
            >
              Ver Colecciones
            </a>
          </div>

          {/* Stats pequeños */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-border">
            {[
              { num: "+2500", label: "Clientas felices" },
              { num: "100%",  label: "Cuero genuino"   },
              { num: "3 años", label: "De garantía"     },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-serif text-2xl font-semibold text-deep-brown">{stat.num}</span>
                <span className="font-sans text-xs text-muted-foreground tracking-wide mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Imagen hero */}
        <div
          className="order-1 md:order-2 animate-fade-up relative"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-card">
            <img
              src={heroBags}
              alt="Colección de bolsos de lujo Maison Belle"
              className="w-full h-[520px] md:h-[620px] object-cover"
            />
            {/* Badge flotante */}
            <div className="absolute bottom-6 left-6 bg-cream/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-soft">
              <p className="font-serif text-xs italic text-muted-foreground">Tendencia</p>
              <p className="font-sans text-sm font-bold text-deep-brown">Colección Otoño 2025</p>
            </div>
          </div>

          {/* Decoración dorada */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-gold/40 -z-10" />
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary/10 -z-10" />
        </div>
      </div>

      {/* Flecha de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="font-sans text-xs tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
