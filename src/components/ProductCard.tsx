import React from "react";
import { Product } from "@/src/types";
import { useCart } from "@/src/context/CartContext";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      id={`product-${product.id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F0F0F0]">
        {product.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur px-3 py-1 text-[9px] uppercase tracking-widest font-medium">
              {product.tag}
            </span>
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Quick Add Button */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button
            onClick={() => addToCart(product)}
            className="pointer-events-auto w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-black hover:text-white"
            title="Add to Bag"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start text-left">
        <div className="flex-1 pr-4">
          <h3 className="text-[11px] uppercase tracking-wider font-semibold mb-1 text-ink">
            {product.name}
          </h3>
          {product.stock < 5 ? (
            <p className="text-[10px] text-gold font-medium">Only {product.stock} Left</p>
          ) : (
            <p className="text-[10px] text-gray-400">In Stock</p>
          )}
        </div>
        <span className="text-[11px] font-medium font-mono">${product.price}</span>
      </div>
    </motion.div>
  );
}
