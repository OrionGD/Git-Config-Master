import React from 'react';
import { CommitItem } from '../types';

interface DigitalCanopyProps {
  workingFiles: string[];
  stagedFiles: string[];
  localCommits: CommitItem[];
  remoteCommits: CommitItem[];
  animationState: 'idle' | 'adding' | 'committing' | 'pushing';
  configs: { [key: string]: string };
}

export const DigitalCanopy: React.FC<DigitalCanopyProps> = ({
  workingFiles,
  stagedFiles,
  localCommits,
  remoteCommits,
  animationState,
  configs,
}) => {
  return (
    <div className="p-6 border-2 border-emerald-950/60 rounded-[2rem] bg-black/45 flex flex-col items-center justify-between min-h-[300px] relative overflow-hidden font-mono shadow-inner group">
      {/* Premium ambient particle indicators */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="oxygen-particle oxygen-bubble-1"></div>
        <div className="oxygen-particle oxygen-bubble-2"></div>
        <div className="oxygen-particle oxygen-bubble-3"></div>
      </div>

      <span className="absolute top-3 left-4 text-[7px] font-mono tracking-[0.2em] text-emerald-500/60 uppercase font-black">Git Visual Graph Tracker</span>
      
      {/* Interactive Git Directed Acyclic Graph Canvas */}
      <svg className="w-full h-[220px]" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Core repository history line path */}
        <path d="M160 210 C160 170 150 140 160 110 C165 95 175 80 185 70" stroke="var(--color-brand-700)" strokeWidth="6" strokeLinecap="round" />
        
        {/* Local commit branch path */}
        <path d="M156 135 C130 120 110 125 90 100" stroke="var(--color-brand-600)" strokeWidth="3" strokeLinecap="round" />
        {animationState === 'committing' && (
          <>
            <path d="M156 135 C130 120 110 125 90 100" stroke="var(--color-brand-300)" strokeWidth="4" strokeLinecap="round" className="flow-active" />
            <circle r="3.5" fill="var(--color-brand-500)" className="animate-pulse">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M156 135 C130 120 110 125 90 100" />
            </circle>
            <circle r="2.5" fill="var(--color-brand-200)" className="animate-pulse">
              <animateMotion dur="1.2s" begin="0.4s" repeatCount="indefinite" path="M156 135 C130 120 110 125 90 100" />
            </circle>
          </>
        )}
        
        {/* Remote sync branch path */}
        <path d="M163 115 C190 95 210 90 230 75" stroke="var(--color-brand-600)" strokeWidth="3" strokeLinecap="round" />
        {animationState === 'pushing' && (
          <>
            <path d="M163 115 C190 95 210 90 230 75" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" className="flow-active" />
            <circle r="4" fill="#22d3ee" className="animate-pulse">
              <animateMotion dur="1s" repeatCount="indefinite" path="M163 115 C190 95 210 90 230 75" />
            </circle>
            <circle r="2.5" fill="#e0f2fe" className="animate-pulse">
              <animateMotion dur="1s" begin="0.3s" repeatCount="indefinite" path="M163 115 C190 95 210 90 230 75" />
            </circle>
          </>
        )}
        
        {/* Staging area file indexing path */}
        <path d="M160 110 C160 80 140 60 120 65" stroke="var(--color-brand-400)" strokeWidth="3" strokeLinecap="round" />
        {animationState === 'adding' && (
          <>
            <path d="M160 110 C160 80 140 60 120 65" stroke="var(--color-brand-100)" strokeWidth="4" strokeLinecap="round" className="flow-active" />
            <circle r="3.5" fill="var(--color-brand-500)" className="animate-pulse">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M160 110 C160 80 140 60 120 65" />
            </circle>
            <circle r="2.5" fill="var(--color-brand-300)" className="animate-pulse">
              <animateMotion dur="1.2s" begin="0.4s" repeatCount="indefinite" path="M160 110 C160 80 140 60 120 65" />
            </circle>
          </>
        )}

        {/* Staging data transfers animation elements */}
        {animationState === 'adding' && (
          <>
            <circle cx="110" cy="50" r="2.5" className="fill-cyan-400 animate-bounce" />
            <circle cx="140" cy="65" r="2" className="fill-cyan-300 animate-bounce rain-drop-1" />
            <circle cx="160" cy="80" r="3" className="fill-cyan-400 animate-bounce rain-drop-2" />
          </>
        )}

        {/* Working directory modified files displayed as workspace logs */}
        {workingFiles.map((file, idx) => {
          const x = 50 + idx * 25;
          const y = 140 + idx * 10;
          return (
            <g key={file} className="sway-element" style={{ '--delay': `${idx * 0.5}s` } as React.CSSProperties}>
              <path d={`M${x} ${y} C${x-5} ${y-10} ${x+10} ${y-15} ${x+15} ${y} C${x+10} ${y+10} ${x-5} ${y+5} ${x} ${y}`} fill="#f59e0b" fillOpacity="0.8" />
              <text x={x+2} y={y+12} fill="#ffffff" fontSize="6" fontFamily="monospace" textAnchor="middle">{file.substring(0, 5)}</text>
            </g>
          );
        })}

        {/* Staged files within active repository index */}
        {stagedFiles.map((file, idx) => {
          const x = 90 + idx * 20;
          const y = 60 - idx * 5;
          return (
            <g key={file} className="sway-element" style={{ '--delay': `${idx * 0.4}s` } as React.CSSProperties}>
              <circle cx={x} cy={y} r="6" className="fill-emerald-500/30 stroke-emerald-400 stroke" />
              <circle cx={x} cy={y} r="2.5" className="fill-emerald-400 animate-pulse" />
              <text x={x} y={y+11} fill="var(--color-brand-100)" fontSize="5" fontFamily="monospace" textAnchor="middle">{file}</text>
            </g>
          );
        })}

        {/* Local commit database nodes */}
        {localCommits.map((c, idx) => {
          const x = 80 - idx * 20;
          const y = 90 + idx * 8;
          return (
            <g key={c.hash} className="animate-pulse">
              <rect x={x-7} y={y-5} width="14" height="10" rx="3" className="fill-emerald-700 stroke-emerald-400 stroke" />
              <circle cx={x} cy={y} r="3" className="fill-rose-300" />
              <text x={x} y={y+10} fill="var(--color-brand-200)" fontSize="5" fontFamily="monospace" textAnchor="middle">#{c.hash}</text>
            </g>
          );
        })}

        {/* Remote synchronised commit database nodes */}
        {remoteCommits.map((c, idx) => {
          const x = 240 + idx * 22;
          const y = 70 - idx * 5;
          return (
            <g key={c.hash}>
              <circle cx={x} cy={y} r="8" className="fill-cyan-500/20 stroke-cyan-400 stroke-2" />
              <circle cx={x} cy={y} r="4" className="fill-cyan-400" />
              {/* Synchronous connection vectors */}
              <line x1={x} y1={y-11} x2={x} y2={y-8} stroke="#22d3ee" strokeWidth="1" />
              <line x1={x+8} y1={y+8} x2={x+5} y2={y+5} stroke="#22d3ee" strokeWidth="1" />
              <text x={x} y={y+14} fill="#93c5fd" fontSize="5" fontFamily="monospace" textAnchor="middle">remote:{c.hash}</text>
            </g>
          );
        })}

        {/* Precedence status markers */}
        {workingFiles.length > 0 && (
          <text x="60" y="180" fill="#f59e0b" fontSize="6" fontFamily="monospace" className="animate-pulse">Unstaged Changes (Modified)</text>
        )}
        {stagedFiles.length > 0 && (
          <text x="110" y="30" fill="#10b981" fontSize="6" fontFamily="monospace">Staged Changes (Index)</text>
        )}
      </svg>

      {/* Configuration precedence layers display */}
      <div className="w-full grid grid-cols-3 gap-1.5 text-[8px] font-mono text-center pt-2 border-t border-emerald-950/80">
        <div className={`p-1.5 rounded-xl transition-colors ${configs['user.name'] ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-slate-950/60 text-emerald-800'}`}>
          <span className="block font-black uppercase">Local Config</span>
          <span>.git/config</span>
        </div>
        <div className={`p-1.5 rounded-xl transition-colors ${configs['user.email'] ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-slate-950/60 text-emerald-800'}`}>
          <span className="block font-black uppercase">Global Config</span>
          <span>~/.gitconfig</span>
        </div>
        <div className="p-1.5 rounded-xl bg-slate-950/40 text-emerald-900 border border-transparent">
          <span className="block font-black uppercase">System Config</span>
          <span>/etc/gitconfig</span>
        </div>
      </div>
    </div>
  );
};
export default DigitalCanopy;
