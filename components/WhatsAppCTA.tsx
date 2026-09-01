"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Sparkles } from "lucide-react";

export default function WhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const message = encodeURIComponent(
    "Olá! Acessei o site da JCS Metalúrgica e gostaria de solicitar um orçamento técnico para o meu projeto."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating Tooltip Pill */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
        transition={{ duration: 0.2 }}
        className="hidden sm:flex bg-[#0f0f14]/95 backdrop-blur-md border border-emerald-500/30 text-white px-3.5 py-2 text-xs font-mono font-bold shadow-2xl items-center gap-2 pointer-events-none rounded-full"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Falar com Engenharia JCS</span>
      </motion.div>

      {/* Main WhatsApp Action Button */}
      <motion.a
        href={`https://wa.me/5511999999999?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white p-3 rounded-full shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:shadow-[0_0_35px_rgba(37,211,102,0.7)] transition-all duration-300 flex items-center justify-center group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Falar pelo WhatsApp com a JCS Metalúrgica"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />

        {/* Unread Message Badge Indicator */}
        <span className="absolute -top-1 -right-1 bg-rose-600 border-2 border-[#08080a] text-white font-mono text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
          1
        </span>

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative z-10"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.741 10.564 10.564 0 5.825-4.738 10.562-10.561 10.562z" />
        </svg>
      </motion.a>
    </div>
  );
}
