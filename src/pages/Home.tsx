import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/src/components/ProductCard";
import { PRODUCTS } from "@/src/types";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white px-6">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl pt-20">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] uppercase tracking-[0.3em] mb-4"
          >
            Edition 01 / SS24
          </motion.p>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-serif text-5xl md:text-8xl leading-[1.1] mb-12 tracking-tight"
          >
            Exclusive Apparel for the <br />
            <span className="italic font-light">Modern Minimalist</span>
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-4 bg-white text-ink px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-white transition-all duration-500"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-widest vertical-text">Scroll</span>
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-4">The Selection</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">Featured Pieces</h2>
            </div>
            <Link
              to="/shop"
              className="text-[11px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              View All Arrivals
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 md:py-48 px-6 md:px-12 bg-ink text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative aspect-square md:aspect-[4/5] overflow-hidden clip-path-oval"
          >
            <img
              src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"
              alt="Brand Philosophy"
              className="w-full h-full object-cover grayscale brightness-75"
            />
          </motion.div>
          
          <div className="space-y-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Our Philosophy</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight">
              Crafting an <br />
              <span className="italic">Enduring Legacy</span>
            </h2>
            <div className="space-y-6 text-sm md:text-lg font-light opacity-60 leading-relaxed max-w-lg">
              <p>
                RJ Clothing was founded on the belief that fashion should be a conscious investment in quality rather than a fleeting moment in time.
              </p>
              <p>
                Each piece in our limited collections is meticulously sourced from the finest textiles and produced in small batches to ensure absolute exclusivity and craftsmanship that spans generations.
              </p>
            </div>
            <div className="pt-8">
              <div className="inline-flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em]">R. Jenson</span>
                <span className="text-[9px] uppercase tracking-[0.5em] opacity-40">Creative Director</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big Typographic callout */}
      <section className="py-32 bg-white text-center px-12 overflow-hidden">
        <motion.h2
          initial={{ x: "20%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-[20vw] font-serif uppercase whitespace-nowrap leading-none select-none"
        >
          Limited Edition
        </motion.h2>
      </section>
    </div>
  );
}
