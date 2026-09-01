"use client";

import { useState, useRef } from "react";
import { MoveHorizontal, Sparkles, CheckCircle2 } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-28 bg-[#09090c] relative z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles size={13} className="text-orange-400" />
            Engenharia de Transformação
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            A Diferença do <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300">Padrão JCS</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Arraste a linha divisória lateralmente para comparar a revitalização e a precisão da montagem estrutural.
          </p>
        </div>

        {/* Before / After Interactive Container */}
        <div
          ref={containerRef}
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-none overflow-hidden cursor-ew-resize select-none border border-white/15 shadow-2xl bg-black"
        >
          {/* AFTER Image (Background) */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop"
              alt="Projeto Concluído JCS"
              className="w-full h-full object-cover brightness-105 contrast-110"
              draggable="false"
            />
            {/* Tag After */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-rose-500/40 text-rose-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 z-10 shadow-lg">
              <CheckCircle2 size={14} className="text-rose-500" />
              <span>DEPOIS: EXECUÇÃO JCS</span>
            </div>
          </div>

          {/* BEFORE Image (Clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
              alt="Estado Inicial"
              className="w-full h-full object-cover grayscale brightness-60 contrast-90"
              draggable="false"
            />
            {/* Tag Before */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/20 text-zinc-400 font-mono font-bold text-xs uppercase tracking-wider z-10 shadow-lg">
              <span>ANTES: ESTRUTURA ANTIGA</span>
            </div>
          </div>

          {/* Slider Line & Tactile Handle */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-rose-500 via-white to-orange-500 cursor-ew-resize shadow-[0_0_15px_rgba(225,29,72,0.8)] z-20"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#121218] border-2 border-white rounded-none flex items-center justify-center shadow-2xl text-rose-500 hover:scale-110 transition-transform">
              <MoveHorizontal size={20} />
            </div>
          </div>
        </div>

        {/* Technical Specs Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 p-4 bg-[#111116] border border-white/5 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-rose-500" />
            <span>Reforço Estrutural: <strong>+180% capacidade de carga</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500" />
            <span>Pintura Eletrostática: <strong>Zero oxidação em 10 anos</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500" />
            <span>Tempo de Execução: <strong>14 dias corridos</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
