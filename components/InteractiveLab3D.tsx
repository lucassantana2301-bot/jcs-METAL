"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import MetalStructure from "./MetalStructure";
import { Layers, Eye, Zap, Sliders, RefreshCw, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export default function InteractiveLab3D() {
  const [activeMode, setActiveMode] = useState<"standard" | "exploded" | "blueprint" | "welding">("standard");
  const [dimensions, setDimensions] = useState({ w: 1, h: 1, l: 1 });
  const [isRotating, setIsRotating] = useState(true);

  // Simulated scroll progress motion value for the 3D structure according to active mode
  const scrollMock = useMotionValue(
    activeMode === "standard" ? 0.02 : activeMode === "exploded" ? 0.28 : activeMode === "blueprint" ? 0.25 : 0.45
  );

  const handleModeChange = (mode: "standard" | "exploded" | "blueprint" | "welding") => {
    setActiveMode(mode);
    if (mode === "standard") scrollMock.set(0.02);
    if (mode === "exploded") scrollMock.set(0.28);
    if (mode === "blueprint") scrollMock.set(0.25);
    if (mode === "welding") scrollMock.set(0.45);
  };

  // Calculated engineering specifications
  const calculatedWeight = Math.round((dimensions.w * dimensions.h * dimensions.l * 180 + 350));
  const calculatedLoadCapacity = Math.round(calculatedWeight * 3.5);

  return (
    <section id="3d-lab" className="py-24 bg-[#09090c] relative z-20 overflow-hidden border-t border-b border-white/5">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-rose-500" />
              <span className="text-rose-500 font-mono font-bold tracking-widest text-xs uppercase">
                Laboratório 3D & Engenharia Estrutural
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Interaja com a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Precisão JCS</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
            Arraste para girar a estrutura em 360º. Alterne entre os modos de raio-x, visão explodida e soldagem para inspecionar a qualidade de cada junção metálica.
          </p>
        </div>

        {/* 3D Canvas + Control HUD Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main 3D Viewport */}
          <div className="lg:col-span-8 relative min-h-[460px] sm:min-h-[560px] bg-[#0d0d12] border border-white/10 rounded-none overflow-hidden shadow-2xl flex flex-col justify-between p-4">
            
            {/* Viewport HUD Header */}
            <div className="relative z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 font-mono text-[11px] text-zinc-300">
                <span className="w-2 h-2 rounded-none bg-cyan-400 animate-pulse" />
                <span>STATUS: MOTOR 3D ATIVO (THREE.JS)</span>
              </div>
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 font-mono text-[11px] text-zinc-400">
                AÇO ASTM A36 • PERFIS W / HP
              </div>
            </div>

            {/* Canvas 3D */}
            <div className="absolute inset-0 z-0">
              <Canvas shadows camera={{ position: [0, 1.5, 9], fov: 45 }}>
                <PerspectiveCamera makeDefault position={[0, 1.5, 9]} fov={45} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 12, 6]} intensity={2} color="#ffffff" castShadow />
                <directionalLight position={[-10, -8, -6]} intensity={1} color="#e11d48" />
                <pointLight position={[0, -2, 3]} intensity={0.8} color="#06b6d4" />
                
                <Environment preset="city" />

                <MetalStructure scrollYProgress={scrollMock} dimensions={dimensions} />

                <OrbitControls 
                  enableZoom={false} 
                  autoRotate={isRotating} 
                  autoRotateSpeed={0.8} 
                  maxPolarAngle={Math.PI / 1.7} 
                  minPolarAngle={Math.PI / 4} 
                />
              </Canvas>
            </div>

            {/* Live Mode Badges / HUD Footer */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto mt-auto">
              {/* Mode Buttons */}
              <div className="flex flex-wrap gap-2 bg-black/80 backdrop-blur-md p-1.5 border border-white/10">
                <button
                  onClick={() => handleModeChange("standard")}
                  className={`px-3 py-1.5 text-xs font-bold font-mono uppercase transition-all flex items-center gap-1.5 ${
                    activeMode === "standard"
                      ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Eye size={13} />
                  <span>Montado</span>
                </button>

                <button
                  onClick={() => handleModeChange("exploded")}
                  className={`px-3 py-1.5 text-xs font-bold font-mono uppercase transition-all flex items-center gap-1.5 ${
                    activeMode === "exploded"
                      ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Layers size={13} />
                  <span>Explodido</span>
                </button>

                <button
                  onClick={() => handleModeChange("blueprint")}
                  className={`px-3 py-1.5 text-xs font-bold font-mono uppercase transition-all flex items-center gap-1.5 ${
                    activeMode === "blueprint"
                      ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Sliders size={13} />
                  <span>Blueprint Raio-X</span>
                </button>

                <button
                  onClick={() => handleModeChange("welding")}
                  className={`px-3 py-1.5 text-xs font-bold font-mono uppercase transition-all flex items-center gap-1.5 ${
                    activeMode === "welding"
                      ? "bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Zap size={13} />
                  <span>Solda Arc</span>
                </button>
              </div>

              {/* Rotation Toggle */}
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw size={12} className={isRotating ? "animate-spin" : ""} style={{ animationDuration: "8s" }} />
                <span>{isRotating ? "Giro Auto: ON" : "Giro Auto: OFF"}</span>
              </button>
            </div>

          </div>

          {/* Right Control HUD & Technical Specifications */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-[#0e0e14] border border-white/10 p-6 shadow-xl relative">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-rose-500 uppercase tracking-widest block mb-1">
                  Configurador de Escala
                </span>
                <h3 className="text-xl font-bold text-white uppercase">
                  Ajuste Paramétrico em Tempo Real
                </h3>
              </div>

              {/* Dimension Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                    <span>Largura (Vão Livre):</span>
                    <span className="text-rose-400 font-bold">{(dimensions.w * 3.5).toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.05"
                    value={dimensions.w}
                    onChange={(e) => setDimensions({ ...dimensions, w: parseFloat(e.target.value) })}
                    className="w-full accent-rose-500 bg-white/10 h-1.5 rounded-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                    <span>Altura (Pé Direito):</span>
                    <span className="text-rose-400 font-bold">{(dimensions.h * 3.0).toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.4"
                    step="0.05"
                    value={dimensions.h}
                    onChange={(e) => setDimensions({ ...dimensions, h: parseFloat(e.target.value) })}
                    className="w-full accent-rose-500 bg-white/10 h-1.5 rounded-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-zinc-300 mb-1.5">
                    <span>Profundidade (Comprimento):</span>
                    <span className="text-rose-400 font-bold">{(dimensions.l * 4.0).toFixed(1)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.05"
                    value={dimensions.l}
                    onChange={(e) => setDimensions({ ...dimensions, l: parseFloat(e.target.value) })}
                    className="w-full accent-rose-500 bg-white/10 h-1.5 rounded-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Engineering Metrics Output */}
              <div className="p-4 bg-black/50 border border-white/5 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Massa Estimada do Aço:</span>
                  <span className="text-white font-bold text-sm">~{calculatedWeight} kg</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Carga Admissível de Projeto:</span>
                  <span className="text-emerald-400 font-bold text-sm">~{calculatedLoadCapacity} kgf</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Conexão de Viga:</span>
                  <span className="text-zinc-200">Soldada TIG/MIG + Parafusada A325</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Tratamento Anticorrosivo:</span>
                  <span className="text-zinc-200">Fundo Primer Epóxi + PU</span>
                </div>
              </div>

              {/* Quality Badges */}
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>Projeto 100% detalhado em CAD 3D / BIM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-rose-500 flex-shrink-0" />
                  <span>Emissão de ART por Engenheiro Responsável</span>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <a
              href="#orcamento"
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider py-3.5 text-center transition-colors shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>Calcular Valor Desse Projeto</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
