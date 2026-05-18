import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface NavbarProps {
  onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Collections", path: "/shop" },
    { label: "New Arrivals", path: "/shop?sort=new" },
    { label: "Story", path: "/#philosophy" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6",
        isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] transition-all hover:text-gold",
                location.pathname === link.path ? "text-gold font-medium" : "text-ink/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile: Menu Trigger */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setIsMobileMenuOpen(true)}
          id="mobile-menu-trigger"
        >
          <Menu size={20} />
        </button>

        {/* Center: Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="font-serif text-2xl tracking-[0.3em] uppercase italic text-ink">RJ Clothing</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden sm:block text-ink/60 hover:text-gold transition-colors p-2">
            <Search size={18} />
          </button>
          <button
            onClick={onCartClick}
            className="flex items-center gap-2 group p-2"
            id="navbar-cart-btn"
          >
            <div className="relative">
              <ShoppingBag size={20} className="text-ink group-hover:text-gold transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-ink text-white text-[8px] flex items-center justify-center rounded-full group-hover:bg-gold transition-colors">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:block text-[10px] uppercase tracking-widest text-ink/60 group-hover:text-gold transition-colors">
              Cart
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-12"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-2"
            >
              <X size={24} />
            </button>
            <div className="mt-24 space-y-12 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl hover:italic transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
