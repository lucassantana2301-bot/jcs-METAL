"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Shield, Cpu, Award, ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Interactive Sparks Particle Component
const SparksParticles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {[...Array(24)].map((_, i) => {
        const randomX = Math.random() * 80 + 10;
        const randomDuration = Math.random() * 3 + 2;
        const randomDelay = Math.random() * 4;
        const randomSize = Math.random() * 3.5 + 1.5;

        return (
          <motion.div
            key={i}
            className="absolute rounded-none bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_12px_rgba(249,115,22,0.9)]"
            style={{
              width: randomSize,
              height: randomSize,
              left: `${randomX}%`,
              bottom: "-10px",
            }}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              y: [-10, -Math.random() * 500 - 300],
              x: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();

  // Smooth Parallax Effects
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const videoY = useTransform(scrollY, [0, 600], [0, 50]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.75, 0.9]);

  const kpis = [
    { icon: Award, value: "+500", label: "Obras & Estruturas Concluídas" },
    { icon: Cpu, value: "±0.05mm", label: "Precisão Corte Laser Fibra CNC" },
    { icon: Shield, value: "AWS D1.1", label: "Soldagem Estrutural Certificada" },
    { icon: Sparkles, value: "5 Anos", label: "Garantia Integral de Estrutura" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#08080a] pt-32 pb-12">
      {/* 1. Background Video / Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={{ scale: videoScale, y: videoY }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-75 contrast-125"
          poster="https://images.unsplash.com/photo-1504917595217-d4bfd28a31e8?q=80&w=2074&auto=format&fit=crop"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* 2. High-Tech Gradient Overlays */}
      <motion.div className="absolute inset-0 z-10" style={{ opacity: overlayOpacity }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/60" />
        <div className="absolute inset-0 blueprint-grid opacity-30" />
      </motion.div>

      {/* 3. Realtime Sparks Particles */}
      <SparksParticles />

      {/* 4. Main Hero Typography & Call-To-Action */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl">
          {/* Top Industrial Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-rose-500/10 border-l-2 border-rose-500 text-rose-400 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-none bg-rose-500 animate-pulse" />
            Engenharia de Precisão & Estruturas Metálicas Sob Medida
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[1.02] mb-6 drop-shadow-2xl"
          >
            TRANSFORMAMOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              METAL EM
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500">
              REALIDADE.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl md:text-2xl font-light text-zinc-300 max-w-3xl leading-relaxed mb-10 drop-shadow"
          >
            Da concepção 3D/BIM à usinagem CNC e montagem em campo. Fabricamos galpões, mezaninos,
            portões tecnológicos e peças industriais com <strong className="text-white font-semibold">resistência máxima e acabamento impecável</strong>.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <Link
              href="#orcamento"
              className="relative group bg-gradient-to-r from-rose-600 via-rose-700 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white px-8 py-4 text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:shadow-[0_0_50px_rgba(225,29,72,0.65)] flex items-center justify-center gap-3 border border-rose-400/30"
            >
              <Sparkles size={18} className="text-yellow-300 animate-pulse" />
              <span>Simular Pré-Orçamento 3D</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="#3d-lab"
              className="bg-[#121218]/80 hover:bg-[#1c1c24] text-zinc-200 hover:text-white px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md flex items-center justify-center gap-2 shadow-lg"
            >
              <Cpu size={18} className="text-cyan-400" />
              <span>Laboratório 3D</span>
            </Link>

            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20t%C3%A9cnico%20com%20a%20JCS%20Metal%C3%BArgica."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600/90 hover:bg-emerald-500 text-white px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 border border-emerald-400/30 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Direto</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 5. Industrial Trust / KPI Ticker Bar */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#0e0e13]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-2 sm:p-3 border-r border-white/5 last:border-r-0"
              >
                <div className="w-10 h-10 rounded-none bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium line-clamp-1">
                    {kpi.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll down indicator */}
        <div className="flex justify-center mt-6">
          <Link
            href="#servicos"
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest"
          >
            <span>Explorar Recursos</span>
            <ArrowDown size={14} className="animate-bounce text-rose-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
