import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

// Substitua as URLs abaixo pelos nomes dos seus arquivos (ex: "/minha-foto.jpg")
const items = [
  {
    id: 1,
    name: "Action Figure",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=600", 
    color: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
    text: "text-red-400"
  },
  {
    id: 2,
    name: "Decoração",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=600",
    color: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
    text: "text-emerald-400"
  },
  {
    id: 3,
    name: "Peças Técnicas",
    image: "https://images.unsplash.com/photo-1586775490184-b7913be163a9?auto=format&fit=crop&q=80&w=600",
    color: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]",
    text: "text-cyan-400"
  }
];

export const PrinterAnimation: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const printDuration = 3000; // 3 segundos para imprimir
    const displayDuration = 2000; // 2 segundos mostrando o resultado

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < printDuration) {
        // Fase de Impressão
        setIsFinished(false);
        const newProgress = Math.min((elapsed / printDuration) * 100, 100);
        setProgress(newProgress);
        animationFrame = requestAnimationFrame(animate);
      } else if (elapsed < printDuration + displayDuration) {
        // Fase de Exibição
        setIsFinished(true);
        setProgress(100);
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Trocar item e reiniciar
        setIndex((prev) => (prev + 1) % items.length);
        startTime = null;
        setProgress(0);
        setIsFinished(false);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [index]);

  const currentItem = items[index];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      {/* Estrutura da Impressora (Estilo Simpático/Cartoon Tech) */}
      <div className="relative w-full aspect-square bg-slate-900 rounded-2xl border-2 border-slate-700 p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden group">
        
        {/* Topo da Máquina */}
        <div className="absolute top-0 left-0 w-full h-4 bg-slate-800 border-b border-slate-700"></div>

        {/* Eixo Z (Trilhos) */}
        <div className="absolute top-4 bottom-10 left-3 w-1.5 bg-slate-800 rounded-full border border-slate-700"></div>
        <div className="absolute top-4 bottom-10 right-3 w-1.5 bg-slate-800 rounded-full border border-slate-700"></div>

        {/* Eixo X (Barra Horizontal que sobe) */}
        <div 
            className="absolute left-2 right-2 h-4 bg-slate-700/80 backdrop-blur-sm border border-slate-600 rounded-full flex items-center justify-center z-20 shadow-lg"
            style={{ bottom: `${15 + (progress * 0.7)}%` }} // Movimento vertical sincronizado
        >
            {/* Cabeça de Impressão (Nozzle) */}
            <div className={`w-8 h-8 bg-slate-200 rounded-lg border-2 border-slate-400 relative flex justify-center items-center shadow-xl ${!isFinished ? 'animate-scan-x' : ''}`}>
                {/* Olhinhos do Nozzle (Friendly Touch) */}
                {!isFinished && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                    <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                  </div>
                )}
                {/* Bico Quente */}
                <div className="absolute -bottom-2 w-1.5 h-2 bg-amber-500 rounded-b-full"></div>
                {/* Fumaça/Partícula (só quando imprime) */}
                {!isFinished && progress > 0 && (
                   <div className="absolute -bottom-4 w-1 h-1 bg-white rounded-full animate-ping opacity-75"></div>
                )}
            </div>
        </div>

        {/* Área da Mesa de Impressão */}
        <div className="relative w-full h-full flex items-end justify-center pb-12 px-4 z-10">
            {/* Objeto */}
            <div className="relative w-full h-full max-h-[75%] flex items-end justify-center">
                <img 
                    src={currentItem.image} 
                    alt="Printing..."
                    className="max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-75"
                    style={{ 
                        // O segredo do efeito: recortar o topo baseado no progresso
                        clipPath: `inset(${100 - progress}% 0 0 0)` 
                    }}
                />
                
                {/* Laser Line (a linha brilhante onde está sendo "impresso") */}
                {!isFinished && progress > 0 && (
                    <div 
                        className={`absolute left-0 right-0 h-[2px] w-3/4 mx-auto blur-[2px] ${currentItem.color}`}
                        style={{ bottom: `${progress}%`, transition: 'none' }}
                    ></div>
                )}
            </div>
        </div>

        {/* Base da Impressora (Painel de Controle) */}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-slate-800 border-t border-slate-700 flex items-center justify-between px-4 z-30">
            {/* Status Led */}
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isFinished ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-cyan-500 animate-pulse'}`}></div>
            </div>

            {/* Display "Friendly" */}
            <div className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[10px] font-mono text-cyan-400 flex items-center gap-2 shadow-inner">
                <span className="opacity-70">{isFinished ? 'DONE' : 'PRINTING'}</span>
                <span className="text-xs">{isFinished ? '( ˶ˆᗜˆ˵ )' : '( • ᴗ • )'}</span>
            </div>
        </div>

      </div>

      {/* Nome do Item */}
      <h3 className={`mt-3 font-tech text-base md:text-lg font-bold uppercase tracking-wider transition-all duration-300 ${currentItem.text} ${progress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {currentItem.name}
      </h3>

    </div>
  );
};