import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { cn } from "@/src/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-bottom border-gray-100 flex items-center justify-between">
              <h2 className="font-serif text-2xl uppercase tracking-widest">Your Bag</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                id="close-cart-btn"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans text-sm tracking-widest uppercase">Your bag is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2 border border-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs uppercase tracking-widest opacity-60 mb-1">{item.category}</p>
                          <h3 className="font-serif text-lg">{item.name}</h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex justify-between items-end">
                        <div className="flex items-center border border-gray-200 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-gray-50 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-mono text-sm tracking-tighter">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-widest opacity-60">Subtotal</span>
                  <span className="font-serif text-2xl tracking-tighter">${totalPrice}</span>
                </div>
                <button
                  className="w-full py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-ink transition-colors"
                  id="checkout-btn"
                >
                  Confirm Purchase
                </button>
                <button
                  onClick={onClose}
                  className="w-full mt-3 py-2 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
