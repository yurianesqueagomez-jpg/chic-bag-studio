/**
 * PromoBanner — Maison Belle
 * Banner promocional de nueva colección / descuento especial.
 * Diseño de alto impacto con cuenta regresiva y CTA.
 */
import { useEffect, useState } from "react";

/* Cuenta regresiva hacia una fecha objetivo */
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  };

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-cream/10 border border-cream/20 rounded-lg w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        <span className="font-serif text-2xl md:text-3xl font-semibold text-cream">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-sans text-[9px] tracking-widest uppercase text-cream/60 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function PromoBanner() {
  /* Fecha de fin de oferta — editar aquí */
  const target = new Date(Date.now() + 3 * 24 * 3600 * 1000 + 8 * 3600 * 1000);
  const { d, h, m, s } = useCountdown(target);

  return (
    <section id="ofertas" className="py-20 bg-gradient-promo overflow-hidden relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-16 w-48 h-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,hsl(15_55%_52%/0.15),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">

          {/* Tag */}
          <span className="inline-block font-sans text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/30 px-4 py-1.5 rounded-full mb-6">
            Oferta Exclusiva
          </span>

          <h2 className="font-serif text-4xl md:text-6xl text-cream mb-4 leading-tight">
            Hasta <span className="text-gold italic">30% de Descuento</span><br />
            en Toda la Colección
          </h2>

          <p className="font-sans text-cream/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
            Aprovecha nuestra oferta de temporada. Stock limitado en modelos
            seleccionados de cuero genuino artesanal.
          </p>

          {/* Cuenta regresiva */}
          <div className="flex items-start justify-center gap-3 md:gap-4 mb-10">
            <Digit value={d} label="Días"    />
            <span className="font-serif text-3xl text-cream/50 mt-3">:</span>
            <Digit value={h} label="Horas"   />
            <span className="font-serif text-3xl text-cream/50 mt-3">:</span>
            <Digit value={m} label="Min"     />
            <span className="font-serif text-3xl text-cream/50 mt-3">:</span>
            <Digit value={s} label="Seg"     />
          </div>

          {/* Código de descuento */}
          <div className="inline-flex items-center gap-3 bg-cream/10 border border-cream/20 rounded-lg px-6 py-3 mb-8">
            <span className="font-sans text-xs text-cream/60 tracking-wider">Código:</span>
            <span className="font-mono text-base font-bold tracking-widest text-gold">BELLE30</span>
          </div>

          <div className="block" />

          {/* CTA */}
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 bg-gradient-gold text-deep-brown font-sans text-sm font-bold tracking-widest uppercase px-10 py-4 rounded-sm shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Aprovechar la Oferta
          </a>
        </div>
      </div>
    </section>
  );
}
