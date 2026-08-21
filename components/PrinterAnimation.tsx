import React, { useState, useEffect } from 'react';

// Para inserir suas próprias fotos, adicione os arquivos na pasta remota "public/" (ou "public/images/")
// do seu projeto. Como estamos no Vercel/Vite, tudo dentro da pasta "public" pode ser
// acessado com uma barra "/" no começo.
const items = [
  {
    id: 1,
    name: "Action Figure",
    image: "/images/miranha.png",
  },
  {
    id: 2,
    name: "Decoração",
    image: "/images/jarro.png",
  },
  {
    id: 3,
    name: "Peças Técnicas",
    image: "/images/pecas.png",
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

  // Coordenadas simuladas do bico, tipo preview de slicer (Cura/PrusaSlicer)
  const coordZ = (progress / 100) * 48;
  const coordX = 50 + 34 * Math.sin(progress * 0.32);
  const coordY = 50 + 34 * Math.cos(progress * 0.32);

  const placeholderFor = (name: string) => {
    const colorMap: Record<string, string> = {
      "Action Figure": "b1584f",
      "Decoração": "4f9d72",
      "Peças Técnicas": "4f9da8"
    };
    const hexColor = colorMap[name] || "17171a";
    return `https://placehold.co/600x600/${hexColor}/f4f4f5?text=Foto+ausente`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">

      {/* Filtro SVG: extrai só o contorno (silhueta - erosão) da imagem, tingido em âmbar */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="contour-line" x="-30%" y="-30%" width="160%" height="160%">
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.85
                      0 0 0 0 0.62
                      0 0 0 0 0.35
                      0 0 0 1 0"
              result="tinted"
            />
            <feMorphology in="tinted" operator="erode" radius="1.6" result="eroded" />
            <feComposite in="tinted" in2="eroded" operator="out" />
          </filter>
        </defs>
      </svg>

      {/* Viewport estilo preview de fatiador (toolpath) */}
      <div className="relative w-full aspect-square bg-slate-900 rounded-lg border border-slate-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Grade de pontos, como o plano de construção de um slicer */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '14px 14px'
          }}
        ></div>

        {/* Leitura de coordenadas */}
        <div className="absolute top-2.5 left-3 z-30 font-mono text-[9px] leading-tight text-slate-500 tabular-nums select-none">
          <div>X {coordX.toFixed(1)}</div>
          <div>Y {coordY.toFixed(1)}</div>
          <div>Z {coordZ.toFixed(1)}</div>
        </div>

        {/* Linha da altura atual + bico traçando o caminho */}
        <div
          className="absolute left-3 right-3 z-20"
          style={{ bottom: `${10 + (progress * 0.75)}%` }}
        >
          <div
            className={`absolute w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(217,140,63,0.8)] ${!isFinished ? 'animate-nozzle-travel' : 'opacity-0'}`}
            style={{ left: 'calc(50% - 3px)' }}
          >
            {/* Rastro do feixe */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-amber-400/60 to-transparent"></div>
          </div>
        </div>

        {/* Objeto sendo impresso: base colorida (já impressa) + topo em contorno (fila de impressão) */}
        <div className="relative w-full h-full flex items-end justify-center pb-10 px-6 z-10">
          <div className="relative w-full h-full max-h-[74%]">

            {/* Contorno — parte ainda não impressa */}
            <img
              src={currentItem.image}
              alt=""
              aria-hidden="true"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = placeholderFor(currentItem.name);
              }}
              className="absolute inset-0 w-full h-full object-contain object-bottom"
              style={{ filter: 'url(#contour-line)', clipPath: `inset(0 0 ${progress}% 0)` }}
            />

            {/* Colorida — parte já impressa, cresce de baixo para cima */}
            <img
              src={currentItem.image}
              alt={currentItem.name}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = placeholderFor(currentItem.name);
              }}
              className="absolute inset-0 w-full h-full object-contain object-bottom"
              style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            />

            {/* Textura de camadas sobre a parte já impressa */}
            {!isFinished && (
              <div
                className="absolute inset-0 layer-lines pointer-events-none"
                style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
              ></div>
            )}
          </div>

          {/* Plano de construção */}
          <div className="absolute bottom-9 left-5 right-5 h-px bg-slate-700"></div>
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
