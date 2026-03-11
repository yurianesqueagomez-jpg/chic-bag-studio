/**
 * Header — Maison Belle
 * Logo, navegación principal y carrito de compras.
 * Incluye menú responsive (hamburguesa en móvil).
 */
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio",       href: "#inicio" },
  { label: "Catálogo",     href: "#catalogo" },
  { label: "Colecciones",  href: "#colecciones" },
  { label: "Ofertas",      href: "#ofertas" },
  { label: "Contacto",     href: "#contacto" },
];

export default function Header() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [cartCount,  setCartCount]  = useState(0);

  /* Detecta scroll para aplicar fondo con sombra */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Expone función global para añadir al carrito desde otras secciones */
  useEffect(() => {
    (window as any).addToCart = () => setCartCount((c) => c + 1);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-sm shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-widest text-deep-brown">
            MAISON
          </span>
          <span className="font-serif text-xs italic tracking-[0.35em] text-primary -mt-1">
            belle
          </span>
        </a>

        {/* Navegación — escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline font-sans text-sm tracking-wider text-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Carrito + hamburguesa */}
        <div className="flex items-center gap-4">
          {/* Icono carrito */}
          <button
            aria-label="Carrito de compras"
            className="relative p-2 rounded-full hover:bg-secondary transition-colors duration-200"
          >
            <ShoppingBag size={22} className="text-deep-brown" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Botón hamburguesa — móvil */}
          <button
            aria-label="Menú"
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-cream/97 backdrop-blur-sm ${
          menuOpen ? "max-h-80 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-base tracking-wider text-foreground hover:text-primary transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
