"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Layers, DoorClosed, TrendingUp, Flame, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

const servicesList = [
  {
    id: "01",
    title: "Estruturas Metálicas & Galpões",
    description: "Cálculo estrutural rigoroso para galpões logísticos e pórticos de grande porte. Vãos livres de até 35m.",
    icon: Building2,
    metric: "35M VÃO LIVRE",
  },
  {
    id: "02",
    title: "Mezaninos Industriais",
    description: "Otimização de espaço com máxima capacidade de sobrecarga. Projetos sob medida com pisos estruturais.",
    icon: Layers,
    metric: "1.200 KG/M²",
  },
  {
    id: "03",
    title: "Portões & Automação",
    description: "Portões basculantes e deslizantes com motores ultrarrápidos e acabamento em pintura eletrostática.",
    icon: DoorClosed,
    metric: "4S ABERTURA",
  },
  {
    id: "04",
    title: "Solda de Alta Penetração",
    description: "Soldagem estrutural TIG/MIG realizada por profissionais certificados. Ensaios não-destrutivos.",
    icon: Flame,
    metric: "AWS D1.1",
  },
  {
    id: "05",
    title: "Caldeiraria & Corte CNC",
    description: "Desenvolvimento customizado do CAD à montagem com tolerâncias milimétricas.",
    icon: Compass,
    metric: "±0.05MM",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="servicos" className="py-32 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header da Seção */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-jcs-red"></span>
              <span className="text-xs font-mono tracking-[0.4em] text-jcs-red uppercase font-bold">
                Capacidade Técnica
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Soluções<br />Industriais
            </h2>
          </div>
          <p className="text-zinc-500 font-mono text-sm tracking-[0.1em] max-w-sm">
            Atuamos em todas as etapas da cadeia produtiva: engenharia reversa, corte CNC, conformação e solda classe 1.
          </p>
        </div>

        {/* Interactive List */}
        <div className="border-t border-white/10">
          {servicesList.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="group relative border-b border-white/10 py-10 md:py-14 transition-colors duration-500 hover:bg-white/[0.02]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor="view"
              >
                {/* Linha vermelha de tracking */}
                <div 
                  className={`absolute bottom-0 left-0 h-[2px] bg-jcs-red transition-all duration-700 ease-out z-10 ${isHovered ? 'w-full' : 'w-0'}`} 
                />

                <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  
                  <div className="flex items-center gap-8 w-full md:w-1/2">
                    {/* Número Gigante */}
                    <span className={`text-6xl md:text-8xl font-black font-mono transition-colors duration-500 ${isHovered ? 'text-white' : 'text-zinc-800'}`}>
                      {service.id}
                    </span>
                    
                    <div>
                      <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'text-white translate-x-4' : 'text-zinc-300'}`}>
                        {service.title}
                      </h3>
                      <div className={`mt-2 font-mono text-xs tracking-widest text-jcs-red transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'opacity-100 translate-x-4' : 'opacity-0'}`}>
                        + DETALHES TÉCNICOS
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 flex flex-col md:items-end text-left md:text-right">
                    <p className={`text-zinc-400 text-sm leading-relaxed transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                      {service.description}
                    </p>
                    
                    {/* Elemento técnico (Métrica) */}
                    <div className="mt-6 flex items-center gap-3 border border-white/10 px-4 py-2 bg-black/50">
                      <Icon size={16} className="text-jcs-red" />
                      <span className="font-mono text-[10px] tracking-widest text-white uppercase font-bold">
                        {service.metric}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Background Tech Image Flash no Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-0 w-1/3 h-full pointer-events-none opacity-20 mix-blend-screen overflow-hidden z-0"
                    >
                      <div className="w-full h-full border border-jcs-red/20 flex flex-col justify-between p-4">
                        <div className="flex justify-between">
                          <div className="w-2 h-2 bg-jcs-red" />
                          <div className="w-2 h-2 bg-jcs-red" />
                        </div>
                        <div className="w-full h-[1px] bg-jcs-red/30 my-auto relative">
                          <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-[8px] font-mono text-jcs-red">SCANNING...</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="w-2 h-2 bg-jcs-red" />
                          <div className="w-2 h-2 bg-jcs-red" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
