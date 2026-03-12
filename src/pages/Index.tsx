/**
 * Index — Maison Belle
 * Página principal de la tienda online de bolsos.
 * Ensambla todos los componentes de la página.
 */
import Header              from "@/components/Header";
import HeroSection         from "@/components/HeroSection";
import FeaturedProducts    from "@/components/FeaturedProducts";
import CategoriesSection   from "@/components/CategoriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PromoBanner         from "@/components/PromoBanner";
import Footer              from "@/components/Footer";
import CartDrawer          from "@/components/CartDrawer";
import ProductModal        from "@/components/ProductModal";
import { CartProvider }    from "@/context/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Navegación fija superior */}
        <Header />

        {/* Secciones de la página */}
        <main>
          <HeroSection />
          <FeaturedProducts />
          <CategoriesSection />
          <PromoBanner />
          <TestimonialsSection />
        </main>

        {/* Pie de página */}
        <Footer />

        {/* Overlays globales */}
        <CartDrawer />
        <ProductModal />
      </div>
    </CartProvider>
  );
};

export default Index;
