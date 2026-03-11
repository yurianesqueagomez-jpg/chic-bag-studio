/**
 * Footer — Maison Belle
 * Información de contacto, redes sociales, enlaces útiles y newsletter.
 */
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Twitter,   label: "Twitter/X", href: "#" },
];

const usefulLinks = [
  { label: "Guía de tallas",         href: "#" },
  { label: "Cuidado del cuero",      href: "#" },
  { label: "Política de devolución", href: "#" },
  { label: "Envíos",                 href: "#" },
  { label: "Preguntas frecuentes",   href: "#" },
];

const collectionLinks = [
  { label: "Nueva Colección", href: "#colecciones" },
  { label: "Más Vendidos",    href: "#catalogo"    },
  { label: "Ofertas",         href: "#ofertas"     },
  { label: "Bolsos de Mano",  href: "#colecciones" },
  { label: "Mochilas",        href: "#colecciones" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-deep-brown text-cream">

      {/* Franja newsletter */}
      <div className="border-b border-cream/10">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-2">
              Únete a la familia Maison Belle
            </h3>
            <p className="font-sans text-cream/60 text-sm mb-6">
              Recibe las últimas novedades, ofertas exclusivas y contenido de moda directamente en tu correo.
            </p>
            <form className="flex gap-0 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/40 font-sans text-sm px-4 py-3 rounded-l-sm focus:outline-none focus:border-gold/60 transition-colors"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-r-sm hover:bg-primary/80 transition-colors duration-200 whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cuerpo del footer */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Columna 1 — Marca */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <span className="font-serif text-2xl font-semibold tracking-widest">MAISON</span>
              <br />
              <span className="font-serif text-xs italic tracking-[0.35em] text-primary -mt-0.5 block">belle</span>
            </div>
            <p className="font-sans text-cream/60 text-sm leading-relaxed mb-6">
              Bolsos artesanales de cuero genuino para la mujer que elige calidad y estilo con intención.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-primary hover:bg-primary/20 transition-all duration-200"
                >
                  <Icon size={15} className="text-cream/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 — Colecciones */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-cream/50 mb-5">
              Colecciones
            </h4>
            <ul className="flex flex-col gap-3">
              {collectionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/70 hover:text-primary transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Ayuda */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-cream/50 mb-5">
              Ayuda
            </h4>
            <ul className="flex flex-col gap-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/70 hover:text-primary transition-colors duration-200 link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div>
            <h4 className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-cream/50 mb-5">
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-cream/70">
                  Calle de la Moda, 12<br />
                  Madrid, España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-primary shrink-0" />
                <a href="tel:+34600000000" className="font-sans text-sm text-cream/70 hover:text-primary transition-colors duration-200">
                  +34 600 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-primary shrink-0" />
                <a href="mailto:hola@maisonbelle.es" className="font-sans text-sm text-cream/70 hover:text-primary transition-colors duration-200">
                  hola@maisonbelle.es
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-lg border border-cream/10 bg-cream/5">
              <p className="font-sans text-[11px] text-cream/50">
                Lunes – Viernes: 9:00 – 19:00<br />
                Sábados: 10:00 – 14:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie legal */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream/40">
            © 2025 Maison Belle. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Cookies", "Términos"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-xs text-cream/40 hover:text-cream/70 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
