import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import BootScreen from "@/components/BootScreen";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["300", "400", "700", "900"] });
const spaceMono = Space_Mono({ subsets: ["latin"], variable: "--font-space-mono", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "JCS Metalúrgica | Engenharia e Precisão Industrial",
  description: "Especialistas em estruturas metálicas e projetos industriais sob medida. Cortes CNC, caldeiraria, galpões e solda de alta penetração em São Paulo.",
  keywords: ["estruturas metálicas", "metalúrgica são paulo", "corte CNC", "galpão industrial", "solda TIG MIG", "mezanino metálico", "projeto de engenharia", "JCS metalúrgica"],
  authors: [{ name: "JCS Engenharia" }],
  openGraph: {
    title: "JCS Metalúrgica | Precisão Absoluta",
    description: "Engenharia metálica desenvolvida para transformar projetos em precisão extrema.",
    url: "https://jcsmetalurgica.com.br",
    siteName: "JCS Metalúrgica",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356fce?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Estrutura Metálica Industrial JCS",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JCS Metalúrgica | Engenharia e Precisão",
    description: "Estruturas metálicas com precisão dimensional milimétrica.",
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356fce?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} ${spaceMono.variable} font-sans bg-[#050505] text-white antialiased overflow-x-hidden selection:bg-jcs-red selection:text-white`}>
        {/* Global Noise Overlay */}
        <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />
        {/* Telemetry Background Grid */}
        <div className="fixed inset-0 z-[-1] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <CustomCursor />
        <SmoothScroll>
          <BootScreen />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
