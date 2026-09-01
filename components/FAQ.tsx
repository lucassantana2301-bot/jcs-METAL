"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from "lucide-react";
import { useUIFeedback } from "@/hooks/useUIFeedback";

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const faqs: FAQItem[] = [
  {
    question: "Qual é o prazo médio de fabricação e montagem de uma estrutura metálica?",
    answer: "O prazo varia conforme a complexidade e metragem da obra. Mezaninos e coberturas de pequeno a médio porte levam em média de 10 a 20 dias úteis entre produção em fábrica e instalação. Galpões industriais de grande vão levam de 25 a 45 dias. Definimos um cronograma rígido em contrato com garantia de pontualidade.",
    tag: "Prazos & Cronograma",
  },
  {
    question: "A JCS emite ART (Anotação de Responsabilidade Técnica) e laudo de engenharia?",
    answer: "Sim, 100% dos nossos projetos estruturais são acompanhados por engenheiro civil/mecânico habilitado no CREA, com emissão de ART, memorial de cálculo e laudos técnicos exigidos por órgãos públicos, bombeiros (AVCB) e seguradoras.",
    tag: "Normas & ART",
  },
  {
    question: "Vocês realizam visita técnica no local antes do fechamento do orçamento?",
    answer: "Sim! Após a simulação preliminar online, nossa equipe técnica agenda uma visita presencial para conferência milimétrica das cotas, avaliação do solo, pontos de fixação e logística de içamento com caminhão munck.",
    tag: "Visita Técnica",
  },
  {
    question: "Quais as vantagens da Pintura Eletrostática a Pó sobre a pintura convencional?",
    answer: "A pintura eletrostática a pó é aplicada com carga elétrica e curada em estufa a 200ºC. Isso cria uma película polimérica ultra-resistente a riscos, impactos, raios UV e umidade, sem escorridos e com durabilidade até 5x superior à pintura comum a pincel ou compressor.",
    tag: "Acabamento & Durabilidade",
  },
  {
    question: "Quais regiões são atendidas para entrega e montagem?",
    answer: "Atendemos toda a capital de São Paulo, Grande São Paulo (Guarulhos, ABC, Osasco, Barueri, etc.), Interior de SP (Campinas, Sorocaba, Vale do Paraíba) e Litoral. Para projetos industriais de grande porte, atendemos todo o território nacional.",
    tag: "Logística & Cobertura",
  },
  {
    question: "Quais são as opções e facilidades de pagamento?",
    answer: "Trabalhamos com condições flexíveis: faturamento via cartão BNDES, parcelamento em até 12x no cartão de crédito, faturamento PJ mediante análise de crédito ou sinal + saldo parcelado durante as etapas de montagem.",
    tag: "Condições Comerciais",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { playClick, playHover } = useUIFeedback();

  const toggleFAQ = (index: number) => {
    playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 bg-[#09090c] relative z-20 overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4">
            <HelpCircle size={13} className="text-orange-400" />
            Tire Suas Dúvidas
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300">Frequentes</span>
          </h2>
          <p className="text-zinc-400 text-base">
            Respostas transparentes sobre nossos processos, prazos, garantias e normas de segurança.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onMouseEnter={playHover}
                className="group bg-[#111116] border border-white/10 overflow-hidden transition-all duration-500 hover:border-rose-500/30 hover:bg-white/[0.03]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 w-fit">
                      {faq.tag}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 group-hover:border-rose-500/30 group-hover:text-rose-400 ${
                      isOpen ? "rotate-180 text-rose-500 border-rose-500/40 bg-rose-500/10" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2 text-zinc-300 text-sm leading-relaxed border-t border-white/5 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 bg-[#13131a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-base uppercase">Ficou com alguma dúvida específica?</h4>
            <p className="text-zinc-400 text-xs mt-0.5">Nosso time de engenharia técnica está online para responder agora.</p>
          </div>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20estruturas%20met%C3%A1licas."
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 transition-colors shadow-lg shadow-emerald-950/60 flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
