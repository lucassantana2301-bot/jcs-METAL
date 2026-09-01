"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { id: "01", title: "PROJETO & BIM", tag: "ENG-01" },
  { id: "02", title: "CORTE CNC", tag: "MFG-02" },
  { id: "03", title: "CONFORMAÇÃO", tag: "MFG-03" },
  { id: "04", title: "SOLDA CLASSE 1", tag: "WLD-04" },
  { id: "05", title: "CONTROLE QA", tag: "QAC-05" },
  { id: "06", title: "ENTREGA & ART", tag: "DLV-06" },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" className="py-32 bg-[#050505] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header da Seção Estilo Telemetria */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 mb-16">
          <div>
            <span className="text-jcs-red font-mono text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block">
              WORKFLOW // TELEMETRIA INDUSTRIAL
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Ciclo de Fabricação
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-4 md:mt-0">
            <span>STATUS: <span className="text-emerald-500 animate-pulse">OPTIMIZED</span></span>
            <span>|</span>
            <span>TOLERANCE: ±0.05mm</span>
          </div>
        </div>

        {/* Timeline Estilo Painel Motorsport */}
        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          
          {/* Background Track Line */}
          <div className="absolute left-4 md:left-[120px] top-0 bottom-0 w-[1px] bg-white/10" />

          {/* Active Red Progress Line */}
          <motion.div
            className="absolute left-4 md:left-[120px] top-0 w-[2px] bg-jcs-red origin-top shadow-[0_0_15px_rgba(225,29,72,0.8)]"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-12 md:gap-20 py-10">
            {steps.map((step, index) => {
              // Create a specific scroll range for each node to activate
              const start = index / steps.length;
              const activeOpacity = useTransform(scrollYProgress, [start - 0.1, start, start + 0.1], [0.3, 1, 1]);
              const activeColor = useTransform(scrollYProgress, [start - 0.1, start], ["#3f3f46", "#ffffff"]);
              const nodeBg = useTransform(scrollYProgress, [start - 0.1, start], ["#050505", "#e11d48"]);

              return (
                <motion.div 
                  key={index} 
                  className="relative flex items-center w-full group"
                  style={{ opacity: activeOpacity }}
                >
                  
                  {/* Fase / Código Técnico (Desktop only) */}
                  <div className="hidden md:block w-[100px] text-right pr-8 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {step.tag}
                  </div>

                  {/* Active Node */}
                  <motion.div 
                    className="absolute left-4 md:left-[120px] w-3 h-3 -translate-x-[5px] md:-translate-x-[6px] border border-white/20"
                    style={{ backgroundColor: nodeBg }}
                  />

                  {/* Detalhes da Fase */}
                  <div className="ml-12 md:ml-16 flex items-baseline gap-6">
                    <motion.h2 
                      className="text-5xl md:text-7xl font-black font-mono tracking-tighter"
                      style={{ color: activeColor }}
                    >
                      {step.id}
                    </motion.h2>
                    <motion.h3 
                      className="text-xl md:text-3xl font-black uppercase tracking-widest"
                      style={{ color: activeColor }}
                    >
                      {step.title}
                    </motion.h3>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
