import React from 'react';
import { X, CheckCircle, Terminal } from 'lucide-react';

interface DeploymentGuideProps {
  onClose: () => void;
}

export const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal className="text-cyan-400" />
            Tutorial de Lançamento (Vercel)
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6 text-slate-300">
          <p className="text-sm">
            Para colocar este site no ar gratuitamente usando a Vercel, siga os passos abaixo. 
            Você precisará de uma conta no GitHub e na Vercel.
          </p>

          <div className="space-y-4">
            <Step 
              num="1" 
              title="Preparar o Código" 
              desc="Baixe este código gerado e coloque em uma pasta no seu computador. Certifique-se de que a estrutura de arquivos (index.html, App.tsx, etc.) está correta." 
            />
            
            <Step 
              num="2" 
              title="Criar Repositório no GitHub" 
              desc="Crie um novo repositório público ou privado no GitHub. Faça o upload dos arquivos (ou use git push se estiver familiarizado com terminal)." 
            />

            <Step 
              num="3" 
              title="Conta na Vercel" 
              desc="Acesse vercel.com e crie uma conta (faça login com o GitHub para facilitar)." 
            />

            <Step 
              num="4" 
              title="Importar Projeto" 
              desc="No dashboard da Vercel, clique em 'Add New Project'. Selecione o repositório que você acabou de criar no GitHub e clique em 'Import'." 
            />

            <Step 
              num="5" 
              title="Configuração do Build (Importante)" 
              desc="A Vercel geralmente detecta que é um projeto Vite/React automaticamente. Se perguntar, o 'Framework Preset' é Vite. As configurações padrão (Build Command: `vite build` ou `npm run build`, Output Directory: `dist`) geralmente funcionam se você tiver o `package.json` correto." 
            />
             
             <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <h4 className="text-white font-bold mb-2 text-sm">Nota sobre package.json</h4>
                <p className="text-xs mb-2">Se você estiver criando o projeto do zero, execute no terminal da pasta:</p>
                <code className="block bg-black p-2 rounded text-xs text-green-400 font-mono mb-2">
                  npm create vite@latest jotadablio-3d -- --template react-ts
                </code>
                <p className="text-xs">Depois substitua os arquivos gerados (App.tsx, index.css, etc.) pelo código deste chat.</p>
             </div>

            <Step 
              num="6" 
              title="Deploy" 
              desc="Clique em 'Deploy'. Aguarde alguns segundos. Seu site estará online com um link tipo `jotadablio-3d.vercel.app`." 
            />
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <h3 className="text-white font-bold mb-2">Personalização Final</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-slate-400">
              <li>Atualize os links `href` no arquivo <code className="text-cyan-400">components/LinkTree.tsx</code>.</li>
              <li>Troque o número do WhatsApp.</li>
              <li>Se tiver imagens reais, substitua os ícones na <code className="text-cyan-400">components/PrinterAnimation.tsx</code> por tags <code className="text-cyan-400">&lt;img&gt;</code>.</li>
            </ul>
          </div>

        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors"
          >
            Entendi, vamos lá!
          </button>
        </div>

      </div>
    </div>
  );
};

const Step = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-cyan-400 font-bold">
      {num}
    </div>
    <div>
      <h3 className="text-white font-bold">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);