import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
  triggerSound: (type: 'levelup' | 'click') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, triggerSound }) => {
  const [latency, setLatency] = useState(14);
  const [activeUsers, setActiveUsers] = useState(4821);
  const [terminalLogIdx, setTerminalLogIdx] = useState(0);

  // Gamified simulated logs for our live console feed
  const liveTerminalLogs = [
    "[SYSTEM] Connecting to local staging node...",
    "[SYSTEM] Precedence hierarchy initialized: local > global > system",
    "[SECURITY] Key signature SHA-256 verified successfully",
    "[NETWORK] Connection to remote upstream origin: main (active)",
    "[CONFLICTS] Scanning registry for configuration leaks... 0 breaches",
    "[GAME MATRIX] Leveling thresholds dynamically loaded successfully",
    "[ACADEMY] Ready. Enter the chamber to synchronize files."
  ];

  useEffect(() => {
    // Keep active user counts shifting slightly for live gaming platform feel
    const intervalUsers = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 7) - 3);
      setLatency(prev => Math.max(8, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);

    // Stream live terminal logs sequentially
    const intervalLogs = setInterval(() => {
      setTerminalLogIdx(prev => (prev + 1) % liveTerminalLogs.length);
    }, 3000);

    return () => {
      clearInterval(intervalUsers);
      clearInterval(intervalLogs);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center p-6 sm:p-12 relative overflow-hidden text-[#ecfdf5]" role="main">
      {/* Premium Sci-Fi Grid and Radial Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-emerald-950/45 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[var(--color-brand-950)]/30 rounded-full blur-[140px]"></div>
      </div>
      
      {/* 🚀 TOP ENTERPRISE PLATFORM STATUS HUD */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between border border-emerald-950/60 bg-black/45 backdrop-blur-md px-6 py-4 rounded-3xl font-mono text-[9px] text-emerald-400 gap-4 mb-16 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-bold tracking-widest uppercase">Platform Status: Active</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <div>
            <span className="text-emerald-100/40 block">OPERATORS ONLINE</span>
            <span className="text-white font-bold text-xs">{activeUsers.toLocaleString()}</span>
          </div>
          <div className="h-6 w-px bg-emerald-950/60 hidden sm:block"></div>
          <div>
            <span className="text-emerald-100/40 block">LATENCY PIN</span>
            <span className="text-white font-bold text-xs">{latency}ms</span>
          </div>
          <div className="h-6 w-px bg-emerald-950/60 hidden sm:block"></div>
          <div>
            <span className="text-emerald-100/40 block">ARENA ZONE</span>
            <span className="text-emerald-400 font-bold text-xs tracking-wider">ORION-PRIMARY</span>
          </div>
        </div>
      </div>

      {/* 🔮 HERO ARENA SECTION */}
      <div className="relative z-10 max-w-6xl w-full text-center space-y-14 animate-fadeIn pb-20">
        <header className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-900/40 bg-emerald-950/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 font-mono">
            🛡️ Enterprise Learning League
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter leading-none font-mono uppercase">
            GIT <span className="text-emerald-500 brand-glow">RESOLUTION</span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-mono text-emerald-400 tracking-[0.25em] uppercase font-bold">
            THE CONFIGURATION ARENA
          </h2>
          <p className="text-emerald-100/50 text-xs sm:text-sm font-mono max-w-3xl mx-auto leading-relaxed">
            Configure local prioritizations, operate stage pipelines, and resolve critical DAG rebase merges inside our high-fidelity sandboxed simulator workspace.
          </p>
        </header>

        {/* 📟 INTERACTIVE GAME TERMINAL ENGINE WIDGET */}
        <div className="w-full max-w-3xl mx-auto rounded-[2rem] border-2 border-emerald-950 bg-black/85 backdrop-blur-lg p-8 text-left font-mono text-xs text-emerald-400 shadow-2xl relative overflow-hidden space-y-4 hover:border-emerald-500/20 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-emerald-950 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] animate-pulse"></span>
              <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
              <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-500/60 font-black">Localhost Simulation Console</span>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-emerald-500 font-bold">$</span> <span className="text-white font-bold">git config --local user.email</span> "prithvi@orion-os.org"
            </div>
            <div className="text-emerald-600/70 italic text-[11px] pl-4">
              # Overrides global settings (~/.gitconfig) within this directory context.
            </div>
            <div>
              <span className="text-emerald-500 font-bold">$</span> <span className="text-white font-bold">git config --show-origin --list</span>
            </div>
            
            {/* Live streaming status console feedback logs */}
            <div className="bg-slate-950/70 p-4 border border-emerald-950/80 rounded-xl space-y-1.5 text-[10px] text-emerald-500/90 min-h-[64px] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-white font-bold tracking-wide">
                <span className="animate-pulse">⚡</span>
                <span>{liveTerminalLogs[terminalLogIdx]}</span>
              </div>
              <div className="text-[8px] text-emerald-600/60">Registry latency: {latency - 4}ms ● Connection encrypted TLS_AES_256_GCM</div>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-950/60 flex items-center justify-between text-[9px] text-emerald-500/40">
            <span>[Node: secure-gateway-east-5]</span>
            <span className="animate-pulse font-bold text-emerald-500">● Core System Integrity: 100%</span>
          </div>
        </div>

        {/* 🎮 PRIMARY NAVIGATION GATEWAY BUTTONS */}
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-xl mx-auto" aria-label="Gaming Entrance Controls">
          <button 
            onClick={() => { triggerSound('levelup'); onEnter(); }}
            className="btn-primary w-full sm:w-auto text-xs uppercase tracking-[0.25em] py-5 px-12 transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center font-black rounded-2xl shadow-primary animate-pulse"
          >
            Launch Arena Hub
          </button>
          
          <a 
            href="https://training.github.com/downloads/github-git-cheat-sheet.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-tertiary w-full sm:w-auto text-xs uppercase tracking-[0.25em] py-5 px-12 transition-all flex items-center justify-center gap-3 font-mono rounded-2xl"
          >
            Cheatsheet Manual
          </a>
        </nav>
      </div>

      {/* 🧭 SELECT YOUR TRAINING CAMPAIGN TRACKS */}
      <section className="relative z-10 max-w-7xl w-full border-t border-emerald-950/60 pt-20 pb-20 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-[0.3em] block">Training Tracks</span>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-mono">
            SELECT YOUR CAMPAIGN MODE
          </h3>
          <p className="text-emerald-100/40 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Test your commands, stage assets, configure override hierarchies, and cool down overheating conflict nodes.
          </p>
        </div>

        {/* High-Fidelity Campaign Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#040813] border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 hover:border-emerald-500/40 transition-all hover:scale-[1.02] shadow-xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono">
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold uppercase rounded-lg">
                  Level 01
                </span>
                <span className="text-[8px] text-emerald-100/30 uppercase tracking-widest font-black">NOVICE TRACK</span>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors font-mono">Configuration Stratum</h4>
              <p className="text-[11px] text-emerald-100/40 leading-relaxed font-mono">
                Configure profile parameters under global variables. Master local directory overrides and system bedrock files registry levels.
              </p>
            </div>
            <div className="pt-6 border-t border-emerald-950/60 flex justify-between items-center text-[9px] font-mono">
              <span className="text-amber-500">🏆 Rewards: +150 XP</span>
              <span className="text-emerald-500">Unlocked</span>
            </div>
          </div>

          <div className="p-8 bg-[#040813] border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 hover:border-emerald-500/40 transition-all hover:scale-[1.02] shadow-xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono">
                <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-bold uppercase rounded-lg">
                  Level 02
                </span>
                <span className="text-[8px] text-amber-400/40 uppercase tracking-widest font-black">INTERMEDIATE</span>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors font-mono">Staging & DAG Commit Loop</h4>
              <p className="text-[11px] text-emerald-100/40 leading-relaxed font-mono">
                Stage local file trees, seal immutable commit nodes, and synchronize changes up to upstream remote servers cleanly.
              </p>
            </div>
            <div className="pt-6 border-t border-emerald-950/60 flex justify-between items-center text-[9px] font-mono">
              <span className="text-amber-500">🏆 Rewards: +200 XP</span>
              <span className="text-emerald-500">Unlocked</span>
            </div>
          </div>

          <div className="p-8 bg-[#040813] border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 hover:border-emerald-500/40 transition-all hover:scale-[1.02] shadow-xl flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-mono">
                <span className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[8px] font-bold uppercase rounded-lg">
                  Level 05
                </span>
                <span className="text-[8px] text-red-500/40 uppercase tracking-widest font-black">EXPERT ARENA</span>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-wide group-hover:text-emerald-300 transition-colors font-mono">DAG Conflict Reactor</h4>
              <p className="text-[11px] text-emerald-100/40 leading-relaxed font-mono">
                Solve priority tree conflicts and rebase merges under active countdown limits. Complete all layers to avoid reactor breach overheating!
              </p>
            </div>
            <div className="pt-6 border-t border-emerald-950/60 flex justify-between items-center text-[9px] font-mono">
              <span className="text-amber-500">🏆 Rewards: +250 XP</span>
              <span className="text-emerald-500">Unlocked</span>
            </div>
          </div>
        </div>

        {/* 🎮 ACADEMY PLAYBOOK & GAMIFICATION RULES */}
        <div className="border border-emerald-950/80 rounded-[3rem] bg-black/45 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit mx-auto md:mx-0 font-black">
              Gamified Playbook
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-mono">
              GAMIFICATION SYSTEM RULES: HOW TO PLAY & EARN
            </h3>
            <p className="text-[11px] text-emerald-100/40 leading-relaxed max-w-xl font-mono">
              Learn how our interactive reward mechanics, progression paths, and sandbox overrides combine to form your Git credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-[10px] text-emerald-100/50">
            <div className="p-5 bg-slate-950/45 border border-emerald-950/60 rounded-2xl space-y-2 hover:border-emerald-500/20 transition-all">
              <span className="text-xl">⭐️</span>
              <h4 className="text-xs font-bold text-white uppercase font-black">1. Earn XP (Experience)</h4>
              <p className="text-[9px] text-emerald-100/30 leading-relaxed">
                Completing configuration steps and pipeline tasks awards XP. Each successfully solved milestone provides a massive XP boost!
              </p>
            </div>

            <div className="p-5 bg-slate-950/45 border border-emerald-950/60 rounded-2xl space-y-2 hover:border-emerald-500/20 transition-all">
              <span className="text-xl">📈</span>
              <h4 className="text-xs font-bold text-white uppercase font-black">2. Ranks & Levels</h4>
              <p className="text-[9px] text-emerald-100/30 leading-relaxed">
                Accumulate XP to rank up through 5 levels: <span className="text-emerald-400">Beginner</span>, <span className="text-emerald-400">Intermediate</span>, <span className="text-emerald-400">Advanced</span>, <span className="text-emerald-400">Professional</span>, and <span className="text-emerald-400">Master</span>.
              </p>
            </div>

            <div className="p-5 bg-slate-950/45 border border-emerald-950/60 rounded-2xl space-y-2 hover:border-emerald-500/20 transition-all">
              <span className="text-xl">🎖️</span>
              <h4 className="text-xs font-bold text-white uppercase font-black">3. Achievements Shelf</h4>
              <p className="text-[9px] text-emerald-100/30 leading-relaxed">
                Unlock 6 unique credentials by conquering learning modules. Achievements reside permanently on your Holographic Achievements Shelf.
              </p>
            </div>

            <div className="p-5 bg-slate-950/45 border border-emerald-950/60 rounded-2xl space-y-2 hover:border-emerald-500/20 transition-all">
              <span className="text-xl">⚡</span>
              <h4 className="text-xs font-bold text-white uppercase font-black">4. Sandbox Overrides</h4>
              <p className="text-[9px] text-emerald-100/30 leading-relaxed">
                Want to test locked items? Click on any locked card in the Achievements tab to bypass its seal instantly, or use the Sandbox Override Console.
              </p>
            </div>

            <div className="p-5 bg-slate-950/45 border border-emerald-950/60 rounded-2xl space-y-2 hover:border-emerald-500/20 transition-all">
              <span className="text-xl">🕹️</span>
              <h4 className="text-xs font-bold text-white uppercase font-black">5. Resolve Reactor Temp</h4>
              <p className="text-[9px] text-emerald-100/30 leading-relaxed">
                Keep the repository stable! Answer conflict questions inside the Conflict Reactor to lower temperature spikes before breach time ticks out.
              </p>
            </div>

            <div className="p-5 bg-slate-950/45 border border-emerald-950/60 rounded-2xl space-y-2 hover:border-emerald-500/20 transition-all">
              <span className="text-xl">📜</span>
              <h4 className="text-xs font-bold text-white uppercase font-black">6. Academy Certificate</h4>
              <p className="text-[9px] text-emerald-100/30 leading-relaxed">
                Complete all five active missions successfully to generate your signed Academy Certificate, perfect for verifying your newly acquired skills!
              </p>
            </div>
          </div>
        </div>

        {/* 🛡️ SECTION A: REAL-TIME CONFIGURATION PRECEDENCE MATRIX */}
        <div className="border border-emerald-950/80 rounded-[3rem] bg-black/45 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit mx-auto md:mx-0 font-black">
              Technical Precedence Layering
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-mono">
              CONFIGURATION PRECEDENCE MATRIX
            </h3>
            <p className="text-[11px] text-emerald-100/40 leading-relaxed max-w-xl font-mono">
              Understand how Git resolves variable settings dynamically based on scope priority rules.
            </p>
          </div>

          <div className="overflow-x-auto w-full border border-emerald-950/80 rounded-2xl">
            <table className="w-full text-left font-mono text-[9px] sm:text-[10px] text-emerald-100/60 min-w-[500px]">
              <thead>
                <tr className="bg-emerald-950/20 border-b border-emerald-950/80 text-emerald-400 font-bold uppercase tracking-wider">
                  <th className="p-4 font-black">Scope Parameter</th>
                  <th className="p-4 font-black">File Path Target</th>
                  <th className="p-4 text-center font-black">Priority Status</th>
                  <th className="p-4 text-right font-black">Security & Accessibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/30">
                <tr className="hover:bg-emerald-500/5 transition-colors">
                  <td className="p-4 font-bold text-white">--local</td>
                  <td className="p-4 font-bold">.git/config</td>
                  <td className="p-4 text-center"><span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-[8px] font-black">HIGHEST (1st Priority)</span></td>
                  <td className="p-4 text-right text-emerald-400/80">Directory specific variables configuration</td>
                </tr>
                <tr className="hover:bg-emerald-500/5 transition-colors">
                  <td className="p-4 font-bold text-white">--global</td>
                  <td className="p-4 font-bold">~/.gitconfig</td>
                  <td className="p-4 text-center"><span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-[8px] font-black">MEDIUM (2nd Priority)</span></td>
                  <td className="p-4 text-right text-emerald-400/80">User account profile master defaults</td>
                </tr>
                <tr className="hover:bg-emerald-500/5 transition-colors">
                  <td className="p-4 font-bold text-white">--system</td>
                  <td className="p-4 font-bold">/etc/gitconfig</td>
                  <td className="p-4 text-center"><span className="px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-[8px] font-black">LOWEST (3rd Priority)</span></td>
                  <td className="p-4 text-right text-emerald-400/80">Machine-wide system override variables</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 🏆 SECTION B: LEADERBOARD OF ARENA TOP OPERATORS */}
        <div className="border border-emerald-950/80 rounded-[3rem] bg-black/45 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit mx-auto md:mx-0 font-black">
              Live Leaderboard
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-mono">
              ARENA TOP RATED OPERATORS
            </h3>
            <p className="text-[11px] text-emerald-100/40 leading-relaxed max-w-xl font-mono">
              Active configuration operators leading the global synchronized repository charts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 font-mono">
            {[
              { rank: "01", name: "godfrey", level: "99", exp: "14,250 XP", streak: "42 Days", status: "Online", badge: "👑 Architect" },
              { rank: "02", name: "prithiviiraj", level: "98", exp: "13,800 XP", streak: "38 Days", status: "Online", badge: "⚡ Master" },
              { rank: "03", name: "harihar", level: "84", exp: "11,400 XP", streak: "21 Days", status: "Offline", badge: "🛡️ Professional" },
              { rank: "04", name: "alex_v", level: "72", exp: "9,200 XP", streak: "12 Days", status: "Online", badge: "🍃 Advanced" },
            ].map((usr, uidx) => (
              <div 
                key={uidx}
                className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-slate-950/45 border border-emerald-950/80 rounded-2xl hover:border-emerald-500/30 transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold text-base">{usr.rank}</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-white border border-emerald-500/20 text-[10px]">
                    {usr.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-white font-bold block text-[11px]">{usr.name}</span>
                    <span className="text-[7.5px] text-emerald-500 font-black uppercase tracking-wider">{usr.badge}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 text-[9px] sm:text-[10px]">
                  <div>
                    <span className="text-emerald-100/30 block uppercase text-[7px] font-black">Level Rank</span>
                    <span className="text-white font-bold">Lvl {usr.level}</span>
                  </div>
                  <div>
                    <span className="text-emerald-100/30 block uppercase text-[7px] font-black">Exp Gain</span>
                    <span className="text-emerald-400 font-bold">{usr.exp}</span>
                  </div>
                  <div>
                    <span className="text-emerald-100/30 block uppercase text-[7px] font-black">Daily Streak</span>
                    <span className="text-amber-500 font-bold">🔥 {usr.streak}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-100/30 block uppercase text-[7px] font-black">Active Status</span>
                    <span className={`font-bold ${usr.status === 'Online' ? 'text-emerald-400 animate-pulse' : 'text-emerald-800'}`}>
                      ● {usr.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📈 SECTION C: LEVEL UP REWARDS ROADMAP */}
        <div className="border border-emerald-950/80 rounded-[3rem] bg-black/45 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full w-fit mx-auto md:mx-0 font-black">
              Progression Path
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-mono">
              LEVEL PROGRESSION ROADMAP
            </h3>
            <p className="text-[11px] text-emerald-100/40 leading-relaxed max-w-xl font-mono">
              Unlock unique system permissions and visual assets as your XP level scales upward.
            </p>
          </div>

          <div className="relative border-l-2 border-emerald-950/80 pl-6 ml-4 space-y-8 font-mono text-[10px] text-emerald-100/50">
            <div className="relative">
              <span className="absolute -left-9 top-0.5 w-5 h-5 rounded-full bg-emerald-500 border border-emerald-200 flex items-center justify-center text-[8px] font-black text-emerald-950 animate-pulse">L1</span>
              <h4 className="text-white font-bold uppercase text-xs font-black">Beginner Rank (0+ XP)</h4>
              <p className="text-[9px] text-emerald-100/30 mt-1 max-w-md leading-relaxed">
                Basic configurations forms and live pipeline console tracker diagnostics parameters unlocked. Allows simple staging changes.
              </p>
            </div>
            
            <div className="relative">
              <span className="absolute -left-9 top-0.5 w-5 h-5 rounded-full bg-emerald-600 border border-emerald-500/40 flex items-center justify-center text-[8px] font-bold text-emerald-950 font-black">L2</span>
              <h4 className="text-white font-bold uppercase text-xs font-black">Intermediate Rank (200+ XP)</h4>
              <p className="text-[9px] text-emerald-100/30 mt-1 max-w-md leading-relaxed">
                Unlocks priority scopes override highlight and advanced email directory overrides configuration validation.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-9 top-0.5 w-5 h-5 rounded-full bg-emerald-700 border border-emerald-500/30 flex items-center justify-center text-[8px] font-bold text-emerald-950 font-black">L3</span>
              <h4 className="text-white font-bold uppercase text-xs font-black">Advanced Rank (400+ XP)</h4>
              <p className="text-[9px] text-emerald-100/30 mt-1 max-w-md leading-relaxed">
                Unlocks local commit HASH visual tags inside the visual git graph engine to trace local pipeline histories.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-9 top-0.5 w-5 h-5 rounded-full bg-amber-600 border border-amber-500/40 flex items-center justify-center text-[8px] font-bold text-emerald-950 font-black">L4</span>
              <h4 className="text-white font-bold uppercase text-xs font-black">Professional Rank (600+ XP)</h4>
              <p className="text-[9px] text-emerald-100/30 mt-1 max-w-md leading-relaxed">
                Enables remote upstream canonical sync streams inside the pipeline hub and visualizes cloud remote commit nodes.
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-9 top-0.5 w-5 h-5 rounded-full bg-red-600 border border-red-500/40 flex items-center justify-center text-[8px] font-bold text-emerald-950 font-black">L5</span>
              <h4 className="text-white font-bold uppercase text-xs font-black">Repository Master Rank (800+ XP)</h4>
              <p className="text-[9px] text-emerald-100/30 mt-1 max-w-md text-emerald-400 leading-relaxed font-bold">
                Grants total access to the time-sensitive Conflict Reactor simulator to patch override conflicts, and unlocks bypass triggers.
              </p>
            </div>
          </div>
        </div>

        {/* ⚙️ SECTION D: DIAGNOSTICS & SYSTEM METRICS ENGINE */}
        <div className="border border-emerald-950/80 rounded-[3rem] bg-black/45 p-8 sm:p-12 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest block bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full w-fit mx-auto md:mx-0 font-black">
              System Telemetry
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug font-mono">
              SYSTEM ENGINE DIAGNOSTICS
            </h3>
            <p className="text-[11px] text-emerald-100/40 leading-relaxed max-w-xl font-mono">
              Real-time hardware status metrics, audio synthesis levels, and state mapping logs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono">
            <div className="p-4 bg-slate-950/45 border border-emerald-950/80 rounded-2xl space-y-2">
              <span className="text-[7.5px] text-emerald-100/30 uppercase block">Simulation CPU Engine</span>
              <span className="text-white text-base font-bold">99.8% OK</span>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[99.8%]"></div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/45 border border-emerald-950/80 rounded-2xl space-y-2">
              <span className="text-[7.5px] text-emerald-100/30 uppercase block">Registry Memory Profile</span>
              <span className="text-emerald-400 text-base font-bold">0.00% Leaks</span>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[100%]"></div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/45 border border-emerald-950/80 rounded-2xl space-y-2">
              <span className="text-[7.5px] text-emerald-100/30 uppercase block">Synth Frequency Oscillator</span>
              <span className="text-amber-500 text-base font-bold">Dual VCO Active</span>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[100%] animate-pulse"></div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/45 border border-emerald-950/80 rounded-2xl space-y-2">
              <span className="text-[7.5px] text-emerald-100/30 uppercase block">SSL Cryptography Link</span>
              <span className="text-cyan-400 text-base font-bold">TLS 1.3 Active</span>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full w-[100%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Developed Team */}
        <div className="space-y-4 pt-10 text-center relative z-10">
          <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-[0.25em] block">Developed by Platform Architects</span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 font-mono text-[10px] text-emerald-100/30 tracking-widest font-black uppercase">
            <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> godfrey
            </span>
            <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> prithiviiraj
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};
export default LandingPage;
