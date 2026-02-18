import React, { useEffect, useState } from 'react';
import { Send, FileSearch, Truck } from 'lucide-react';

const steps = [
  { id: 1, text: "Você envia o projeto", icon: <Send size={16} /> },
  { id: 2, text: "Eu modelo/analiso", icon: <FileSearch size={16} /> },
  { id: 3, text: "Impressão e envio", icon: <Truck size={16} /> },
];

export const Workflow: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSteps(prev => {
        if (prev < steps.length) return prev + 1;
        return prev;
      });
    }, 1000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-900/60 rounded-xl border border-slate-800 p-4 mt-4 backdrop-blur-md shadow-lg">
      <h3 className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">
        Passo a Passo
      </h3>
      
      {/* Container for steps */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-slate-300">
        
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Item */}
            <div 
              className={`flex flex-col items-center text-center gap-2 transition-all duration-700 transform flex-1 min-w-0
                ${index < visibleSteps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700 shadow-sm shrink-0">
                {step.icon}
              </div>
              {/* Added leading-tight and balance to prevent awkward breaks */}
              <span className="font-medium text-[11px] md:text-xs leading-tight text-balance">
                {step.text}
              </span>
            </div>
            
            {/* Desktop Arrow Separator */}
            {index < steps.length - 1 && (
               <div className={`hidden md:block text-slate-600 transition-opacity duration-700 shrink-0 ${index < visibleSteps - 1 ? 'opacity-100' : 'opacity-0'}`}>»</div>
            )}
            
            {/* Mobile Vertical Dot Separator */}
             {index < steps.length - 1 && (
               <div className={`md:hidden h-3 w-px border-l border-dashed border-slate-600 my-0 transition-opacity duration-700 ${index < visibleSteps - 1 ? 'opacity-100' : 'opacity-0'}`}></div>
            )}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
};