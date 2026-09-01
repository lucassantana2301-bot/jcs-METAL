"use client";

import { Phone, Mail, MapPin, Instagram, Clock, ShieldCheck, ArrowUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060608] border-t border-white/10 pt-20 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-900 flex items-center justify-center font-black text-white text-xl tracking-tighter border border-rose-500/40 shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                JCS
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  JCS <span className="text-rose-500 font-light">METALÚRGICA</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  Engenharia & Soluções em Aço
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Especialistas em estruturas metálicas de grande porte, mezaninos industriais, portões tecnológicos e caldeiraria fina. Soluções sob medida com precisão milimétrica e garantia estrutural de 5 anos.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 font-mono text-xs">
                <ShieldCheck size={14} className="text-rose-500" />
                ART CREA / AWS D1.1
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6 text-sm font-mono uppercase tracking-widest text-rose-500">
              Navegação Rápida
            </h3>
            <ul className="flex flex-col gap-3 font-mono text-xs">
              {[
                { name: "Início", href: "#" },
                { name: "Serviços Especializados", href: "#servicos" },
                { name: "Laboratório 3D Interativo", href: "#3d-lab" },
                { name: "Simulador de Orçamento", href: "#orcamento" },
                { name: "Portfólio de Projetos", href: "#projetos" },
                { name: "Processo Industrial", href: "#processo" },
                { name: "Matriz de Qualidade", href: "#qualidade" },
                { name: "Perguntas Frequentes (FAQ)", href: "#faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-rose-500 rounded-none group-hover:w-2 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-5 bg-[#0b0b10] border border-white/10 p-6 sm:p-8">
            <h3 className="text-white font-bold mb-6 text-sm font-mono uppercase tracking-widest text-rose-500">
              Atendimento & Fábrica
            </h3>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <Phone className="text-rose-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-white font-bold text-sm">(11) 99999-9999</div>
                  <div className="text-zinc-500">WhatsApp Comercial & Plantão Técnico</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-rose-500 shrink-0" size={16} />
                <span className="text-zinc-200">contato@jcsmetalurgica.com.br</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-rose-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-zinc-200">Parque Fabril: Rua Industrial, 1200 - Galpão 04</div>
                  <div className="text-zinc-500">São Paulo - SP • CEP 01000-000</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <Clock className="text-emerald-400 shrink-0" size={16} />
                <span className="text-zinc-400">Segunda a Sexta: 07:30 às 18:00</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20JCS%20Metal%C3%BArgica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Sparkles size={13} />
                <span>Pedir Orçamento Agora</span>
              </a>

              <button
                onClick={scrollToTop}
                className="p-2.5 bg-white/5 border border-white/10 hover:bg-rose-600 hover:text-white text-zinc-400 transition-colors"
                aria-label="Voltar ao topo"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} JCS Metalúrgica Ltda. CNPJ 00.000.000/0001-00. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5 text-zinc-400">
            <span>Padrão de Excelência em Engenharia Metalúrgica</span>
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse" />
          </p>
        </div>

      </div>
    </footer>
  );
}
