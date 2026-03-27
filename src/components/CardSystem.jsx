import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function PortalCard({ href, Icon, title, description, bgImage = null, logo = null, accentColor = '#D4F82E', openInNewTab = false }) {
  const { theme } = useTheme();

  const cardBg = theme === 'dark' ? 'rgba(51, 51, 51, 0.9)' : 'rgba(218, 218, 218, 0.9)';
  const panelBg = theme === 'dark' ? 'rgba(51, 51, 51, 0.9)' : 'rgba(245,245,245,0.9)';
  const textColor = 'var(--app-text)';

  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className="group relative backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 transition-all duration-300 flex flex-col w-full h-64 md:h-72 overflow-hidden"
      style={{
        boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
        backgroundColor: cardBg,
        color: textColor,
      }}
    >
      {bgImage && (
        <div className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url(${bgImage})` }} />
      )}

      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: panelBg }}>
        {logo ? (
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        ) : (
          <Icon style={{ color: accentColor }} className="w-8 h-8" />
        )}
      </div>
      <h2 className="text-2xl font-semibold mb-3" style={{ color: textColor }}>{title}</h2>
      <p className="mb-8 flex-grow leading-relaxed" style={{ color: 'var(--muted)' }}>
        {description}
      </p>
      <div className="flex items-center font-medium mt-auto" style={{ color: accentColor }}>
        <span>Access Portal</span>
        <ArrowRight style={{ color: accentColor }} className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </a>
  );
}

export default PortalCard;