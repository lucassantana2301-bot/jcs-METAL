"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare } from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  category: "Todos" | "Estruturas" | "Arquitetura" | "Caldeiraria";
  categoryLabel: string;
  img: string;
  layout: string; // Tailwind grid span class
  specs: { material: string; prazo: string; local: string; destaque: string; };
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Mesa Industrial CNC",
    category: "Arquitetura",
    categoryLabel: "Design Mobiliário",
    img: "/projects/ping_pong_table.jpg",
    layout: "col-span-1 md:col-span-12 h-[50vh] md:h-[80vh]",
    specs: { material: "Aço Carbono Trefilado", prazo: "10 dias", local: "SP", destaque: "Solda invisível" },
  },
  {
    id: 2,
    title: "Guarda-Corpo Inox",
    category: "Arquitetura",
    categoryLabel: "High-end",
    img: "/projects/metal_handrail.jpg",
    layout: "col-span-1 md:col-span-7 h-[40vh] md:h-[60vh]",
    specs: { material: "Inox 304", prazo: "7 dias", local: "Alphaville", destaque: "Acabamento escovado" },
  },
  {
    id: 3,
    title: "Portão Fast-Track",
    category: "Estruturas",
    categoryLabel: "Automação",
    img: "/projects/metal_gate.jpg",
    layout: "col-span-1 md:col-span-5 h-[40vh] md:h-[60vh]",
    specs: { material: "Aço Galvanizado", prazo: "12 dias", local: "ABC", destaque: "Abertura 4s" },
  },
  {
    id: 4,
    title: "Caçamba HD",
    category: "Estruturas",
    categoryLabel: "Implemento",
    img: "/projects/metal_chest.jpg",
    layout: "col-span-1 md:col-span-4 h-[40vh] md:h-[50vh]",
    specs: { material: "Chapa 1/4", prazo: "15 dias", local: "Guarulhos", destaque: "MIG contínua" },
  },
  {
    id: 5,
    title: "Coifa de Exaustão",
    category: "Caldeiraria",
    categoryLabel: "Sanitário",
    img: "/projects/range_hood.jpg",
    layout: "col-span-1 md:col-span-8 h-[40vh] md:h-[50vh]",
    specs: { material: "Inox 316", prazo: "8 dias", local: "SP", destaque: "ANVISA Compliant" },
  },
];

const categories = ["Todos", "Estruturas", "Arquitetura", "Caldeiraria"] as const;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projetos" className="py-32 bg-[#050505] relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Header Cinematográfico */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-jcs-red font-mono text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block">
              PORTFÓLIO // OBRAS EXECUTADAS
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              Projetos Realizados
            </h2>
          </div>

          {/* Filtros Minimalistas */}
          <div className="flex flex-wrap gap-6 border-b border-white/10 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="filter"
                className={`text-[10px] font-mono uppercase tracking-[0.2em] pb-2 transition-all relative ${
                  selectedCategory === cat ? "text-white font-bold" : "text-zinc-600 hover:text-zinc-300"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 w-full h-[1px] bg-jcs-red" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Galeria Assimétrica */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          <AnimatePresence>
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={proj.id}
                data-cursor="PROJECT"
                className={`group relative overflow-hidden bg-black cursor-pointer ${proj.layout}`}
                onClick={() => setActiveProject(proj)}
              >
                <div className="w-full h-full relative overflow-hidden group-hover:p-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="absolute inset-0 bg-jcs-red/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:grayscale-0"
                  />
                  
                  {/* Tech HUD overlay on hover */}
                  <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 z-20" />
                  <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 z-20" />

                  {/* Overlay Técnico Invisível até Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12 z-20">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-[10px] text-jcs-red tracking-[0.3em] border border-jcs-red bg-jcs-red/10 px-3 py-1.5 uppercase font-bold backdrop-blur-md">
                          PRJ // {proj.id.toString().padStart(3, '0')}
                        </span>
                        <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em] bg-white/10 px-3 py-1.5 backdrop-blur-md">
                          {proj.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                        {proj.title}
                      </h3>
                      
                      <div className="flex gap-8 border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Material</span>
                          <span className="text-[10px] font-mono text-white uppercase tracking-widest">{proj.specs.material}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Escala</span>
                          <span className="text-[10px] font-mono text-jcs-red uppercase tracking-widest font-bold">1:1 FULL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Técnico (Estilo HUD/Blueprint) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-3xl"
            onClick={() => setActiveProject(null)}
          >
            <div
              className="relative w-full max-w-6xl bg-[#050505] border border-white/10 flex flex-col md:flex-row h-[85vh] shadow-[0_0_100px_rgba(225,29,72,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fechar */}
              <button
                className="absolute top-6 right-6 z-20 text-white hover:text-jcs-red transition-colors mix-blend-difference"
                onClick={() => setActiveProject(null)}
              >
                <X size={32} />
              </button>

              {/* Imagem (Esquerda) */}
              <div className="md:w-3/5 relative h-1/2 md:h-full bg-black overflow-hidden">
                <img
                  src={activeProject.img}
                  alt={activeProject.title}
                  className="w-full h-full object-cover opacity-80"
                />
                {/* HUD Overlay in Image */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/30" />
                  <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[1px] bg-jcs-red shadow-[0_0_20px_2px_rgba(225,29,72,1)]" />
                </div>
              </div>

              {/* Specs (Direita) */}
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-[#050505] relative">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-jcs-red to-transparent" />
                
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-4">
                  SPEC FILE // {activeProject.id.toString().padStart(3, '0')}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-10">
                  {activeProject.title}
                </h3>

                <div className="space-y-6 font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                  <div className="border-b border-white/10 pb-4">
                    <span className="block text-zinc-600 mb-1">MATERIAL</span>
                    <span className="text-white">{activeProject.specs.material}</span>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <span className="block text-zinc-600 mb-1">LOCAL & PRAZO</span>
                    <span className="text-white">{activeProject.specs.local} // {activeProject.specs.prazo}</span>
                  </div>
                  <div className="border-b border-white/10 pb-4">
                    <span className="block text-zinc-600 mb-1">DIFERENCIAL TÉCNICO</span>
                    <span className="text-jcs-red">{activeProject.specs.destaque}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostei%20do%20projeto%20"${encodeURIComponent(activeProject.title)}"`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 group relative overflow-hidden bg-white hover:bg-zinc-200 text-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 clip-diagonal"
                >
                  <MessageSquare size={16} />
                  <span>Replicar Solução</span>
                  <div className="absolute inset-0 bg-jcs-red translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-[-1]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
