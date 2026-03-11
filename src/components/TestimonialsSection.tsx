/**
 * TestimonialsSection — Maison Belle
 * Testimonios reales de clientas con avatar, nombre y reseña.
 */
import { Star } from "lucide-react";

/* ===== Datos de testimonios — fácil de editar ===== */
const testimonials = [
  {
    id: 1,
    name: "Sofía Martínez",
    role: "Diseñadora de Interiores",
    avatar: "SM",
    avatarBg: "bg-primary/20 text-primary",
    rating: 5,
    text: "El Tote Cognac es simplemente perfecto. La calidad del cuero es increíble y el tamaño es ideal para mi día a día. ¡Ha recibido más de diez cumplidos esta semana!",
  },
  {
    id: 2,
    name: "Laura Gómez",
    role: "Arquitecta",
    avatar: "LG",
    avatarBg: "bg-gold/30 text-accent-foreground",
    rating: 5,
    text: "Llevaba tiempo buscando una mochila elegante que pudiera usar tanto en la oficina como en el fin de semana. La Mochila Caramel es exactamente lo que necesitaba.",
  },
  {
    id: 3,
    name: "Valentina Ruiz",
    role: "Profesora de Yoga",
    avatar: "VR",
    avatarBg: "bg-light-brown/30 text-deep-brown",
    rating: 5,
    text: "El packaging ya era una experiencia de lujo. El Crossbody Terra tiene un color precioso en persona, mucho más rico que en las fotos. Sin duda, mi próxima compra será aquí.",
  },
];

/* Componente de estrellas */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-gold text-gold" : "text-muted-foreground"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* Cabecera */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-primary">
            Opiniones
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-deep-brown mt-3 mb-4">
            Lo que Dicen Nuestras Clientas
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Stars count={5} />
            <span className="font-sans text-sm text-muted-foreground">4.9 sobre 5 · más de 800 reseñas</span>
          </div>
        </div>

        {/* Cards de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-card rounded-2xl p-7 shadow-soft border border-border/50 hover:shadow-card transition-all duration-300 flex flex-col gap-5 animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Estrellas */}
              <Stars count={t.rating} />

              {/* Texto */}
              <p className="font-sans text-muted-foreground leading-relaxed text-sm italic flex-1">
                "{t.text}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-semibold ${t.avatarBg}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-deep-brown">{t.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
