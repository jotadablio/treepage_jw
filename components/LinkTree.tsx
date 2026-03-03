import React from 'react';
import { MessageCircle, Box, Download, Video, ArrowUpRight } from 'lucide-react';

interface LinkCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  colorClass: string;
  delay: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ href, icon, title, subtitle, colorClass, delay }) => (
  <a
    href={href}
    target={href === '#' ? undefined : "_blank"}
    rel={href === '#' ? undefined : "noopener noreferrer"}
    className={`group relative flex flex-col items-center justify-center p-6 gap-3 rounded-2xl border bg-slate-900/40 backdrop-blur-md transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 ${colorClass} ${delay} overflow-hidden`}
    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href === '#') {
        e.preventDefault();
        alert('Link em breve!');
      }
    }}
  >
    {/* Hover Gradient Background */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white to-transparent transition-opacity duration-500"></div>

    {/* Icon with Glow */}
    <div className="relative">
      <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity"></div>
      <div className="relative p-3 bg-slate-950/50 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
        {icon}
      </div>
    </div>

    {/* Text */}
    <div className="text-center z-10">
      <h2 className="font-tech text-lg font-bold uppercase tracking-wide text-slate-100 group-hover:text-white transition-colors">
        {title}
      </h2>
      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest group-hover:text-cyan-200 transition-colors">
        {subtitle}
      </p>
    </div>

    {/* External Link Arrow */}
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-50 transition-opacity transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <ArrowUpRight size={14} />
    </div>
  </a>
);

export const LinkTree: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      
      <LinkCard
        href="https://wa.me/"
        icon={<MessageCircle size={32} className="text-green-400" />}
        title="Orçamento"
        subtitle="WhatsApp"
        colorClass="border-green-500/30 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]"
        delay="animate-[fadeIn_0.5s_ease-out]"
      />

      <LinkCard
        href="#"
        icon={<Box size={32} className="text-cyan-400" />}
        title="Portfólio"
        subtitle="Meus Trabalhos"
        colorClass="border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        delay="animate-[fadeIn_0.6s_ease-out]"
      />

      <LinkCard
        href="#"
        icon={<Video size={32} className="text-pink-400" />}
        title="TikTok"
        subtitle="Processo Criativo"
        colorClass="border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]"
        delay="animate-[fadeIn_0.7s_ease-out]"
      />

      <LinkCard
        href="#"
        icon={<Download size={32} className="text-purple-400" />}
        title="Arquivos STL"
        subtitle="Cults 3D"
        colorClass="border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]"
        delay="animate-[fadeIn_0.8s_ease-out]"
      />

    </div>
  );
};