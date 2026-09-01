"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import Experience3D from "./Experience3D";
import { useState, useRef } from "react";
import Services from "./Services";
import BudgetSimulator from "./BudgetSimulator";
import BeforeAfter from "./BeforeAfter";
import Process from "./Process";
import Quality from "./Quality";
import Projects from "./Projects";
import About from "./About";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";

export default function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tie scroll progress strictly to the 600vh narrative container for a long cinematographic experience
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"] 
  });
  
  const [dimensions, setDimensions] = useState({ w: 1, h: 1, l: 1 });

  // 1. Initial Tech Data (0 - 0.03)
  const techDataOpacity = useTransform(scrollYProgress, [0, 0.015, 0.03], [1, 1, 0]);

  // 2. Main Cinematographic Logo (0.03 - 0.08)
  const mainLogoOpacity = useTransform(scrollYProgress, [0.03, 0.04, 0.07, 0.08], [0, 1, 1, 0]);
  const mainLogoY = useTransform(scrollYProgress, [0.03, 0.04, 0.07, 0.08], [50, 0, 0, -50]);
  const mainLogoBlur = useTransform(scrollYProgress, [0.03, 0.04, 0.07, 0.08], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  
  // 3. Disassembly HUD (0.08 - 0.22) - Matches 3D model
  const disassemblyOpacity = useTransform(scrollYProgress, [0.08, 0.12, 0.18, 0.22], [0, 1, 1, 0]);

  // 4. Blueprint HUD (0.22 - 0.48) - Matches 3D model
  const blueprintOpacity = useTransform(scrollYProgress, [0.22, 0.26, 0.44, 0.48], [0, 1, 1, 0]);

  // 5. Welding HUD (0.48 - 0.62) - Matches 3D model
  const weldingOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.58, 0.62], [0, 1, 1, 0]);

  // 6. Final Transition (0.62 - 0.70)
  const transitionOpacity = useTransform(scrollYProgress, [0.62, 0.65, 0.70], [0, 1, 1]);

  return (
    <>
      {/* 3D Canvas fixed in background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Experience3D scrollYProgress={scrollYProgress} dimensions={dimensions} />
      </div>

      {/* Geometric Grid Lines Overlay - Technical background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute left-[5%] w-[1px] h-full bg-white/40"></div>
        <div className="absolute right-[5%] w-[1px] h-full bg-white/40"></div>
        <div className="absolute left-[50%] w-[1px] h-full bg-white/10"></div>
        <div className="absolute top-[20%] w-full h-[1px] bg-white/20"></div>
        <div className="absolute bottom-[20%] w-full h-[1px] bg-white/20"></div>
      </div>

      {/* 600vh to give a massive scroll distance for the 3D model to complete its sequence smoothly */}
      <div ref={containerRef} className="relative z-10 w-full h-[600vh]">
        
        {/* Fixed HUD that fades based on scroll */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none overflow-hidden">
          
          {/* Phase 1: Tech Data Bootup */}
          <motion.div style={{ opacity: techDataOpacity }} className="absolute inset-0 flex flex-col items-center justify-center bg-black">
            <div className="font-mono text-xs md:text-sm text-zinc-500 uppercase tracking-[0.5em] flex flex-col items-center gap-4 animate-pulse">
              <span>JCS ENGENHARIA</span>
              <span className="text-jcs-red">SISTEMA DE PRECISÃO</span>
              <span>PROJETO 001</span>
              <span>MANUFATURA INDUSTRIAL</span>
              <span>SÃO PAULO — BRASIL</span>
              
              <div className="w-[1px] h-20 bg-gradient-to-b from-jcs-red to-transparent mt-10"></div>
              <span className="text-[9px] tracking-[0.3em] opacity-50 mt-2">INICIANDO SISTEMA</span>
            </div>
          </motion.div>

          {/* Phase 2: Main Hero Logo */}
          <motion.div 
            style={{ opacity: mainLogoOpacity, y: mainLogoY, filter: mainLogoBlur }} 
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center text-center w-full px-4 relative">
              <span className="text-jcs-red font-mono tracking-[1em] mb-4 text-xs md:text-sm uppercase font-bold">
                [ SYS_01 // PRECISÃO ABSOLUTA ]
              </span>
              <div className="relative group mb-2 flex items-center justify-center w-full">
                {/* Outline Text Background */}
                <h1 className="absolute text-[12rem] md:text-[20rem] font-black text-transparent opacity-10 tracking-tighter uppercase leading-none" style={{ WebkitTextStroke: "2px white" }}>
                  JCS
                </h1>
                {/* Solid Text Foreground */}
                <h1 className="relative text-8xl md:text-[14rem] font-black text-white tracking-tighter uppercase leading-none z-10 px-8 py-4 mix-blend-exclusion">
                  JCS
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-jcs-red z-20 group-hover:scale-x-150 transition-transform duration-1000" />
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-widest uppercase z-10 mt-[-2rem] mix-blend-exclusion">
                METALÚRGICA
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm font-mono tracking-[0.4em] uppercase leading-relaxed max-w-2xl mt-10">
                Engenharia metálica desenvolvida para transformar projetos em precisão extrema.
              </p>
            </div>
          </motion.div>

          {/* Phase 3: Disassembly */}
          <motion.div style={{ opacity: disassemblyOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 border-l border-jcs-red pl-6 py-4 backdrop-blur-md bg-black/40">
              <h2 className="text-4xl md:text-6xl font-black text-white opacity-20 font-mono leading-none">01</h2>
              <p className="text-xl md:text-3xl font-black text-white mt-2 uppercase tracking-widest leading-none">Desconstrução</p>
              <p className="font-mono text-zinc-400 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-4">
                Análise Estrutural &<br/>Elemento Finito
              </p>
            </div>
          </motion.div>

          {/* Phase 4: Blueprint */}
          <motion.div style={{ opacity: blueprintOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="absolute right-8 top-1/2 -translate-y-1/2 border-r border-cyan-500 pr-6 py-4 text-right backdrop-blur-md bg-black/40">
              <h2 className="text-4xl md:text-6xl font-black text-cyan-500 opacity-20 font-mono leading-none">02</h2>
              <p className="text-xl md:text-3xl font-black text-white mt-2 uppercase tracking-widest leading-none">Projeto Milimétrico</p>
              <p className="font-mono text-zinc-400 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-4">
                Tolerância de Corte<br/>± 0.05mm CNC
              </p>
            </div>
          </motion.div>

          {/* Phase 5: Welding */}
          <motion.div style={{ opacity: weldingOpacity }} className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="absolute left-8 bottom-24 border-b border-amber-500 pb-6 pr-6 backdrop-blur-md bg-black/40">
              <h2 className="text-4xl md:text-6xl font-black text-amber-500 opacity-20 font-mono leading-none">03</h2>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-widest mt-2 uppercase leading-none">Fusão TIG/MIG</h1>
              <p className="text-amber-400 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mt-4">
                Solda de Alta Penetração<br/>Classe 1 AWS
              </p>
            </div>
          </motion.div>

          {/* Phase 6: Transition to normal content */}
          <motion.div style={{ opacity: transitionOpacity }} className="absolute inset-0 flex flex-col items-center justify-end pb-32">
            <div className="text-center">
              <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mix-blend-difference">
                Do Projeto à Fabricação
              </h3>
              <p className="text-jcs-red font-mono tracking-[0.4em] text-sm mt-6 uppercase font-bold">
                Engenharia que Toma Forma
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Normal Content Flow (Motorsport engineering style) */}
      <div className="relative z-20 w-full flex flex-col bg-[#050505] border-t border-white/5">
        {[
          <Services key="services" />,
          <Process key="process" />,
          <Projects key="projects" />,
          <BudgetSimulator key="budget" />,
          <BeforeAfter key="beforeAfter" />,
          <Quality key="quality" />,
          <About key="about" />,
          <Testimonials key="testimonials" />,
          <FAQ key="faq" />
        ].map((Component, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {Component}
          </motion.div>
        ))}
      </div>
    </>
  );
}
