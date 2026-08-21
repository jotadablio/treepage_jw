import React from 'react';
import { PrinterAnimation } from './components/PrinterAnimation';
import { LinkTree } from './components/LinkTree';
import { Workflow } from './components/Workflow';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 relative overflow-hidden bg-slate-950 text-slate-200 selection:bg-amber-500/30">

      {/* Background: subtle vignette, no grid/neon */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,0,0,0.4),transparent_70%)]"></div>
      </div>

      <main className="w-full max-w-2xl flex flex-col gap-8 z-10 items-center mt-2 md:mt-8">
        {/* Header & Printer Animation */}
        <header className="flex flex-col items-center gap-6 w-full px-4">

          {/* Container da Impressora - Ajustado para não estourar em mobile */}
          <div className="w-full max-w-[280px] md:max-w-[320px] flex items-center justify-center">
             <PrinterAnimation />
          </div>

          <div className="text-center space-y-2 relative">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-tech">
              Jotadablio <span className="text-slate-400 font-light">3D</span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
              <span>Modelagem</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
              <span>Impressão</span>
              <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
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