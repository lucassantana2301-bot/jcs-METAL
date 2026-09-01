"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Disable scrolling while booting
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 400); // short pause at 100%
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          
          <div className="flex flex-col items-center gap-6 z-10 w-full max-w-sm px-6">
            <div className="w-12 h-12 flex items-center justify-center border border-white/20 bg-black/50 overflow-hidden clip-diagonal animate-pulse">
              <span className="font-black text-white text-xl tracking-tighter">
                JCS
              </span>
            </div>
            
            <div className="w-full flex flex-col items-center gap-2">
              <div className="flex justify-between w-full font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>[SISTEMA] INICIANDO</span>
                <span className="text-jcs-red">{progress}%</span>
              </div>
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-jcs-red"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
            
            <div className="mt-4 flex flex-col items-center gap-1 opacity-50">
              <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Carregando módulos...</div>
              <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Calculando estruturas físicas...</div>
              <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Estabelecendo conexão segura...</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
