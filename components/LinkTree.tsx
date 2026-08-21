import React from 'react';
import { MessageCircle, Box, Download, Video, ArrowUpRight } from 'lucide-react';

interface LinkCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentClass: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ href, icon, title, subtitle, accentClass }) => (
  <a
    href={href}
    target={href === '#' ? undefined : "_blank"}
    rel={href === '#' ? undefined : "noopener noreferrer"}
    className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:border-slate-500 hover:bg-slate-900"
    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href === '#') {
        e.preventDefault();
        alert('Link em breve!');
      }
    }}
  >
    {/* Icon */}
    <div className={`shrink-0 p-2.5 rounded-lg bg-slate-800 border border-slate-700 transition-colors group-hover:border-slate-600 ${accentClass}`}>
      {icon}
    </div>

    {/* Text */}
    <div className="min-w-0 flex-1">
      <h2 className="font-tech text-sm font-semibold text-slate-100">
        {title}
      </h2>
      <p className="text-xs text-slate-400 truncate">
        {subtitle}
      </p>
    </div>

    {/* External Link Arrow */}
    <ArrowUpRight size={16} className="shrink-0 text-slate-600 transition-all group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
);

export const LinkTree: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">

      <LinkCard
        href="https://wa.me/5561998243040?text=Ol%C3%A1%21%20Gostaria%20de%20or%C3%A7ar%20um%20produto%20ou%20pe%C3%A7a%21"
        icon={<MessageCircle size={20} />}
        title="Orçamento"
        subtitle="Fale pelo WhatsApp"
        accentClass="text-emerald-400"
      />

      <LinkCard
        href="https://instagram.com/jotadablio3d"
        icon={<Box size={20} />}
        title="Portfólio"
        subtitle="Meus trabalhos"
        accentClass="text-cyan-400"
      />

      <LinkCard
        href="https://tiktok.com/@jotadablio3d"
        icon={<Video size={20} />}
        title="TikTok"
        subtitle="Processo criativo"
        accentClass="text-pink-400"
      />

      <LinkCard
        href="https://cults3d.com/en/users/JW3DWORLD"
        icon={<Download size={20} />}
        title="Arquivos STL"
        subtitle="Cults 3D"
        accentClass="text-purple-400"
      />

    </div>
  );
};
