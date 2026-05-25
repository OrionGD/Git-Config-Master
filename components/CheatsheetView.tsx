import React, { useState } from 'react';
import { GIT_COMMANDS_DATABASE } from '../gitCommands';

export const CheatsheetView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCatFilter, setActiveCatFilter] = useState('All');
  const [expandedCommand, setExpandedCommand] = useState<string | null>(null);

  // Derive categories list
  const categories = ['All', ...GIT_COMMANDS_DATABASE.map(c => c.name)];

  // Nested filter logic
  const filteredDatabase = GIT_COMMANDS_DATABASE.map(cat => {
    const matchingCmds = cat.commands.filter(cmd => {
      const matchesSearch = 
        cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cmd.note && cmd.note.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
    return { ...cat, commands: matchingCmds };
  }).filter(cat => {
    const matchesCategory = activeCatFilter === 'All' || cat.name === activeCatFilter;
    return matchesCategory && cat.commands.length > 0;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tight">Ecosystem Command Hub</h2>
        <p className="text-emerald-100/60 text-xs">Instantly look up and inspect operational parameters for the primary canopy engine.</p>
      </header>

      {/* Search & Categories filter row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-950 pb-6">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text"
            placeholder="Search operational commands... (e.g. config display)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-emerald-950 rounded-xl text-xs font-mono text-emerald-300 placeholder-emerald-800 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-emerald-700 hover:text-emerald-500 text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filter categories pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCatFilter(cat)}
              className={`px-3 py-1.5 rounded-lg border text-[8px] font-mono uppercase tracking-wider transition-all ${
                activeCatFilter === cat
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-emerald-950 text-emerald-800 hover:border-emerald-900 hover:text-emerald-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Category-grouped commands list */}
      <div className="space-y-8">
        {filteredDatabase.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <span>{cat.icon}</span> {cat.name}
            </h3>
            
            <div className="space-y-3">
              {cat.commands.map((cmdItem, cIdx) => {
                const isExpanded = expandedCommand === cmdItem.cmd;
                return (
                  <article 
                    key={cIdx} 
                    className="bg-black/20 border border-emerald-950/40 rounded-3xl overflow-hidden shadow-sm transition-all duration-300"
                  >
                    <div 
                      onClick={() => setExpandedCommand(isExpanded ? null : cmdItem.cmd)}
                      className="p-6 flex justify-between items-center cursor-pointer select-none hover:bg-emerald-950/5 transition-colors"
                    >
                      <code className="text-xs sm:text-sm font-black text-emerald-300 font-mono truncate mr-4">{cmdItem.cmd}</code>
                      <div className="flex items-center gap-4 text-right shrink-0">
                        <span className="text-[10px] text-emerald-100/40 hidden md:inline truncate max-w-xs">{cmdItem.desc}</span>
                        <span className="text-emerald-700 text-xs font-bold font-mono">
                          {isExpanded ? '▲ CLOSE' : '▼ VIEW'}
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-emerald-950/30 space-y-4 font-mono text-[10px] animate-fadeIn">
                        <p className="text-emerald-100/60 leading-relaxed max-w-xl md:hidden">{cmdItem.desc}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className="text-[8px] font-black text-emerald-500/50 uppercase tracking-widest block">Functional Anatomy</span>
                            <p className="text-emerald-100/40 leading-relaxed">{cmdItem.note || 'No additional notes registered.'}</p>
                          </div>
                          <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-emerald-950/50">
                            <div className="space-y-1">
                              <span className="text-[8px] font-black text-emerald-500/50 uppercase tracking-widest block">Sandbox Command Execution</span>
                              <pre className="p-3.5 bg-black/45 border border-emerald-950 rounded-2xl overflow-x-auto text-emerald-300">
                                <code>{cmdItem.cmd}</code>
                              </pre>
                            </div>
                          </div>
                        </div>

                        {cmdItem.diagramBefore && cmdItem.diagramAfter && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-emerald-950/20">
                            <div className="space-y-1">
                              <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest block">Git Tree: BEFORE Operation</span>
                              <pre className="p-2 bg-emerald-950/10 rounded border border-emerald-500/20 text-[9px] text-emerald-400">
                                <code>{cmdItem.diagramBefore}</code>
                              </pre>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest block">Git Tree: AFTER Operation</span>
                              <pre className="p-2 bg-emerald-950/10 rounded border border-emerald-500/20 text-[9px] text-emerald-400">
                                <code>{cmdItem.diagramAfter}</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}

        {filteredDatabase.length === 0 && (
          <div className="text-center py-16 border border-dashed border-emerald-900/30 rounded-3xl">
            <span className="text-3xl block mb-3">🔍</span>
            <h4 className="text-xs font-bold text-emerald-500">No matching commands found</h4>
          </div>
        )}
      </div>
    </div>
  );
};
