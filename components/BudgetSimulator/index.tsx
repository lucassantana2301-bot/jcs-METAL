"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Search, Sparkles, Send, ShieldCheck, Calculator, ArrowRight, MessageSquare, Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import MagneticButton from "../MagneticButton";
import { useUIFeedback } from "../../hooks/useUIFeedback";

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-[#050505] animate-pulse rounded-none flex items-center justify-center font-mono text-xs text-jcs-red tracking-widest border border-white/5">INITIALIZING SATELLITE...</div>,
});

const SERVICES = [
  { name: "Estrutura Metálica / Galpão", desc: "Grandes vãos, tesouras e coberturas", icon: "🏗️" },
  { name: "Mezanino Industrial", desc: "Otimização de área com alta sobrecarga", icon: "🏢" },
  { name: "Portão Automatizado / Grade", desc: "Segurança e design arquitetônico", icon: "🚪" },
  { name: "Escada Metálica / Corrimão", desc: "Reta, caracol ou modelo industrial", icon: "🪜" },
  { name: "Caldeiraria / Coifa Inox", desc: "Equipamentos e coifas industriais", icon: "⚙️" },
  { name: "Projeto Personalizado Sob Medida", desc: "Desenho especial em CAD/BIM", icon: "📐" },
];

const MATERIALS = [
  { name: "Aço Carbono ASTM A36", desc: "Estrutural padrão, máxima resistência e custo-benefício" },
  { name: "Aço Galvanizado a Fogo", desc: "Proteção anticorrosiva superior contra intempéries" },
  { name: "Aço Inox 304 / 316", desc: "Acabamento nobre, não enferruja (alimentício e hospitalar)" },
  { name: "Alumínio Estrutural", desc: "Leveza, sem corrosão, ideal para ambientes litorâneos" },
  { name: "Preciso de Recomendação Técnica", desc: "Nossos engenheiros indicarão o ideal para sua aplicação" },
];

const FINISHINGS = [
  { name: "Pintura Eletrostática a Pó", desc: "Cura em forno 200ºC, acabamento automotivo duradouro" },
  { name: "Galvanização por Imersão a Quente", desc: "Proteção total interna e externa da peça contra ferrugem" },
  { name: "Fundo Primer Epóxi Industrial", desc: "Base técnica anticorrosiva pronta para pintura final" },
  { name: "Aço Inox Escovado / Polido", desc: "Textura nobre sem necessidade de pintura" },
  { name: "A Definir na Análise Técnica", desc: "Decidir junto à equipe de engenharia JCS" },
];

export default function BudgetSimulator({
  onDimensionChange,
}: {
  onDimensionChange?: (w: number, h: number, l: number) => void;
}) {
  const { playHover, playClick } = useUIFeedback();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "Estrutura Metálica / Galpão",
    width: "4.0",
    height: "3.0",
    length: "6.0",
    unit: "metros",
    quantity: "1",
    material: "Aço Carbono ASTM A36",
    finishing: "Pintura Eletrostática a Pó",
    location: "São Paulo, SP",
    distance: 15,
    name: "",
    whatsapp: "",
    email: "",
    city: "",
    description: "",
  });

  const [userLocationCoords, setUserLocationCoords] = useState<[number, number] | null>(null);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (onDimensionChange) {
      onDimensionChange(
        parseFloat(formData.width) || 1,
        parseFloat(formData.height) || 1,
        parseFloat(formData.length) || 1
      );
    }
  }, [formData.width, formData.height, formData.length, onDimensionChange]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const calculateEstimation = () => {
    let w = parseFloat(formData.width) || 0;
    let h = parseFloat(formData.height) || 0;
    let l = parseFloat(formData.length) || 0;
    let q = parseInt(formData.quantity) || 1;

    if (formData.unit === "cm") {
      w = w / 100;
      h = h / 100;
      l = l / 100;
    }

    let area = w * h;
    if (area === 0) area = w * l;
    if (area === 0) area = 1;

    let basePricePerSqM = 480;

    if (formData.service.includes("Estrutura") || formData.service.includes("Galpão")) basePricePerSqM = 850;
    if (formData.service.includes("Mezanino")) basePricePerSqM = 920;
    if (formData.service.includes("Escada") || formData.service.includes("Corrimão")) basePricePerSqM = 650;
    if (formData.service.includes("Caldeiraria") || formData.service.includes("Inox")) basePricePerSqM = 1100;

    let materialMultiplier = 1;
    if (formData.material.includes("Inox")) materialMultiplier = 2.4;
    if (formData.material.includes("Alumínio")) materialMultiplier = 1.7;
    if (formData.material.includes("Galvanizado")) materialMultiplier = 1.25;

    let finishMultiplier = 1;
    if (formData.finishing.includes("Pintura Eletrostática")) finishMultiplier = 1.2;
    if (formData.finishing.includes("Imersão")) finishMultiplier = 1.25;

    let rawPrice = area * basePricePerSqM * materialMultiplier * finishMultiplier * q;

    let distanceTax = 0;
    if (formData.distance > 30 && formData.distance <= 60) distanceTax = 350;
    if (formData.distance > 60) distanceTax = 650 + (formData.distance - 60) * 6;

    const finalMin = rawPrice * 0.92 + distanceTax;
    const finalMax = rawPrice * 1.25 + distanceTax;

    return {
      minRaw: finalMin,
      maxRaw: finalMax,
      min: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(finalMin),
      max: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(finalMax),
      areaSqM: (area * q).toFixed(1),
    };
  };

  const handleSearchLocation = async () => {
    if (!formData.location) return;
    setIsSearchingLocation(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        setUserLocationCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert("Endereço não localizado automaticamente. Você pode prosseguir normalmente!");
      }
    } catch (e) {
      console.error(e);
    }
    setIsSearchingLocation(false);
  };

  const estimation = calculateEstimation();

  // Create WhatsApp message string with all details
  const createWhatsAppUrl = () => {
    const text = `*SOLICITAÇÃO DE ORÇAMENTO — JCS METALÚRGICA*
----------------------------------------
*Cliente:* ${formData.name || "Cliente Site"}
*WhatsApp:* ${formData.whatsapp || "Não informado"}
*Serviço:* ${formData.service}
*Dimensões:* ${formData.width}m (Largura) x ${formData.height}m (Altura) x ${formData.length}m (Comp.)
*Área Estimada:* ${estimation.areaSqM} m² (Qtd: ${formData.quantity})
*Material:* ${formData.material}
*Acabamento:* ${formData.finishing}
*Local de Instalação:* ${formData.location} (~${formData.distance.toFixed(0)} km)
----------------------------------------
*Estimativa Simulada:* ${estimation.min} a ${estimation.max}
*Observações:* ${formData.description || "Sem observações adicionais"}
----------------------------------------
_Gostaria de agendar a validação técnica desse projeto._`;

    return `https://wa.me/5511999999999?text=${encodeURIComponent(text)}`;
  };

  const submitForm = () => {
    setIsSubmitted(true);
  };

  return (
    <section id="orcamento" className="py-32 bg-[#050505] relative z-20 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-jcs-red/5 rounded-none blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Telemetria */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 text-zinc-400 text-[10px] font-mono tracking-[0.4em] uppercase mb-6">
            <Terminal size={12} className="text-jcs-red" />
            Ferramenta Interna // Módulo de Cálculo
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Simulador <span className="text-jcs-red">Técnico</span>
          </h2>
          <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase">
            Sistema Paramétrico de Custos & Prazos
          </p>
        </div>

        {/* Main Simulator Card (Terminal View) */}
        <div className="bg-black border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Progress Laser Bar */}
          {!isSubmitted && (
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
              <motion.div
                className="h-full bg-jcs-red shadow-[0_0_10px_rgba(225,29,72,0.8)]"
                initial={{ width: "16%" }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}

          {/* Step Indicator Header (HUD Style) */}
          {!isSubmitted && (
            <div className="bg-[#0a0a0a] border-b border-white/5 p-4 flex flex-wrap justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-jcs-red animate-pulse">● REC</span>
                <span>STEP {step}/6</span>
              </div>
              <span className="text-white">
                {step === 1 && "SYS_01 // DEFINIÇÃO DE ESTRUTURA"}
                {step === 2 && "SYS_02 // PARÂMETROS DIMENSIONAIS"}
                {step === 3 && "SYS_03 // LIGA METÁLICA BASE"}
                {step === 4 && "SYS_04 // TRATAMENTO DE SUPERFÍCIE"}
                {step === 5 && "SYS_05 // LOGÍSTICA & DEPLOYMENT"}
                {step === 6 && "SYS_06 // SIMULAÇÃO FINAL"}
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: SERVICE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                  DEF_01: Tipo de Estrutura
                </h3>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-8">
                  &gt; Selecione a categoria para calibrar o cálculo base.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SERVICES.map((s) => (
                    <motion.button
                      key={s.name}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={playHover}
                      data-cursor="select"
                      onClick={() => {
                        playClick();
                        setFormData({ ...formData, service: s.name });
                        handleNext();
                      }}
                      className={`p-6 border text-left transition-all relative min-h-[140px] flex flex-col justify-between ${
                        formData.service === s.name
                          ? "border-jcs-red bg-jcs-red/5 text-white"
                          : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{s.icon}</span>
                        {formData.service === s.name && (
                          <div className="w-2 h-2 bg-jcs-red animate-pulse" />
                        )}
                      </div>
                      <div>
                        <div className={`font-mono text-xs font-bold uppercase tracking-wider mb-2 ${formData.service === s.name ? "text-jcs-red" : "text-white"}`}>
                          {s.name}
                        </div>
                        <div className="text-[10px] uppercase font-mono text-zinc-500 leading-relaxed tracking-wider">
                          {s.desc}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: DIMENSIONS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                  DEF_02: Parâmetros Dimensionais
                </h3>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-8">
                  &gt; Insira as dimensões estimadas (conferência in-loco obrigatória).
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Inputs */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex gap-8 p-4 bg-white/5 border border-white/5">
                      <label className="flex items-center gap-3 text-white cursor-pointer font-mono text-xs uppercase tracking-widest">
                        <input
                          type="radio"
                          name="unit"
                          checked={formData.unit === "metros"}
                          onChange={() => setFormData({ ...formData, unit: "metros" })}
                          className="accent-jcs-red"
                        />
                        Metros (m)
                      </label>
                      <label className="flex items-center gap-3 text-white cursor-pointer font-mono text-xs uppercase tracking-widest">
                        <input
                          type="radio"
                          name="unit"
                          checked={formData.unit === "cm"}
                          onChange={() => setFormData({ ...formData, unit: "cm" })}
                          className="accent-jcs-red"
                        />
                        Centímetros (cm)
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-[10px] font-mono text-jcs-red mb-2 uppercase tracking-widest">
                          [ X ] Largura do Vão
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.width}
                          onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                          className="w-full bg-black border border-white/10 p-4 text-white focus:border-jcs-red focus:outline-none font-mono text-lg transition-colors"
                          placeholder="0.0"
                        />
                      </div>

                      <div className="relative group">
                        <label className="block text-[10px] font-mono text-jcs-red mb-2 uppercase tracking-widest">
                          [ Y ] Pé Direito (Altura)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.height}
                          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                          className="w-full bg-black border border-white/10 p-4 text-white focus:border-jcs-red focus:outline-none font-mono text-lg transition-colors"
                          placeholder="0.0"
                        />
                      </div>

                      <div className="relative group">
                        <label className="block text-[10px] font-mono text-jcs-red mb-2 uppercase tracking-widest">
                          [ Z ] Comprimento
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.length}
                          onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                          className="w-full bg-black border border-white/10 p-4 text-white focus:border-jcs-red focus:outline-none font-mono text-lg transition-colors"
                          placeholder="0.0"
                        />
                      </div>

                      <div className="relative group">
                        <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="w-full bg-black border border-white/10 p-4 text-zinc-400 focus:border-jcs-red focus:outline-none font-mono text-lg transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visual Blueprint Representation */}
                  <div className="lg:col-span-5 bg-[#050505] border border-white/5 p-6 flex flex-col items-center justify-between min-h-[300px] relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjAgMEwwIDBaTTAgMjBMMjAgMjBaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')]"></div>
                    
                    <div className="w-full flex justify-between items-center text-[10px] font-mono text-jcs-red tracking-widest relative z-10">
                      <span>BLUEPRINT_2D</span>
                      <span>AREA: {estimation.areaSqM} m²</span>
                    </div>

                    <div
                      className="border border-jcs-red bg-jcs-red/10 flex items-center justify-center text-jcs-red font-mono text-xs relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] my-8 z-10 shadow-[0_0_30px_rgba(225,29,72,0.15)]"
                      style={{
                        width: formData.width ? `${Math.min(parseFloat(formData.width) * 30 + 40, 240)}px` : "120px",
                        height: formData.height ? `${Math.min(parseFloat(formData.height) * 30 + 40, 180)}px` : "90px",
                      }}
                    >
                      <span className="font-bold tracking-widest opacity-50">JCS_STRUCT</span>

                      <div className="absolute -bottom-8 text-white/70 text-[10px] font-mono tracking-widest">
                        X: {formData.width}{formData.unit}
                      </div>
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-white/70 text-[10px] font-mono tracking-widest">
                        Y: {formData.height}{formData.unit}
                      </div>
                    </div>

                    <div className="w-full text-center text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em] relative z-10">
                      Esquema paramétrico em tempo real
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: MATERIAL */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                  DEF_03: Liga Metálica
                </h3>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-8">
                  &gt; Selecione a composição primária do projeto.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MATERIALS.map((m) => (
                    <motion.button
                      key={m.name}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={playHover}
                      data-cursor="select"
                      onClick={() => {
                        playClick();
                        setFormData({ ...formData, material: m.name });
                        handleNext();
                      }}
                      className={`p-6 border text-left transition-all flex flex-col justify-between ${
                        formData.material === m.name
                          ? "border-jcs-red bg-jcs-red/5 text-white"
                          : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`font-mono text-sm font-bold uppercase tracking-wider ${formData.material === m.name ? "text-jcs-red" : "text-white"}`}>
                          {m.name}
                        </span>
                        {formData.material === m.name && (
                          <div className="w-2 h-2 bg-jcs-red animate-pulse mt-1" />
                        )}
                      </div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-relaxed">
                        {m.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: FINISHING */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                  DEF_04: Revestimento Superficial
                </h3>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-8">
                  &gt; Define o grau de proteção contra corrosão e impacto.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FINISHINGS.map((f) => (
                    <motion.button
                      key={f.name}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={playHover}
                      data-cursor="select"
                      onClick={() => {
                        playClick();
                        setFormData({ ...formData, finishing: f.name });
                        handleNext();
                      }}
                      className={`p-6 border text-left transition-all flex flex-col justify-between ${
                        formData.finishing === f.name
                          ? "border-jcs-red bg-jcs-red/5 text-white"
                          : "border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className={`font-mono text-sm font-bold uppercase tracking-wider ${formData.finishing === f.name ? "text-jcs-red" : "text-white"}`}>
                          {f.name}
                        </span>
                        {formData.finishing === f.name && (
                          <div className="w-2 h-2 bg-jcs-red animate-pulse mt-1" />
                        )}
                      </div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-relaxed">
                        {f.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 5: LOCATION & FREIGHT */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tighter">
                  DEF_05: Logística
                </h3>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-8">
                  &gt; Calibração de custo de frete e içamento (Munck).
                </p>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchLocation()}
                    placeholder="DIGITE CIDADE, BAIRRO OU CEP"
                    className="flex-1 bg-black border border-white/10 p-5 text-white focus:border-jcs-red focus:outline-none font-mono text-xs tracking-widest uppercase"
                  />
                  <MagneticButton
                    onClick={handleSearchLocation}
                    disabled={isSearchingLocation}
                    className="bg-white text-black px-8 py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSearchingLocation ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <Search size={16} />
                    )}
                    <span>Processar Rota</span>
                  </MagneticButton>
                </div>

                <div className="relative mb-6 border border-white/5 overflow-hidden h-[300px] grayscale contrast-125">
                  <Map
                    userLocation={userLocationCoords}
                    onDistanceCalculated={(dist) => setFormData((p) => ({ ...p, distance: dist }))}
                  />

                  {formData.distance > 0 && (
                    <div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur-md border border-white/10 p-5 z-[400] text-[10px] font-mono tracking-widest uppercase shadow-2xl">
                      <div className="text-zinc-500 mb-2">TARGET_DISTANCE // FÁBRICA</div>
                      <div className="text-white font-bold text-2xl mb-3">
                        ~{formData.distance.toFixed(1)} km
                      </div>
                      <div className="text-jcs-red flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-jcs-red animate-pulse" />
                        Raio de Atendimento OK
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 6: ESTIMATION & LEAD SUBMISSION */}
            {step === 6 && !isSubmitted && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Result Side */}
                <div className="flex flex-col justify-between bg-[#050505] border-r border-white/5 p-8 md:p-12">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-jcs-red uppercase tracking-[0.4em] mb-6">
                      <div className="w-2 h-2 bg-jcs-red animate-pulse" />
                      <span>Cálculo Paramétrico Finalizado</span>
                    </div>

                    <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tighter mb-4">
                      {estimation.min} <span className="text-xl text-zinc-600 font-normal tracking-widest mx-2">ATÉ</span> {estimation.max}
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed mb-10 border-l border-white/10 pl-4">
                      * Estimativa baseada em custos atuais de M.P. e mão de obra técnica. Valor final validado em planta CAD ou visita.
                    </div>

                    {/* Summary Specifications */}
                    <div className="space-y-4 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Serviço</span>
                        <span className="text-white">{formData.service}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Escala</span>
                        <span className="text-white">{formData.width}m x {formData.height}m x {formData.length}m</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Material</span>
                        <span className="text-white">{formData.material}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Proteção</span>
                        <span className="text-white">{formData.finishing}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter">
                    Validar Projeto com Engenharia
                  </h4>

                  <div className="space-y-5">
                    <div className="relative group">
                      <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Responsável (Nome)</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-jcs-red focus:bg-white/10 focus:outline-none text-xs font-mono tracking-widest uppercase transition-colors"
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Contato (WhatsApp)</label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-jcs-red focus:bg-white/10 focus:outline-none text-xs font-mono tracking-widest uppercase transition-colors"
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">Requisitos Específicos</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-jcs-red focus:bg-white/10 focus:outline-none text-xs font-mono tracking-widest uppercase resize-none transition-colors"
                      />
                    </div>
                  </div>

                  <MagneticButton
                    onClick={() => {
                      submitForm();
                      window.open(createWhatsAppUrl(), "_blank");
                    }}
                    className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-3 mt-4"
                  >
                    <Send size={16} />
                    <span>Transmitir Dados (WhatsApp)</span>
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {/* SUCCESS STATE */}
            {isSubmitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 px-8"
              >
                <div className="w-16 h-16 bg-white border border-white flex items-center justify-center mx-auto mb-8 text-black">
                  <Check size={32} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                  DADOS TRANSMITIDOS
                </h3>
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-md mx-auto mb-10 leading-relaxed">
                  A equipe de engenharia da JCS Metalúrgica recebeu os parâmetros do projeto e analisará a viabilidade estrutural.
                </p>
                <MagneticButton
                  onClick={() => window.open(createWhatsAppUrl(), "_blank")}
                  className="bg-white text-black px-10 py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors inline-flex items-center gap-3"
                >
                  <MessageSquare size={16} />
                  <span>Acessar Chat (WhatsApp)</span>
                </MagneticButton>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Controls */}
          {!isSubmitted && (
            <div className="flex justify-between items-center border-t border-white/5 bg-[#050505] p-6 md:p-8">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-white disabled:opacity-20 transition-colors group"
              >
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Anterior</span>
              </button>

              {step < 6 && (
                <MagneticButton
                  onClick={handleNext}
                  className="flex items-center gap-3 bg-jcs-red hover:bg-red-700 text-white px-8 py-4 text-[10px] font-black font-mono uppercase tracking-[0.2em] transition-colors"
                >
                  <span>Próximo Passo</span>
                  <ChevronRight size={14} />
                </MagneticButton>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
