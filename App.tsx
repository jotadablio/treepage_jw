import React from 'react';
import { PrinterAnimation } from './components/PrinterAnimation';
import { LinkTree } from './components/LinkTree';
import { Workflow } from './components/Workflow';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 relative overflow-hidden bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      
      {/* Background: Neon Grid (First Design) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
        {/* Bottom Glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full"></div>
      </div>

      <main className="w-full max-w-2xl flex flex-col gap-8 z-10 items-center mt-2 md:mt-8">
        {/* Header & Printer Animation */}
        <header className="flex flex-col items-center gap-6 w-full px-4">
          
          {/* Container da Impressora - Ajustado para não estourar em mobile */}
          <div className="w-full max-w-[280px] md:max-w-[320px] flex items-center justify-center">
             <PrinterAnimation />
          </div>
          
          <div className="text-center space-y-2 relative">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white font-tech drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              JOTADABLIO <span className="text-cyan-400">3D</span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-[10px] md:text-sm font-bold tracking-[0.2em] text-cyan-200/70 uppercase">
              <span>Modelagem</span>
              <span className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"></span>
              <span>Impressão</span>
              <span className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"></span>
              <span>Arte</span>
            </div>
          </div>
        </header>

        {/* Links Section */}
        <section className="w-full px-2">
          <LinkTree />
        </section>

        {/* Workflow Footer Animation */}
        <section className="w-full px-2 pb-8">
          <Workflow />
        </section>
      </main>

      <footer className="w-full text-center pb-6 z-10 text-slate-600 text-[10px] uppercase tracking-widest font-mono">
         © {new Date().getFullYear()} Jotadablio 3DWorld
      </footer>
    </div>
  );
}