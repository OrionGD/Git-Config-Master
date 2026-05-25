import React from 'react';

interface DiagnosticsViewProps {
  onLogout?: () => void;
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({ onLogout }) => {
  return (
    <div className="space-y-8 animate-fadeIn text-[#ecfdf5]">
      <header className="space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase font-mono">System Precedence Diagnostics</h2>
        <p className="text-emerald-100/50 text-xs">
          Inspect common repository authorization failures, precedence conflicts, and execute session cleanup procedures.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-[var(--color-bg-secondary)] border border-emerald-950/60 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all flex flex-col justify-between animate-fadeIn">
          <div>
            <h4 className="text-white font-bold text-xs font-mono">Issue: Commit Author logs wrong developer identity</h4>
            <p className="text-emerald-100/40 text-[10px] leading-relaxed mt-2 font-mono">
              <strong>Precedence Diagnosis:</strong> Git reads the most specific configuration file first. If your display name is correct in your `~/.gitconfig` (--global) but incorrect in your `.git/config` (--local), Git overrides it with the local one.
            </p>
          </div>
          <div className="space-y-1.5 font-mono text-[9px] text-emerald-300">
            <span className="text-[7.5px] uppercase font-bold text-emerald-600 block">Resolution command:</span>
            <code className="block bg-black/40 p-2.5 rounded-lg border border-emerald-950/50 select-all">git config --local user.name "Correct Display Name"</code>
          </div>
        </div>

        <div className="p-8 bg-[var(--color-bg-secondary)] border border-emerald-950/60 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all flex flex-col justify-between animate-fadeIn">
          <div>
            <h4 className="text-white font-bold text-xs font-mono">Issue: Configuration edits not applying as expected</h4>
            <p className="text-emerald-100/40 text-[10px] leading-relaxed mt-2 font-mono">
              <strong>Precedence Diagnosis:</strong> System-wide configuration variables stored in `/etc/gitconfig` (--system) are ignored if any matching key is set globally or locally. Use the prioritization layers diagram to identify matching masks.
            </p>
          </div>
          <div className="space-y-1.5 font-mono text-[9px] text-emerald-300">
            <span className="text-[7.5px] uppercase font-bold text-emerald-600 block">Inspection command:</span>
            <code className="block bg-black/40 p-2.5 rounded-lg border border-emerald-950/50 select-all">git config --list --show-origin</code>
          </div>
        </div>
      </div>

      {/* 🔐 Cyber-Security Session Terminate Panel */}
      <div className="p-8 border border-red-950/80 bg-red-950/5 rounded-3xl space-y-6 font-mono border-dashed mt-6">
        <div className="space-y-1 text-left">
          <span className="text-[8px] font-black text-red-500 tracking-widest block bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded w-fit">
            Security Protocol // Termination
          </span>
          <h3 className="text-sm font-bold text-white uppercase">Secure Session Purge</h3>
          <p className="text-red-100/40 text-[10px] leading-relaxed">
            Immediately terminate the active repository configuration sequence, purge all dynamic credentials and session storage cache variables, and revoke administrative access logs.
          </p>
        </div>
        
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full py-4 bg-red-900/20 hover:bg-red-600 hover:text-black text-red-400 border border-red-500/30 text-[9px] uppercase font-black tracking-widest rounded-xl transition-all shadow-md active:scale-95"
          >
            🚨 Purge & Terminate active Kiosk Session
          </button>
        )}
      </div>
    </div>
  );
};
export default DiagnosticsView;
