import React from 'react';
import { CommitItem } from '../types';

interface SandboxPipelineProps {
  workingFiles: string[];
  stagedFiles: string[];
  localCommits: CommitItem[];
  animationState: 'idle' | 'adding' | 'committing' | 'pushing';
  handleGitAdd: () => void;
  handleGitCommit: () => void;
  handleGitPush: () => void;
  handleReset: () => void;
  visualLogs: string[];
  triggerSound?: (type: any) => void;
}

export const SandboxPipeline: React.FC<SandboxPipelineProps> = ({
  workingFiles,
  stagedFiles,
  localCommits,
  animationState,
  handleGitAdd,
  handleGitCommit,
  handleGitPush,
  handleReset,
  visualLogs,
  triggerSound,
}) => {
  return (
    <div className="space-y-6 bg-black/55 border-2 border-emerald-950/60 rounded-[3rem] p-6 sm:p-10 relative overflow-hidden text-[#ecfdf5] shadow-2xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-emerald-950/60 pb-6">
        <div>
          <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            Workspace Sandbox
          </span>
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mt-2 font-mono uppercase">
            🧬 Git Operations Sandbox Pipeline
          </h3>
          <p className="text-[11px] text-emerald-100/40 mt-1 max-w-xl leading-relaxed font-mono">
            Interact with the visual Git circuit. Trigger standard command actions below to watch local files stage, commit locally, and push to the remote upstream repository.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 font-mono">
          <button 
            onClick={() => { triggerSound?.('click'); handleGitAdd(); }}
            disabled={animationState !== 'idle'}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-md disabled:cursor-not-allowed"
          >
            git add .
          </button>
          <button 
            onClick={() => { triggerSound?.('click'); handleGitCommit(); }}
            disabled={animationState !== 'idle'}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-md disabled:cursor-not-allowed"
          >
            git commit
          </button>
          <button 
            onClick={() => { triggerSound?.('click'); handleGitPush(); }}
            disabled={animationState !== 'idle'}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-md disabled:cursor-not-allowed"
          >
            git push
          </button>
          <button 
            onClick={() => { triggerSound?.('click'); handleReset(); }}
            disabled={animationState !== 'idle'}
            className="px-4 py-2 bg-transparent hover:bg-red-500/15 text-red-400 border border-red-500/35 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-[0.98]"
          >
            Reset Arena
          </button>
        </div>
      </div>

      {/* Visual Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono">
        <div className="p-5 bg-slate-950/45 border border-emerald-950 rounded-[2rem] relative space-y-4 shadow-inner">
          <span className="text-[7px] text-amber-500/70 block uppercase font-bold tracking-widest font-black">Stage 01 // Directory</span>
          <h4 className="text-xs font-bold text-white uppercase">Working Directory</h4>
          <p className="text-[9px] text-emerald-100/30 leading-relaxed">Local workspace sandbox where files are edited.</p>
          <div className="bg-black/45 p-4 rounded-xl min-h-[90px] space-y-2 border border-emerald-950/30">
            {workingFiles.map(f => (
              <div key={f} className="flex justify-between items-center text-[9px] text-amber-500">
                <span>📁 {f}</span>
                <span className="text-[7.5px] uppercase font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">modified</span>
              </div>
            ))}
            {workingFiles.length === 0 && (
              <span className="text-[9px] text-emerald-800 italic block text-center pt-4">Workspace disk clean</span>
            )}
          </div>
        </div>

        <div className="p-5 bg-slate-950/45 border border-emerald-950 rounded-[2rem] relative space-y-4 shadow-inner">
          <span className="text-[7px] text-emerald-400 block uppercase font-bold tracking-widest font-black">Stage 02 // Index</span>
          <h4 className="text-xs font-bold text-white uppercase">Staging Area</h4>
          <p className="text-[9px] text-emerald-100/30 leading-relaxed">Index where prepared changes are tracked before commit.</p>
          <div className="bg-black/45 p-4 rounded-xl min-h-[90px] space-y-2 border border-emerald-950/30">
            {stagedFiles.map(f => (
              <div key={f} className="flex justify-between items-center text-[9px] text-emerald-400">
                <span>📁 {f}</span>
                <span className="text-[7.5px] uppercase font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">staged</span>
              </div>
            ))}
            {stagedFiles.length === 0 && (
              <span className="text-[9px] text-emerald-800 italic block text-center pt-4">Staging area empty</span>
            )}
          </div>
        </div>

        <div className="p-5 bg-slate-950/45 border border-emerald-950 rounded-[2rem] relative space-y-4 shadow-inner">
          <span className="text-[7px] text-cyan-400 block uppercase font-bold tracking-widest font-black">Stage 03 // History</span>
          <h4 className="text-xs font-bold text-white uppercase">Local Commit Log</h4>
          <p className="text-[9px] text-emerald-100/30 leading-relaxed">Immutable database (.git) recording your local commit history.</p>
          <div className="bg-black/45 p-4 rounded-xl min-h-[90px] space-y-2 border border-emerald-950/30">
            {localCommits.map(c => (
              <div key={c.hash} className="flex justify-between items-center text-[9px] text-cyan-400">
                <span>📦 HASH: {c.hash}</span>
                <span className="text-[7.5px] uppercase font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">sealed</span>
              </div>
            ))}
            {localCommits.length === 0 && (
              <span className="text-[9px] text-emerald-800 block text-center pt-4">0 commits registered</span>
            )}
          </div>
        </div>
      </div>

      {/* Sandbox terminal logs */}
      <div className="bg-black border border-emerald-950/80 rounded-2xl p-5 font-mono text-[9px] text-emerald-400/80 space-y-1.5 relative shadow-inner">
        <div className="flex justify-between items-center text-[7px] font-bold uppercase text-emerald-500/30 border-b border-emerald-950 pb-2 mb-2 tracking-widest font-black">
          <span>Sandbox Logger Console</span>
          <span className="animate-pulse flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Telemetry Logs
          </span>
        </div>
        {visualLogs.map((log, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold select-none">&gt;&gt;</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SandboxPipeline;
