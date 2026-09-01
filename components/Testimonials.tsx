"use client";

import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Eng. Carlos Eduardo Ramos",
    company: "Construtora Ramos & Associados",
    service: "Galpão Industrial de 800m²",
    rating: 5,
    date: "Obra entregue em 2024",
    text: "A equipe da JCS foi impecável desde o cálculo estrutural até a montagem final com caminhão munck. Cumpriram o cronograma com rigor britânico e a precisão das furações e soldas foi de 100%. É o melhor parceiro em estruturas metálicas de São Paulo.",
  },
  {
    name: "Mariana Siqueira",
    company: "Condomínio Residencial Alphaville",
    service: "Portão Tecnológico & Gradil Perimetral",
    rating: 5,
    date: "Obra entregue em 2024",
    text: "O acabamento da pintura eletrostática e o funcionamento do motor de abertura rápida são impressionantes. Toda a diretoria do condomínio elogiou o padrão de segurança e estética. Recomendo de olhos fechados!",
  },
  {
    name: "Roberto Mendes",
    company: "Mendes Logística & Armazenagem",
    service: "Mezanino Industrial para Estoque",
    rating: 5,
    date: "Obra entregue em 2024",
    text: "Precisávamos dobrar nossa área de estocagem sem interromper a operação da fábrica. A JCS entregou o mezanino com piso xadrez reforçado em apenas 12 dias. Estrutura extremamente firme e com laudo ART.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#0b0b0e] relative z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-16">
          
          <div className="md:w-1/3 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-jcs-red animate-pulse" />
              <span className="text-jcs-red font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                AUDITORIA DE QUALIDADE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Avaliação <br/>Técnica
            </h2>
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
              Relatórios de inspeção de clientes ativos
            </p>
          </div>

          <div className="md:w-2/3 border-t border-white/5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-b border-white/5 py-12 md:py-16 flex flex-col md:flex-row gap-8 md:gap-16 items-start hover:bg-white/[0.02] transition-colors p-4 md:p-8"
              >
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-jcs-red group-hover:h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                <div className="md:w-1/3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-jcs-red font-mono text-[10px] tracking-widest">
                    <CheckCircle2 size={12} />
                    VERIFIED_PARTNER
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter">
                    {t.name}
                  </h3>
                  <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">
                    {t.company}
                  </span>
                  
                  <div className="mt-4 border border-white/10 p-3 bg-black">
                    <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">
                      Projeto Ref.
                    </span>
                    <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
                      {t.service}
                    </span>
                  </div>
                </div>

                <div className="md:w-2/3 relative">
                  <Quote className="absolute -top-6 -left-6 text-white/5 scale-150" />
                  <p className="text-zinc-400 text-sm md:text-base leading-loose font-mono uppercase tracking-widest relative z-10">
                    "{t.text}"
                  </p>
                  
                  <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex gap-1 text-jcs-red">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">
                      {t.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
