/**
 * CartDrawer — Maison Belle
 * Drawer lateral deslizante con lista de productos, controles de
 * cantidad y total de pedido.
 */
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cartOpen, setCartOpen,
    cartItems, removeFromCart, updateQuantity,
    cartTotal, cartCount,
  } = useCart();

  const shipping = cartTotal >= 150 ? 0 : 9.95;
  const orderTotal = cartTotal + shipping;

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[70] bg-deep-brown/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-background shadow-card flex flex-col transition-transform duration-400 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Cabecera ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="font-serif text-xl text-deep-brown">Tu carrito</h2>
            {cartCount > 0 && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
          >
            <X size={18} className="text-foreground" />
          </button>
        </div>

        {/* ── Cuerpo ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems.length === 0 ? (
            /* Estado vacío */
            <div className="h-full flex flex-col items-center justify-center gap-5 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag size={32} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-serif text-xl text-deep-brown mb-2">Tu carrito está vacío</p>
                <p className="font-sans text-sm text-muted-foreground">
                  Descubre nuestra colección y añade tus favoritos.
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="font-sans text-xs tracking-widest uppercase px-8 py-3 border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.selectedColor}`}
                  className="flex gap-4 bg-card rounded-xl p-4 shadow-soft animate-fade-up"
                >
                  {/* Imagen */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-sans text-[9px] tracking-widest uppercase text-primary">
                          {item.category}
                        </p>
                        <p className="font-serif text-base text-deep-brown leading-tight">
                          {item.name}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          Color: {item.selectedColor}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedColor)}
                        className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors duration-200 shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Precio + cantidad */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-sans text-base font-bold text-primary">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                      {/* Controles cantidad */}
                      <div className="flex items-center gap-2 border border-border rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedColor, -1)}
                          className="p-1.5 hover:bg-muted transition-colors duration-200"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedColor, 1)}
                          className="p-1.5 hover:bg-muted transition-colors duration-200"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Resumen y CTA (sólo si hay items) ── */}
        {cartItems.length > 0 && (
          <div className="border-t border-border px-6 py-6 flex flex-col gap-4 bg-background">
            {/* Líneas de coste */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-sans text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm text-muted-foreground">
                <span>Envío</span>
                {shipping === 0 ? (
                  <span className="text-gold font-bold">Gratis 🎉</span>
                ) : (
                  <span>€{shipping.toFixed(2)}</span>
                )}
              </div>
              {shipping > 0 && (
                <p className="font-sans text-[11px] text-muted-foreground bg-muted rounded px-3 py-2">
                  Añade €{(150 - cartTotal).toFixed(2)} más para envío gratuito
                </p>
              )}
              <div className="flex justify-between font-serif text-xl text-deep-brown border-t border-border pt-3">
                <span>Total</span>
                <span className="text-primary font-bold">€{orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Botón checkout */}
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-cta text-primary-foreground font-sans text-xs tracking-widest uppercase py-4 rounded-sm hover:opacity-90 transition-opacity duration-300 shadow-cta">
              Finalizar pedido
              <ArrowRight size={15} />
            </button>

            {/* Pago seguro */}
            <p className="font-sans text-[10px] text-center text-muted-foreground tracking-wide">
              🔒 Pago 100% seguro · Devoluciones gratuitas 30 días
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
