import React from 'react';

interface ReactorViewProps {
  reactorState: 'idle' | 'playing' | 'gameover' | 'victory';
  reactorTemp: number;
  reactorTimer: number;
  reactorQuestionIdx: number;
  reactorScore: number;
  reactorQuestions: { q: string; opts: string[]; ans: number }[];
  startReactorGame: () => void;
  handleReactorAnswer: (optIndex: number) => void;
  setActiveModule: (mod: string) => void;
  triggerSound: (type: any) => void;
}

export const ReactorView: React.FC<ReactorViewProps> = ({
  reactorState,
  reactorTemp,
  reactorTimer,
  reactorQuestionIdx,
  reactorQuestions,
  startReactorGame,
  handleReactorAnswer,
  setActiveModule,
  triggerSound,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn text-[#ecfdf5]">
      <header className="space-y-2 border-b border-emerald-950 pb-6">
        <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest block bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full w-fit">
          Stabilization Arena
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight uppercase font-mono">Conflict Resolution Reactor</h2>
        <p className="text-emerald-100/50 text-xs">
          Resolve priority conflicts and Git command precedence merges before the temperature spikes past critical threshold limits.
        </p>
      </header>

      {reactorState === 'idle' && (
        <div className="p-10 rounded-[2.5rem] bg-black/55 border-2 border-emerald-950 text-center space-y-6 max-w-xl mx-auto shadow-xl">
          <span className="text-6xl block animate-pulse">☢️</span>
          <h3 className="text-lg font-black text-white uppercase font-mono">Reactor Status: Standby</h3>
          <p className="text-xs text-emerald-100/40 leading-relaxed max-w-sm mx-auto font-mono">
            Answer override and prioritization problems under a 45-second clock check. Complete all challenges to secure the exclusive <strong>Reactor Master</strong> Badge and +250 XP.
          </p>
          <button
            onClick={() => { triggerSound('click'); startReactorGame(); }}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95 font-mono shadow-lg shadow-emerald-950/45 animate-pulse"
          >
            Initialize Conflict Reactor
          </button>
        </div>
      )}

      {reactorState === 'playing' && (
        <div className="p-8 rounded-[2.5rem] bg-black/75 border-2 border-red-500/30 space-y-8 relative overflow-hidden reactor-critical">
          {/* Game Status bars */}
          <div className="flex justify-between items-center border-b border-emerald-950 pb-4">
            <div className="space-y-1">
              <span className="text-[8px] font-mono tracking-widest text-red-500 uppercase font-black">Conflict Diagnostic Layer 0{reactorQuestionIdx + 1} / 05</span>
              <h3 className="text-sm font-black text-white font-mono uppercase">Stabilizer Integrity</h3>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <span className="text-[8px] text-red-400/60 block uppercase font-black">Reactor Temp</span>
                <span className={`font-black ${reactorTemp >= 80 ? 'text-red-500 animate-pulse brand-glow-error' : 'text-amber-500'}`}>{reactorTemp}%</span>
              </div>
              <div>
                <span className="text-[8px] text-emerald-400/60 block uppercase font-black">Countdown Clock</span>
                <span className="font-black text-emerald-400">{reactorTimer}s</span>
              </div>
            </div>
          </div>

          {/* Question display */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-emerald-100/90 leading-relaxed font-mono">
              {reactorQuestions[reactorQuestionIdx].q}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reactorQuestions[reactorQuestionIdx].opts.map((opt, oidx) => (
                <button
                  key={oidx}
                  onClick={() => { triggerSound('click'); handleReactorAnswer(oidx); }}
                  className="p-5 bg-slate-950/70 hover:bg-emerald-950/20 border border-emerald-950 hover:border-emerald-500/50 rounded-2xl text-left text-xs font-mono text-emerald-300 hover:text-white transition-all active:scale-[0.98] shadow-md leading-relaxed"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Temperature bar */}
          <div className="space-y-1.5 font-mono text-[8px] uppercase tracking-wider text-red-400/50">
            <div className="flex justify-between font-black">
              <span>Critical Overheat Threshold</span>
              <span>Reactor Failure: 100%</span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full border border-red-950/60 overflow-hidden">
              <div className="bg-red-500 h-full rounded-full transition-all duration-300" style={{ width: `${reactorTemp}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {reactorState === 'gameover' && (
        <div className="p-10 rounded-[2.5rem] bg-[#1a0808] border-2 border-red-500/40 text-center space-y-6 max-w-xl mx-auto animate-fadeIn shadow-xl">
          <span className="text-6xl block animate-bounce">🚨</span>
          <h3 className="text-xl font-black text-red-500 brand-glow-error font-mono uppercase">REACTOR OVERHEAT FAILURE</h3>
          <p className="text-xs text-red-200/50 max-w-sm mx-auto leading-relaxed font-mono">
            Reactor temperature spiked above critical limits or countdown elapsed. Repository configurations remain unpatched and out of sync.
          </p>
          <button
            onClick={() => { triggerSound('click'); startReactorGame(); }}
            className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all active:scale-95 font-mono"
          >
            Retry Conflict Reactor
          </button>
        </div>
      )}

      {reactorState === 'victory' && (
        <div className="p-10 rounded-[2.5rem] bg-[#081a10] border-2 border-emerald-500/40 text-center space-y-6 max-w-xl mx-auto animate-fadeIn shadow-xl">
          <span className="text-6xl block animate-bounce">🛡️</span>
          <h3 className="text-xl font-black text-emerald-400 brand-glow font-mono uppercase">REACTOR STABILIZED</h3>
          <p className="text-xs text-emerald-100/60 max-w-sm mx-auto leading-relaxed font-mono">
            Repository stabilization completed. Configuration overrides resolved cleanly. Unlocked the prestigious <strong>Reactor Master</strong> achievement badge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono">
            <button
              onClick={() => { triggerSound('click'); startReactorGame(); }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all active:scale-95"
            >
              Play Again
            </button>
            <button
              onClick={() => { triggerSound('click'); setActiveModule('badges'); }}
              className="px-6 py-3 bg-slate-950 border border-emerald-500/30 text-emerald-300 font-bold text-[9px] uppercase tracking-widest rounded-xl transition-all active:scale-95"
            >
              View Achievement Shelf
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReactorView;
