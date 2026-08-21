import React, { useState, useEffect } from 'react';

// Para inserir suas próprias fotos, adicione os arquivos na pasta remota "public/" (ou "public/images/")
// do seu projeto. Como estamos no Vercel/Vite, tudo dentro da pasta "public" pode ser
// acessado com uma barra "/" no começo.
const items = [
  {
    id: 1,
    name: "Action Figure",
    image: "/images/miranha.png",
    accent: "text-red-400",
  },
  {
    id: 2,
    name: "Decoração",
    image: "/images/jarro.png",
    accent: "text-emerald-400",
  },
  {
    id: 3,
    name: "Peças Técnicas",
    image: "/images/pecas.png",
    accent: "text-cyan-400",
  }
];

export const PrinterAnimation: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const printDuration = 4000; // 4 segundos para imprimir
    const displayDuration = 2000; // 2 segundos mostrando o resultado

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < printDuration) {
        setIsFinished(false);
        const newProgress = Math.min((elapsed / printDuration) * 100, 100);
        setProgress(newProgress);
        animationFrame = requestAnimationFrame(animate);
      } else if (elapsed < printDuration + displayDuration) {
        setIsFinished(true);
        setProgress(100);
        animationFrame = requestAnimationFrame(animate);
      } else {
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
  const layerCount = Math.max(1, Math.round((progress / 100) * 220));

  return (
    <div className="flex flex-col items-center justify-center w-full">

      {/* Estrutura da Impressora — linhas limpas, estilo FDM real */}
      <div className="relative w-full aspect-square bg-slate-900 rounded-lg border border-slate-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden">

        {/* Topo do gabinete */}
        <div className="absolute top-0 left-0 w-full h-3 bg-slate-800 border-b border-slate-700 z-30"></div>

        {/* Colunas / eixo Z */}
        <div className="absolute top-3 bottom-9 left-2.5 w-[3px] bg-slate-700 rounded-full"></div>
        <div className="absolute top-3 bottom-9 right-2.5 w-[3px] bg-slate-700 rounded-full"></div>

        {/* Barra do eixo X (gantry) que sobe conforme progresso */}
        <div
          className="absolute left-1.5 right-1.5 h-[3px] bg-slate-600 z-20"
          style={{ bottom: `${14 + (progress * 0.72)}%` }}
        >
          {/* Toolhead / extrusora */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-800 rounded-sm border border-slate-600 shadow-md ${!isFinished ? 'animate-nozzle-travel' : ''}`}
               style={{ left: 'calc(50% - 14px)' }}>
            {/* Fan grille */}
            <div className="absolute inset-1 rounded-sm border border-slate-600/70"></div>
            {/* Bico aquecido */}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1.5 rounded-b-sm ${!isFinished ? 'bg-amber-400' : 'bg-slate-500'}`}></div>
          </div>
        </div>

        {/* Área da mesa de impressão */}
        <div className="relative w-full h-full flex items-end justify-center pb-10 px-5 z-10">
          <div className="relative w-full h-full max-h-[72%] flex items-end justify-center">
            <div
              className="relative max-w-full max-h-full"
              style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            >
              <img
                src={currentItem.image}
                alt={currentItem.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const colorMap: Record<string, string> = {
                    "Action Figure": "b1584f",
                    "Decoração": "4f9d72",
                    "Peças Técnicas": "4f9da8"
                  };
                  const hexColor = colorMap[currentItem.name] || "17171a";
                  e.currentTarget.src = `https://placehold.co/600x600/${hexColor}/f4f4f5?text=Foto+ausente`;
                }}
                className="max-w-full max-h-full object-contain"
              />
              {/* Textura de camadas — só aparece enquanto imprime */}
              {!isFinished && (
                <div className="absolute inset-0 layer-lines pointer-events-none"></div>
              )}
            </div>
          </div>

          {/* Mesa (plataforma) */}
          <div className="absolute bottom-9 left-4 right-4 h-1 bg-slate-700 rounded-full"></div>
        </div>

        {/* Painel de status */}
        <div className="absolute bottom-0 left-0 w-full h-9 bg-slate-800 border-t border-slate-700 flex items-center justify-between px-3 z-30">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isFinished ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></div>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              {isFinished ? 'concluído' : 'imprimindo'}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 tabular-nums">
            {isFinished ? `${layerCount}/${layerCount} camadas` : `${Math.round(progress)}%`}
          </span>
        </div>

      </div>

      {/* Nome do item */}
      <h3 className={`mt-3 font-tech text-sm md:text-base font-semibold tracking-wide transition-all duration-300 text-slate-200 ${progress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {currentItem.name}
      </h3>

    </div>
  );
};
