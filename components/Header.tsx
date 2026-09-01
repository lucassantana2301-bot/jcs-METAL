"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useScroll, useSpring } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#" },
    { name: "Serviços", href: "#servicos" },
    { name: "Processo", href: "#processo" },
    { name: "Projetos", href: "#projetos" },
    { name: "Sobre", href: "#sobre" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      {/* Global Scroll Progress */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-jcs-red origin-left z-50 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
        style={{ scaleX }}
      />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">
        
        {/* Logo Cinematográfica */}
        <Link href="#" className="flex items-center gap-4 group" data-cursor="home">
          <div className="relative w-10 h-10 flex items-center justify-center border border-white/20 bg-black/50 overflow-hidden clip-diagonal group-hover:border-jcs-red transition-colors duration-500">
            <span className="font-black text-white text-lg tracking-tighter relative z-10 group-hover:text-jcs-red transition-colors duration-500">
              JCS
            </span>
            <div className="absolute inset-0 bg-jcs-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-black tracking-[0.2em] text-white uppercase flex items-center gap-1">
              ENGENHARIA <span className="w-1 h-1 bg-jcs-red animate-pulse" />
            </span>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
              Sistemas de Precisão
            </span>
          </div>
        </Link>

        {/* Navegação Desktop (Estilo Telemetria) */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              data-cursor="nav"
              className="group relative flex flex-col items-center py-2"
            >
              <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-zinc-400 group-hover:text-white uppercase transition-colors duration-300">
                {link.name}
              </span>
              {/* Linha vermelha cortando */}
              <span className="absolute top-1/2 left-0 w-0 h-[1px] bg-jcs-red group-hover:w-full transition-all duration-500 ease-out z-[-1]" />
            </Link>
          ))}
        </nav>

        {/* Action CTA Magnético */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            <Phone size={12} className="text-jcs-red" />
            <a href="tel:11999999999" data-cursor="call" className="hover:text-white transition-colors">(11) 99999-9999</a>
          </div>

          <MagneticButton
            onClick={() => window.location.href = "#orcamento"}
            className="group relative overflow-hidden bg-white hover:bg-zinc-200 text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 clip-diagonal shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span>Orçar Projeto</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-jcs-red translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-[-1]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-difference bg-white z-0" />
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-white p-2 hover:bg-white/5 transition-colors z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir Menu"
        >
          {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay Elegante (Fullscreen) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-start justify-center px-10 md:px-24"
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            
            <div className="flex flex-col gap-6 w-full max-w-2xl z-10 relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-mono text-[10px] text-jcs-red tracking-[0.3em] uppercase mb-4"
              >
                NAVEGAÇÃO DO SISTEMA
              </motion.div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 + 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter flex items-center gap-6"
                  >
                    <span className="text-zinc-700 font-mono text-sm tracking-widest group-hover:text-jcs-red transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <span className="group-hover:translate-x-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute bottom-10 left-10 md:left-24 flex gap-12 font-mono text-[10px] text-zinc-500 uppercase tracking-widest"
            >
              <div className="flex flex-col gap-2">
                <span className="text-white">Contato</span>
                <span>(11) 99999-9999</span>
                <span>contato@jcsmetalurgica.com.br</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white">Fábrica</span>
                <span>São Paulo — SP</span>
                <span>Brasil</span>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
