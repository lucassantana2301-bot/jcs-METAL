"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Award, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export default function Quality() {
  const comparisons = [
    {
      item: "Precisão Dimensional",
      jcs: "Corte a Laser Fibra CNC (±0.05 mm)",
      traditional: "Corte manual a disco / maçarico (±3.0 mm)",
      advantage: "Encaixes perfeitos sem folgas",
    },
    {
      item: "Qualificação de Solda",
      jcs: "Soldadores certificados AWS D1.1 / ASME",
      traditional: "Solda empírica sem laudo técnico",
      advantage: "Resistência máxima à tração",
    },
    {
      item: "Origem do Aço",
      jcs: "100% Usinas Certificadas (Gerdau / CSN)",
      traditional: "Aço de sucata ou sem procedência",
      advantage: "Zero fadiga precoce do material",
    },
    {
      item: "Tratamento de Superfície",
      jcs: "Fosfatização + Pintura Eletrostática a Pó (200ºC)",
      traditional: "Zarcão simples com pincel",
      advantage: "Sem descascar ou enferrujar",
    },
    {
      item: "Responsabilidade Técnica",
      jcs: "Emissão de Laudo e ART CREA por Engenheiro",
      traditional: "Sem respaldo jurídico ou cálculo",
      advantage: "Total segurança para seu patrimônio",
    },
  ];

  return (
    <section id="qualidade" className="py-28 bg-[#09090c] relative z-20 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-600/10 rounded-none blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles size={13} className="text-orange-400" />
            Matriz de Qualidade & Engenharia
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Por Que a <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300">JCS é Diferente?</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Compromisso inegociável com a segurança estrutural, normas técnicas da ABNT e acabamento premium.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-[#111116] border border-white/10 overflow-x-auto shadow-2xl mb-12">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-xs font-mono uppercase text-zinc-400">
                <th className="p-5">Critério Técnico</th>
                <th className="p-5 text-rose-400 bg-rose-950/20 border-l border-r border-rose-500/20">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} />
                    <span>PADRÃO JCS METALÚRGICA</span>
                  </div>
                </th>
                <th className="p-5 text-zinc-500">Serralheria Comum</th>
                <th className="p-5 text-emerald-400">Benefício para Você</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-bold text-white uppercase tracking-wider">{row.item}</td>
                  <td className="p-5 bg-rose-950/10 border-l border-r border-rose-500/20 text-zinc-100 font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-rose-500 flex-shrink-0" />
                    <span>{row.jcs}</span>
                  </td>
                  <td className="p-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <XCircle size={15} className="text-zinc-600 flex-shrink-0" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="p-5 text-emerald-300 font-sans text-xs">{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 bg-[#121218] border border-white/10 flex items-start gap-4 hover:bg-[#16161c] hover:border-rose-500/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]">
            <div className="w-12 h-12 bg-rose-600/10 border border-rose-500/30 flex items-center justify-center text-rose-500 flex-shrink-0 group-hover:bg-rose-500/20 transition-colors duration-700">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white uppercase mb-1">Garantia Estrutural 5 Anos</h4>
              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors duration-700">
                Nossos projetos são dimensionados para durar décadas, com garantia por contrato e assistência técnica dedicada.
              </p>
            </div>
          </div>

          <div className="group p-6 bg-[#121218] border border-white/10 flex items-start gap-4 hover:bg-[#16161c] hover:border-orange-500/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]">
            <div className="w-12 h-12 bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-700">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white uppercase mb-1">Tecnologia CNC & Laser</h4>
              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors duration-700">
                Maquinário de última geração para corte térmico de fibra óptica e conformação sem deformações na chapa.
              </p>
            </div>
          </div>

          <div className="group p-6 bg-[#121218] border border-white/10 flex items-start gap-4 hover:bg-[#16161c] hover:border-emerald-500/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]">
            <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors duration-700">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white uppercase mb-1">100% de Pontualidade</h4>
              <p className="text-zinc-400 text-xs leading-relaxed group-hover:text-zinc-300 transition-colors duration-700">
                Cronograma industrial monitorado semanalmente para que sua obra seja entregue exatamente na data combinada.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
