import React from 'react';

export const ScopesView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-black text-white tracking-tight">Architectural Soil Layers</h2>
      <div className="flex items-center space-x-4 mb-4">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest font-mono">PRIORITY OVERRIDES</span>
        <div className="h-px flex-1 bg-emerald-950/20"></div>
      </div>
      <div className="grid gap-6">
        {[
          { name: '--local', desc: 'Highest priority. Overrides all options. Specific to one project repository.', file: '.git/config', color: 'text-emerald-400', badge: 'Topsoil layer' },
          { name: '--global', desc: 'Middle priority. Applies user-wide. Governs your OS user profile settings.', file: '~/.gitconfig', color: 'text-emerald-500', badge: 'Mid soil layer' },
          { name: '--system', desc: 'Lowest priority. Machine-wide defaults. Governs all OS user accounts.', file: '/etc/gitconfig', color: 'text-emerald-700', badge: 'Bedrock layer' },
        ].map((s) => (
          <article key={s.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 bg-black/40 border border-emerald-950/40 rounded-3xl hover:border-emerald-500/30 transition-all group">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <code className={`font-black text-2xl ${s.color} transition-colors`}>{s.name}</code>
                <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-900/30 text-[8px] text-emerald-400 font-mono rounded-lg">{s.badge}</span>
              </div>
              <p className="text-[9px] text-emerald-600 mt-2 font-mono uppercase tracking-[0.3em] font-bold">{s.file}</p>
            </div>
            <p className="text-xs text-emerald-100/50 font-medium max-w-xs sm:text-right">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
