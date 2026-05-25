import React, { useState, useEffect, useRef } from 'react';

type GitCommandType = 'init' | 'add' | 'commit' | 'push' | 'status' | 'branch' | 'merge' | 'log' | 'unknown' | 'idle';

const COMMAND_CATEGORIES = [
  {
    category: '1. Getting Started',
    color: 'text-blue-400',
    border: 'border-blue-900/40',
    bg: 'bg-blue-950/10',
    hover: 'hover:border-blue-500/50 hover:bg-blue-950/30',
    commands: [
      { cmd: 'git init', desc: 'Initialize an empty Git repository tracking system' },
      { cmd: 'git clone <url>', desc: 'Clone and replicate an existing canopy repository' }
    ]
  },
  {
    category: '2. Day-To-Day Work',
    color: 'text-amber-400',
    border: 'border-amber-900/40',
    bg: 'bg-amber-950/10',
    hover: 'hover:border-amber-500/50 hover:bg-amber-950/30',
    commands: [
      { cmd: 'git status', desc: 'Diagnose the status of the working directory ecosystem' },
      { cmd: 'git add .', desc: 'Stage all modified files into the tracking index' },
      { cmd: 'git commit -m "msg"', desc: 'Commit staged files permanently into an immutable hash' }
    ]
  },
  {
    category: '3. Branching',
    color: 'text-purple-400',
    border: 'border-purple-900/40',
    bg: 'bg-purple-950/10',
    hover: 'hover:border-purple-500/50 hover:bg-purple-950/30',
    commands: [
      { cmd: 'git branch', desc: 'List all active biological mutation branches' },
      { cmd: 'git checkout -b <name>', desc: 'Create and seamlessly switch to a new branch' },
      { cmd: 'git switch <name>', desc: 'Switch to a specific active branch' }
    ]
  },
  {
    category: '4. Merging & Rebasing',
    color: 'text-fuchsia-400',
    border: 'border-fuchsia-900/40',
    bg: 'bg-fuchsia-950/10',
    hover: 'hover:border-fuchsia-500/50 hover:bg-fuchsia-950/30',
    commands: [
      { cmd: 'git merge <branch>', desc: 'Graft and merge a target branch into the current stem' },
      { cmd: 'git rebase <branch>', desc: 'Reapply commits linearly on top of another base tip' }
    ]
  },
  {
    category: '5. Inspection',
    color: 'text-pink-400',
    border: 'border-pink-900/40',
    bg: 'bg-pink-950/10',
    hover: 'hover:border-pink-500/50 hover:bg-pink-950/30',
    commands: [
      { cmd: 'git log', desc: 'View the chronological commit strata history' },
      { cmd: 'git diff', desc: 'Show raw structural differences in unstaged files' },
      { cmd: 'git show <commit>', desc: 'Inspect changes made within a specific commit hash' }
    ]
  },
  {
    category: '6. Remote Sync',
    color: 'text-cyan-400',
    border: 'border-cyan-900/40',
    bg: 'bg-cyan-950/10',
    hover: 'hover:border-cyan-500/50 hover:bg-cyan-950/30',
    commands: [
      { cmd: 'git push', desc: 'Upload local commit payloads to the remote canopy cloud' },
      { cmd: 'git pull', desc: 'Download and seamlessly merge remote cloud changes' },
      { cmd: 'git fetch', desc: 'Download objects and refs from another repository' }
    ]
  },
  {
    category: '7. Undoing Changes',
    color: 'text-red-400',
    border: 'border-red-900/40',
    bg: 'bg-red-950/10',
    hover: 'hover:border-red-500/50 hover:bg-red-950/30',
    commands: [
      { cmd: 'git revert <commit>', desc: 'Revert existing commits safely by creating a new commit' },
      { cmd: 'git reset --hard', desc: 'Force wipe local changes back to the last commit' },
      { cmd: 'git restore <file>', desc: 'Restore working tree files to their unmodified state' }
    ]
  },
  {
    category: '8. Stashing',
    color: 'text-orange-400',
    border: 'border-orange-900/40',
    bg: 'bg-orange-950/10',
    hover: 'hover:border-orange-500/50 hover:bg-orange-950/30',
    commands: [
      { cmd: 'git stash', desc: 'Temporarily shelter modified, tracked files into a stash' },
      { cmd: 'git stash pop', desc: 'Restore the most recently stashed files into working index' },
      { cmd: 'git stash list', desc: 'List all currently active stashed ecosystems' }
    ]
  },
  {
    category: '9. Tagging',
    color: 'text-teal-400',
    border: 'border-teal-900/40',
    bg: 'bg-teal-950/10',
    hover: 'hover:border-teal-500/50 hover:bg-teal-950/30',
    commands: [
      { cmd: 'git tag', desc: 'List all historical release tags' },
      { cmd: 'git tag -a v1.0 -m "msg"', desc: 'Create an annotated, permanent tag snapshot' },
      { cmd: 'git push --tags', desc: 'Push all local tags up to the remote cloud server' }
    ]
  },
  {
    category: '10. Configuration',
    color: 'text-indigo-400',
    border: 'border-indigo-900/40',
    bg: 'bg-indigo-950/10',
    hover: 'hover:border-indigo-500/50 hover:bg-indigo-950/30',
    commands: [
      { cmd: 'git config --global user.name "Name"', desc: 'Set your global biological identifier' },
      { cmd: 'git config --list', desc: 'List all currently active configuration variables' },
      { cmd: 'git config --global --unset <key>', desc: 'Remove a previously declared configuration key' }
    ]
  }
];

export const GlossaryView: React.FC = () => {
  const [cmdInput, setCmdInput] = useState('');
  const [activeCmd, setActiveCmd] = useState<GitCommandType>('idle');
  const [selectedCategory, setSelectedCategory] = useState<string>(COMMAND_CATEGORIES[0].category);
  const [logs, setLogs] = useState<string[]>([
    'Ecosystem Command Hub initialized.', 
    'Type a Git command to visualize its biological equivalent in the hologram.',
    'Supported directives: init, add, commit, push, status, branch, merge, log'
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    const cmd = cmdInput.trim().toLowerCase();
    setLogs(prev => [...prev, `$ ${cmdInput}`]);
    setCmdInput('');
    setIsAnimating(true);

    if (cmd.startsWith('git init')) {
      setActiveCmd('init');
      setLogs(prev => [...prev, '> Initializing empty Git repository in .git/', '> BIOME: Root filesystem tracking started.']);
    } else if (cmd.startsWith('git add')) {
      setActiveCmd('add');
      setLogs(prev => [...prev, '> Tracking files and moving to Staging Area...', '> BIOME: Nutrients absorbed into roots.']);
    } else if (cmd.startsWith('git commit')) {
      setActiveCmd('commit');
      setLogs(prev => [...prev, '> Creating immutable hash snapshot [e3a4b9c]', '> BIOME: Carbon crystallized into structural trunk node.']);
    } else if (cmd.startsWith('git push')) {
      setActiveCmd('push');
      setLogs(prev => [...prev, '> Pushing refs to remote upstream origin', '> BIOME: Transmitting genetic data to Canopy Cloud.']);
    } else if (cmd.startsWith('git status')) {
      setActiveCmd('status');
      setLogs(prev => [...prev, '> On branch main. Working tree clean.', '> BIOME: Ecosystem health is optimal.']);
    } else if (cmd.startsWith('git branch')) {
      setActiveCmd('branch');
      setLogs(prev => [...prev, '> * main', '> BIOME: Primary growth stem identified.']);
    } else if (cmd.startsWith('git merge')) {
      setActiveCmd('merge');
      setLogs(prev => [...prev, '> Fast-forwarding main to feature branch', '> BIOME: Grafting parallel mutations back into main stem.']);
    } else if (cmd.startsWith('git log')) {
      setActiveCmd('log');
      setLogs(prev => [...prev, '> commit e3a4b9c (HEAD -> main)', '> BIOME: Reading historical strata layers.']);
    } else if (cmd === 'clear') {
      setLogs(['Terminal cleared.']);
      setActiveCmd('idle');
      setIsAnimating(false);
    } else {
      setActiveCmd('unknown');
      setLogs(prev => [...prev, `git: '${cmd}' is not a recognized ecosystem command.`]);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 2500);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Render animation based on activeCmd
  const renderAnimation = () => {
    switch (activeCmd) {
      case 'idle':
        return (
          <div className="flex flex-col items-center justify-center h-full text-emerald-500/30 font-mono animate-pulse">
            <span className="text-6xl mb-4 opacity-50">🌌</span>
            <span className="tracking-widest">AWAITING COMMAND SEQUENCE</span>
          </div>
        );
      case 'init':
        return (
          <div className="flex flex-col items-center justify-center h-full relative">
            <div className={`w-32 h-32 border-4 border-emerald-500 rounded-2xl flex items-center justify-center bg-emerald-950/40 relative ${isAnimating ? 'animate-ping' : ''}`}>
              <span className="text-5xl">📁</span>
              {isAnimating && (
                <div className="absolute inset-0 border-4 border-amber-400 rounded-2xl animate-spin shadow-[0_0_30px_rgba(245,158,11,0.6)]"></div>
              )}
            </div>
            <span className="mt-8 font-black text-amber-400 tracking-widest text-[10px] uppercase block bg-amber-950/50 px-4 py-1.5 rounded-full border border-amber-500/30">
              Repository Shield Initialized
            </span>
          </div>
        );
      case 'add':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex justify-between items-center w-full max-w-md px-10 relative mt-10">
              <div className="flex flex-col items-center z-10">
                <span className="text-[9px] text-emerald-500 mb-3 font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Working Dir</span>
                <div className={`text-6xl transition-all duration-1000 ${isAnimating ? 'translate-x-48 opacity-0 scale-50' : 'opacity-100 scale-100'}`}>📄</div>
              </div>
              
              <div className={`absolute top-1/2 left-1/4 right-1/4 h-1 border-t-2 border-dashed border-emerald-500/40 -translate-y-1/2 transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-20'}`}></div>

              <div className="flex flex-col items-center z-10">
                <span className="text-[9px] text-amber-500 mb-3 font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Staging Index</span>
                <div className={`text-6xl transition-all duration-1000 ${isAnimating ? 'opacity-100 scale-125' : 'opacity-20 scale-75'}`}>📦</div>
              </div>
            </div>
            <span className="mt-12 font-black text-emerald-400 tracking-widest text-[9px] uppercase">Files indexed into active staging area</span>
          </div>
        );
      case 'commit':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center gap-0">
              <div className="w-5 h-5 rounded-full bg-emerald-900 border-2 border-emerald-700"></div>
              <div className="w-16 h-1.5 bg-emerald-800"></div>
              <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-xs border-4 shadow-2xl transition-all duration-700 z-10 ${isAnimating ? 'bg-emerald-500 border-white text-white scale-125 shadow-[0_0_40px_rgba(16,185,129,0.8)]' : 'bg-emerald-950 border-emerald-500 text-emerald-300'}`}>
                {isAnimating ? <span className="text-xs">SAVE</span> : <span className="text-[10px]">e3a4b</span>}
              </div>
            </div>
            <span className="mt-10 font-black text-emerald-400 tracking-widest text-[9px] uppercase bg-emerald-950/30 px-4 py-2 rounded border border-emerald-500/20">
              Immutable Strata Layer Committed
            </span>
          </div>
        );
      case 'push':
        return (
          <div className="flex flex-col items-center justify-center h-full relative w-full">
            <div className={`text-7xl mb-16 transition-transform duration-1000 ${isAnimating ? 'scale-110 drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]' : ''}`}>☁️</div>
            <div className={`absolute bottom-8 text-5xl transition-all duration-[1.5s] ease-in-out ${isAnimating ? '-translate-y-36 opacity-0 scale-50' : 'translate-y-0 opacity-100'}`}>
              📦
            </div>
            
            <div className="absolute bottom-4 flex flex-col items-center">
              <div className="w-32 h-1 bg-emerald-800 rounded-full mb-2"></div>
              <span className="text-amber-400 text-[9px] font-black tracking-widest uppercase">Uplinking to Canopy Cloud Server...</span>
            </div>
          </div>
        );
      case 'merge':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-64 h-40 mt-8">
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-emerald-800 transform -translate-y-1/2 rounded-full"></div>
              
              {/* Feature branch arc */}
              <div className={`absolute top-0 left-12 w-32 h-20 border-t-[3px] border-r-[3px] border-amber-500 rounded-tr-[2rem] transition-all duration-1000 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-20'}`}></div>
              
              {/* Merge collision node */}
              <div className={`absolute top-1/2 right-16 w-8 h-8 rounded-full border-4 border-white transform -translate-y-1/2 transition-all duration-1000 z-10 ${isAnimating ? 'shadow-[0_0_40px_rgba(245,158,11,1)] scale-150 bg-amber-500' : 'bg-emerald-900'}`}></div>
            </div>
            <span className="mt-6 font-black text-amber-500 tracking-widest text-[9px] uppercase bg-amber-950/30 px-4 py-2 rounded-full border border-amber-500/20">
              Parallel Genomes Grafted Successfully
            </span>
          </div>
        );
      case 'status':
      case 'log':
      case 'branch':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className={`text-7xl transition-all duration-500 ${isAnimating ? 'animate-bounce drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'opacity-50'}`}>
              {activeCmd === 'status' ? '🩺' : activeCmd === 'log' ? '📜' : '🌿'}
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="h-2 w-48 bg-emerald-950 rounded-full overflow-hidden border border-emerald-900">
                <div className={`h-full bg-emerald-400 transition-all duration-1000 ${isAnimating ? 'w-full' : 'w-0'}`}></div>
              </div>
              <span className="text-[9px] font-black tracking-widest text-emerald-500 uppercase">
                {isAnimating ? 'SCANNING BIOME STRATA...' : 'ANALYSIS COMPLETE'}
              </span>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-red-500/60 font-mono">
            <span className="text-6xl mb-4">⚠️</span>
            <span className="text-[10px] tracking-widest font-black uppercase bg-red-950/30 px-4 py-1 rounded-lg border border-red-900/50">
              UNKNOWN BIOME DIRECTIVE
            </span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col animate-fadeIn text-[#ecfdf5] gap-12 xl:gap-0">
      
      {/* 🎛️ Holographic Hub -> Displayed 2nd on Mobile, 1st on Desktop */}
      <div className="flex flex-col h-[75vh] min-h-[600px] order-2 xl:order-1 xl:mb-12">
        <header className="mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              Interactive Portal
            </span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight font-mono uppercase">Ecosystem Command Hub</h2>
          <p className="text-emerald-100/50 text-xs max-w-2xl">
            Execute operational Git directives into the terminal below. Watch the biological mechanics visually assemble across the central holographic projection array.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        
        {/* Left: Holographic Viewer */}
        <div className="flex-1 bg-black/60 border-2 border-emerald-950/60 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col p-6">
          <div className="absolute top-6 left-8 flex items-center gap-2 z-10">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[8px] font-mono font-black text-amber-500 tracking-widest uppercase">Holographic Projection Array</span>
          </div>
          
          <div className="flex-1 bg-slate-950/80 rounded-[1.5rem] border-2 border-emerald-950/40 mt-6 relative overflow-hidden shadow-inner">
            {renderAnimation()}
            
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-60"></div>
          </div>
        </div>

        {/* Right: Terminal Console */}
        <div className="w-full lg:w-[480px] bg-[#090f0c] border-2 border-emerald-950/60 rounded-[2.5rem] p-6 flex flex-col relative shadow-2xl overflow-hidden font-mono">
          <div className="absolute top-0 left-0 w-full h-10 bg-emerald-950/40 flex items-center px-6 border-b border-emerald-950/60">
            <div className="flex gap-2 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
            </div>
            <span className="text-[8px] text-emerald-500/80 uppercase font-black tracking-widest">Bash // Biome Engine</span>
          </div>
          
          <div className="flex-1 mt-8 overflow-y-auto space-y-2 text-[10.5px] text-emerald-400 pr-2">
            {logs.map((log, idx) => (
              <div key={idx} className={`${log.startsWith('$') ? 'text-emerald-300 font-bold mt-4 mb-2' : log.startsWith('>') ? 'text-amber-200/90 ml-3 border-l border-amber-500/30 pl-2' : 'text-emerald-500/60'}`}>
                {log}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleExecute} className="mt-6 relative bg-black/60 rounded-xl overflow-hidden border border-emerald-950/80 shadow-inner group focus-within:border-emerald-500/50 transition-colors">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold text-sm select-none">$</span>
            <input 
              type="text" 
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="e.g. git commit -m 'init'"
              autoComplete="off"
              spellCheck="false"
              autoFocus
              className="w-full bg-transparent py-4 pl-10 pr-4 text-emerald-300 text-sm font-mono focus:outline-none transition-all placeholder:text-emerald-900"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-950 hover:bg-emerald-800 text-emerald-400 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all active:scale-95">
              Run
            </button>
          </form>
        </div>
      </div>
      </div>

      {/* 📜 NEW: Command Directives Database (Cheat Sheet) -> Displayed 1st on Mobile, 2nd on Desktop */}
      <div className="order-1 xl:order-2 bg-black/40 border border-emerald-950/60 rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-emerald-950/80 pb-6">
           <div className="space-y-2">
             <h3 className="text-xl font-black text-white font-mono uppercase tracking-widest flex items-center gap-3">
               <span className="text-amber-500 text-2xl">📜</span> Command Database
             </h3>
             <p className="text-[10px] text-emerald-500/60 font-mono tracking-widest uppercase">
               Select an operational phase to access related directives
             </p>
           </div>

           {/* Custom Dropdown Selector */}
           <div className="w-full md:w-64 relative group">
             <select 
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="w-full appearance-none bg-[#090f0c] border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-mono text-xs font-bold py-3.5 pl-4 pr-10 rounded-xl cursor-pointer focus:outline-none transition-colors shadow-lg"
             >
               {COMMAND_CATEGORIES.map(cat => (
                 <option key={cat.category} value={cat.category}>{cat.category}</option>
               ))}
             </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
               ▼
             </div>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {COMMAND_CATEGORIES.filter(g => g.category === selectedCategory).map(group => (
            <React.Fragment key={group.category}>
              {group.commands.map(c => (
                <button 
                  key={c.cmd}
                  onClick={() => {
                    const cleanCmd = c.cmd.includes('<') 
                      ? c.cmd.substring(0, c.cmd.indexOf('<')).trim() 
                      : c.cmd.includes('"') 
                        ? c.cmd 
                        : c.cmd;
                    setCmdInput(cleanCmd);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 font-mono cursor-pointer shadow-lg active:scale-95 flex flex-col justify-center min-h-[110px] ${group.border} ${group.bg} ${group.hover}`}
                >
                  <code className={`block text-[13px] font-black mb-3 ${group.color}`}>{c.cmd}</code>
                  <span className="block text-[11px] text-emerald-100/60 leading-relaxed">{c.desc}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GlossaryView;
