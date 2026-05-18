import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    try {
      // Simulate API call to the backend
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-white text-ink pt-24 pb-12 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand & Newsletter */}
          <div className="md:col-span-2 space-y-8 text-left">
            <Link to="/" className="flex flex-col">
              <span className="font-serif text-3xl tracking-[0.3em] font-light uppercase italic">RJ Clothing</span>
            </Link>
            
            <div className="max-w-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Newsletter</p>
              
              <form onSubmit={handleSubscribe} className="relative group border-b border-ink pb-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[11px] uppercase tracking-widest focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="text-[11px] uppercase tracking-widest font-bold ml-4 hover:text-gold transition-colors"
                >
                  Join
                </button>
                {status === "error" && (
                  <p className="absolute left-0 -bottom-6 text-[10px] text-red-500 uppercase tracking-widest">
                    Invalid email address
                  </p>
                )}
                {status === "success" && (
                  <p className="absolute left-0 -bottom-6 text-[10px] text-gold uppercase tracking-widest">
                    Successfully Joined
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Boutique</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest text-ink/60">
              <li><Link to="/shop" className="hover:text-gold transition-colors">All Collections</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">Outerwear</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">Accessories</Link></li>
              <li><Link to="/shop" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Concierge</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest text-ink/60">
              <li><a href="#" className="hover:text-gold transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Duties</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] text-gray-400">
            <a href="#" className="hover:text-ink transition-colors">Instagram</a>
            <a href="#" className="hover:text-ink transition-colors">Twitter</a>
            <a href="#" className="hover:text-ink transition-colors">Contact</a>
          </div>
          
          <div className="text-[10px] text-gray-400 tracking-widest uppercase">
            &copy; 2024 RJ CLOTHING. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
