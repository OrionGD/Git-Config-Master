import React from 'react';

interface CertificateCardProps {
  studentName: string;
  onClose?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ studentName, onClose }) => {
  const hashRef = Math.random().toString(16).substring(2, 7).toUpperCase();
  return (
    <div className="p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-emerald-500/40 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6 animate-fadeIn w-full max-w-2xl mx-auto">
      {/* holographic background light */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>

      <header className="space-y-2 relative z-10 w-full">
        <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-emerald-500 uppercase border-b border-emerald-950 pb-4 mb-4">
          <span>Certificate ID: ORION-GC-{hashRef}</span>
          <span>Verified: Biosphere Authority</span>
        </div>
        
        <span className="text-4xl">🏆</span>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-none font-mono">
          Git Biosphere Expert
        </h2>
        <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Soil & Branch Registry Credential</p>
      </header>

      <div className="space-y-4 relative z-10 my-4 max-w-md">
        <p className="text-xs text-emerald-100/60 leading-relaxed font-mono">
          This digital badge registers and verifies that
        </p>
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent italic">
          {studentName}
        </h3>
        <p className="text-xs text-emerald-100/60 leading-relaxed font-mono">
          has successfully stabilized the core environmental containment reactor and completed all active restoring campaigns, demonstrating ultimate expertise in precedence config overrides.
        </p>
      </div>

      <div className="w-full flex items-center justify-between pt-6 border-t border-emerald-950 relative z-10 font-mono">
        <div className="space-y-1 text-left">
          <span className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest block">Authorized Signatory</span>
          <span className="text-[9px] text-emerald-100/40 block">Biosphere Lead Arborist</span>
        </div>
        <div className="space-y-1 text-right">
          <span className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest block">Registry Verification Hash</span>
          <span className="text-[9px] text-emerald-400/80 block">SECURE_BIOM_HASH:{hashRef}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
        <div className="px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[9px] text-emerald-400 font-mono tracking-widest uppercase">
          Status: SEALED, SIGNED & CLOUD SYNCED
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="px-4 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 text-[9px] rounded-lg border border-emerald-500/30 font-bold uppercase transition-colors active:scale-95"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};
