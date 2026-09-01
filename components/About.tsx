"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Factory, Award, Sparkles, CheckCircle2 } from "lucide-react";

function Counter({
  from,
  to,
  duration,
  suffix = "",
  text,
}: {
  from: number;
  to: number;
  duration: number;
  suffix?: string;
  text: string;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-80px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return (
    <div ref={nodeRef} className="flex flex-col p-4 bg-black/40 border border-white/5">
      <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
        +{count}
        {suffix}
      </span>
      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
        {text}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="sobre" className="py-28 bg-[#08080a] relative z-20 overflow-hidden border-t border-white/5">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling & Numbers */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4 w-fit">
              <Factory size={13} className="text-orange-400" />
              Infraestrutura & Tradição Industrial
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6 leading-tight">
              Transformando Aço com <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300">
                Engenharia de Alta Performance
              </span>
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed mb-6">
              A <strong>JCS Metalúrgica</strong> nasceu com o compromisso de entregar estruturas metálicas que unem
              resistência extrema, precisão dimensional milimétrica e acabamento estético impecável.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Contamos com parque fabril moderno equipado com máquinas de corte a laser de fibra óptica, prensas viradeiras CNC,
              ponte rolante e equipe especializada de engenheiros e soldadores certificados pelas normas mais exigentes do país (AWS e ABNT).
            </p>

            {/* Checklist of differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-rose-500 flex-shrink-0" />
                <span>Cálculo estrutural com emissão de ART</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-rose-500 flex-shrink-0" />
                <span>Parque fabril com corte laser CNC 12kW</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-rose-500 flex-shrink-0" />
                <span>Pintura eletrostática com estufa 200ºC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-rose-500 flex-shrink-0" />
                <span>Logística própria com frota e caminhão munck</span>
              </div>
            </div>

            {/* Live Animated Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Counter from={0} to={500} duration={2000} text="Obras Concluídas" />
              <Counter from={0} to={15} duration={1600} text="Anos de Mercado" />
              <Counter from={0} to={1200} duration={2000} suffix="t" text="Aço Processado" />
              <Counter from={0} to={100} duration={1200} suffix="%" text="Pontualidade" />
            </div>
          </motion.div>

          {/* Right Column: Factory Imagery with Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] bg-[#111116] border border-white/15 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                alt="Fábrica da JCS Metalúrgica"
                className="w-full h-full object-cover brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-[20s] ease-out"
              />

              {/* Holographic Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-xl p-5 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-500 flex-shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm uppercase">Normas ABNT NBR 8800</div>
                    <div className="text-zinc-400 text-xs font-mono">Projeto de estruturas de aço e mistas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Element */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-rose-500 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
