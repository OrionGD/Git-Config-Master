import React, { useState, useEffect } from 'react';
import { INITIAL_CONFIGS, MODULE_IDS } from './constants';
import { GIT_COMMANDS_DATABASE } from './gitCommands';

// Custom interfaces for SaaS seats and logs
interface TeamMember {
  email: string;
  role: 'Admin' | 'Developer' | 'Security';
  status: 'Active' | 'Pending';
  avatar: string;
}

interface KioskLog {
  id: string;
  time: string;
  msg: string;
  type: 'success' | 'info' | 'warn';
}

const GitArchitectureVisualizer: React.FC = () => {
  const [animationState, setAnimationState] = useState<'idle' | 'adding' | 'committing' | 'pushing'>('idle');
  const [workingFiles, setWorkingFiles] = useState<string[]>(['index.js', 'styles.css']);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [localCommits, setLocalCommits] = useState<{ hash: string; msg: string }[]>([]);
  const [remoteCommits, setRemoteCommits] = useState<{ hash: string; msg: string }[]>([]);
  const [visualLogs, setVisualLogs] = useState<string[]>([
    'SYSTEM ONLINE // Audit sequence initialized.',
    'Working Directory holds modified files. Run [git add] to catalog snapshots.'
  ]);

  const addLog = (msg: string) => {
    setVisualLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleGitAdd = () => {
    if (workingFiles.length === 0) {
      addLog('WARNING: No modified files found in Working Directory sandbox.');
      return;
    }
    setAnimationState('adding');
    addLog('Executing [git add .] -> Indexing files into binary index tree...');
    
    setTimeout(() => {
      setStagedFiles(prev => [...prev, ...workingFiles]);
      setWorkingFiles([]);
      setAnimationState('idle');
      addLog('SUCCESS: Files staging complete. Snapshot registered inside index.');
    }, 1800);
  };

  const handleGitCommit = () => {
    if (stagedFiles.length === 0) {
      addLog('WARNING: Staging Area is empty. Staging must be populated via [git add] first.');
      return;
    }
    setAnimationState('committing');
    addLog('Executing [git commit -m "feat: core"] -> Compiling trees and writing objects...');

    setTimeout(() => {
      const newHash = Math.random().toString(16).substring(2, 7).toUpperCase();
      const newCommit = { hash: newHash, msg: 'feat: core auth' };
      setLocalCommits(prev => [...prev, newCommit]);
      setStagedFiles([]);
      setAnimationState('idle');
      addLog(`SUCCESS: Commit created. HASH: [${newHash}] -> DAG tree updated.`);
    }, 1800);
  };

  const handleGitPush = () => {
    if (localCommits.length === 0) {
      addLog('WARNING: Local Repository holds 0 commits. Commit changes locally first.');
      return;
    }
    setAnimationState('pushing');
    addLog('Executing [git push origin main] -> Authenticating SSH and transferring packfiles...');

    setTimeout(() => {
      setRemoteCommits(prev => [...prev, ...localCommits]);
      setLocalCommits([]);
      setAnimationState('idle');
      addLog('SUCCESS: Remote synchronized. Upstream origins and branches updated successfully.');
    }, 1800);
  };

  const handleReset = () => {
    setWorkingFiles(['index.js', 'styles.css']);
    setStagedFiles([]);
    setLocalCommits([]);
    setRemoteCommits([]);
    setAnimationState('idle');
    setVisualLogs([
      'PIPELINE RESET // Environment returned to default sandbox state.',
      'Working Directory holds modified files. Run [git add] to catalog snapshots.'
    ]);
  };

  return (
    <div className="space-y-6 bg-[#0c0d1e]/60 border border-[#1e1f48] rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden">
      <style>{`
        @keyframes dashflow {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-dashflow {
          stroke-dasharray: 8, 4;
          animation: dashflow 1.2s linear infinite;
        }
        @keyframes dotflow {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .neon-dot {
          animation: dotflow 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1e1f48]/60 pb-6">
        <div>
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="text-emerald-500 animate-pulse">🧬</span> How Git Works: Live Architecture Pipeline
          </h3>
          <p className="text-xs text-emerald-100/50 mt-1 max-w-xl">
            Interact with the visual circuit below. Trigger commands to see code snapshots serialize, commit locally, and synchronize upstream.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleGitAdd}
            disabled={animationState !== 'idle'}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            git add .
          </button>
          <button 
            onClick={handleGitCommit}
            disabled={animationState !== 'idle'}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            git commit
          </button>
          <button 
            onClick={handleGitPush}
            disabled={animationState !== 'idle'}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            git push
          </button>
          <button 
            onClick={handleReset}
            disabled={animationState !== 'idle'}
            className="px-3 py-2 bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Pipeline Circuit */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative py-4">
        {/* Stage 1: Working Directory */}
        <div className="flex flex-col justify-between p-6 bg-slate-950/40 border border-[#1e1f48] rounded-2xl relative space-y-4">
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Stage 01 // Local Disk</span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Working Directory</h4>
            <p className="text-[10px] text-emerald-100/30 leading-relaxed mt-1">Your local sandbox workspace folder on disk where files are modified.</p>
          </div>
          <div className="bg-[#05060f] p-3 rounded-xl border border-slate-900 min-h-[80px] space-y-2">
            <span className="text-[8px] font-mono text-emerald-700 tracking-widest block uppercase font-bold border-b border-slate-900 pb-1">Modified Sandbox Files</span>
            {workingFiles.map(f => (
              <div key={f} className="flex items-center justify-between text-[9px] font-mono text-yellow-500">
                <span>📁 {f}</span>
                <span className="px-1 bg-yellow-500/10 rounded uppercase text-[7px] font-bold">modified</span>
              </div>
            ))}
            {workingFiles.length === 0 && (
              <span className="text-[9px] font-mono text-emerald-800 italic block pt-4 text-center">Clean Workspace</span>
            )}
          </div>
        </div>

        {/* Stage 2: Staging Area */}
        <div className="flex flex-col justify-between p-6 bg-slate-950/40 border border-[#1e1f48] rounded-2xl relative space-y-4">
          {/* Animated Connecting neon conduit line from 1 to 2 */}
          <div className="hidden md:block absolute -left-8 top-1/2 w-8 h-[2px] bg-[#1e1f48] overflow-hidden">
            {animationState === 'adding' && (
              <div className="absolute top-0 bottom-0 w-2.5 bg-emerald-500 neon-dot rounded-full"></div>
            )}
          </div>
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Stage 02 // Index Area</span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Staging Area</h4>
            <p className="text-[10px] text-emerald-100/30 leading-relaxed mt-1">A lightweight binary index snapshot that prepares changes for commits.</p>
          </div>
          <div className="bg-[#05060f] p-3 rounded-xl border border-slate-900 min-h-[80px] space-y-2">
            <span className="text-[8px] font-mono text-emerald-700 tracking-widest block uppercase font-bold border-b border-slate-900 pb-1">Prepared Index Snapshots</span>
            {stagedFiles.map(f => (
              <div key={f} className="flex items-center justify-between text-[9px] font-mono text-emerald-400">
                <span>📁 {f}</span>
                <span className="px-1 bg-emerald-400/10 rounded uppercase text-[7px] font-bold">staged</span>
              </div>
            ))}
            {stagedFiles.length === 0 && (
              <span className="text-[9px] font-mono text-emerald-800 italic block pt-4 text-center">Index Empty</span>
            )}
          </div>
        </div>

        {/* Stage 3: Local Repository */}
        <div className="flex flex-col justify-between p-6 bg-slate-950/40 border border-[#1e1f48] rounded-2xl relative space-y-4">
          {/* Animated Connecting neon conduit line from 2 to 3 */}
          <div className="hidden md:block absolute -left-8 top-1/2 w-8 h-[2px] bg-[#1e1f48] overflow-hidden">
            {animationState === 'committing' && (
              <div className="absolute top-0 bottom-0 w-2.5 bg-emerald-500 neon-dot rounded-full"></div>
            )}
          </div>
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Stage 03 // Local History</span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Local Repository</h4>
            <p className="text-[10px] text-emerald-100/30 leading-relaxed mt-1">The secure immutable DAG storage directory (.git) holding commit hashes.</p>
          </div>
          <div className="bg-[#05060f] p-3 rounded-xl border border-slate-900 min-h-[80px] space-y-2">
            <span className="text-[8px] font-mono text-emerald-700 tracking-widest block uppercase font-bold border-b border-slate-900 pb-1">Commit DAG Tree</span>
            {localCommits.map(c => (
              <div key={c.hash} className="flex items-center justify-between text-[9px] font-mono text-blue-400">
                <span>📦 HASH: {c.hash}</span>
                <span className="px-1 bg-blue-400/10 rounded uppercase text-[7px] font-bold">committed</span>
              </div>
            ))}
            {localCommits.length === 0 && (
              <span className="text-[9px] font-mono text-emerald-800 italic block pt-4 text-center">0 Local Commits</span>
            )}
          </div>
        </div>

        {/* Stage 4: Remote Repository */}
        <div className="flex flex-col justify-between p-6 bg-[#0a0b19]/80 border border-[#1e1f48] rounded-2xl relative space-y-4">
          {/* Animated Connecting neon conduit line from 3 to 4 */}
          <div className="hidden md:block absolute -left-8 top-1/2 w-8 h-[2px] bg-[#1e1f48] overflow-hidden">
            {animationState === 'pushing' && (
              <div className="absolute top-0 bottom-0 w-2.5 bg-emerald-500 neon-dot rounded-full"></div>
            )}
          </div>
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Stage 04 // Upstream Server</span>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Remote Repository</h4>
            <p className="text-[10px] text-emerald-100/30 leading-relaxed mt-1">Upstream master system host in the shared cloud (origin/main) for teams.</p>
          </div>
          <div className="bg-[#05060f] p-3 rounded-xl border border-slate-900 min-h-[80px] space-y-2">
            <span className="text-[8px] font-mono text-emerald-700 tracking-widest block uppercase font-bold border-b border-slate-900 pb-1">Cloud Sync Tree</span>
            {remoteCommits.map(c => (
              <div key={c.hash} className="flex items-center justify-between text-[9px] font-mono text-pink-400">
                <span>☁️ HASH: {c.hash}</span>
                <span className="px-1 bg-pink-400/10 rounded uppercase text-[7px] font-bold">synced</span>
              </div>
            ))}
            {remoteCommits.length === 0 && (
              <span className="text-[9px] font-mono text-emerald-800 italic block pt-4 text-center">Not Synced</span>
            )}
          </div>
        </div>
      </div>

      {/* Terminal audit logger console */}
      <div className="bg-[#05060f] border border-[#1e1f48] rounded-2xl p-4 font-mono text-[10px] text-emerald-400/80 space-y-1 shadow-inner relative overflow-hidden">
        <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-[#b7b8e1]/30 border-b border-[#1e1f48]/40 pb-2 mb-2">
          <span>Git Pipeline Logger Console</span>
          <span className="animate-pulse flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Monitoring</span>
        </div>
        {visualLogs.map((log, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold select-none">&gt;&gt;</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => (
  <main className="min-h-screen bg-[#0a0b19] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden transition-colors duration-500" role="main">
    {/* Ambient background visuals */}
    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-900/40 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
    </div>
    
    <div className="relative z-10 max-w-5xl w-full text-center space-y-12 animate-fadeIn">
      <header className="space-y-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-900/30 bg-emerald-950/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse"></span>
          Git Learning Hub Platform v4.0
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">
          GIT <span className="text-emerald-500 brand-glow">LEARNING HUB</span>
        </h1>
        <p className="text-emerald-100/40 text-xs sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          The industrial-grade simulation chamber for version tree diagnostics. Audit active environment namespaces, configure cascade priority parameters, and orchestrate advanced branch rebases.
        </p>
      </header>

      {/* Interactive terminal code visualizer */}
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-[#1e1f48] bg-[#0c0d1e]/80 backdrop-blur-md p-6 text-left font-mono text-xs text-emerald-400/80 shadow-2xl relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between border-b border-[#1e1f48]/60 pb-3 mb-4 text-[#b7b8e1]/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/25 border border-[#ef4444]/45"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/25 border border-[#eab308]/45"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/25 border border-[#22c55e]/45"></span>
          </div>
          <span className="text-[9px] uppercase tracking-widest font-black">git-kernel-terminal v4.0</span>
        </div>
        <div>
          <span className="text-emerald-500 font-bold">$</span> <span className="text-white font-bold">git config --global user.name</span> "Orion Engineer"
        </div>
        <div className="text-[#b7b8e1]/40 italic">
          # Config registers global namespace successfully.
        </div>
        <div>
          <span className="text-emerald-500 font-bold">$</span> <span className="text-white font-bold">git config --list --show-origin</span>
        </div>
        <div className="text-[#b7b8e1]/50 text-[10px] pl-4 space-y-1">
          <div>file:/etc/gitconfig      host.sysadmin=active</div>
          <div>file:~/.gitconfig      user.name=Orion Engineer</div>
          <div>file:.git/config        repo.priority=override</div>
        </div>
        <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-500/50">
          <span>[Registry State: Pre-Authenticated]</span>
          <span className="animate-pulse">● Ready</span>
        </div>
      </div>

      <nav className="flex flex-col sm:flex-row items-center justify-center gap-4" aria-label="Landing Navigation">
        <button 
          onClick={onEnter}
          aria-label="Enter the command hub dashboard"
          className="w-full sm:w-auto group relative px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-950/20"
        >
          Enter Academy Workspace
          <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/0 group-hover:border-emerald-400/50 transition-all scale-105 opacity-0 group-hover:opacity-100"></div>
        </button>
        
        <a 
          href="https://training.github.com/downloads/github-git-cheat-sheet.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-10 py-5 bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3"
        >
          SLA Manual
        </a>
      </nav>

      {/* Trust Badges */}
      <div className="space-y-4 pt-6">
        <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-[0.25em]">Loved by engineering teams at</span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 font-mono text-[10px] text-emerald-100/30 tracking-widest font-black uppercase">
          <span>Stripe</span>
          <span>Stellate</span>
          <span>Vercel</span>
          <span>linear</span>
          <span>supaBase</span>
        </div>
      </div>
    </div>
  </main>
);

const CertificateCard: React.FC<{ studentName: string }> = ({ studentName }) => (
  <div className="p-8 md:p-12 rounded-[2.5rem] border-2 border-dashed border-emerald-500/40 bg-gradient-to-br from-[#0c0d1e] to-[#0a0b19] shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6 animate-fadeIn w-full">
    {/* holographic background light */}
    <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]"></div>
    
    <span className="text-6xl animate-bounce">🏆</span>
    
    <header className="space-y-2">
      <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] brand-glow">Professional Certification</h4>
      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">GIT MASTER INTEGRITY CREDENTIAL</h3>
    </header>

    <div className="h-px w-32 bg-emerald-500/30"></div>

    <p className="text-xs text-emerald-100/50 leading-relaxed max-w-md">
      This document certifies that <strong className="text-emerald-400 font-mono text-sm">{studentName || 'Orion Student'}</strong> has successfully completed the entire interactive version control curriculum, mastered the 3 prioritizations config files, and demonstrated full understanding of command logistics.
    </p>

    <div className="grid grid-cols-2 gap-8 pt-4 w-full max-w-sm border-t border-emerald-500/10">
      <div className="text-left space-y-1">
        <span className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest block">Authorized Signatory</span>
        <span className="font-mono text-xs text-emerald-500 italic block">/OrionGitLearningHub/</span>
      </div>
      <div className="text-right space-y-1">
        <span className="text-[8px] font-bold text-emerald-800 uppercase tracking-widest block">Credential Verification</span>
        <span className="font-mono text-[9px] text-emerald-500/70 block">SECURE_REF_HASH:74B51</span>
      </div>
    </div>

    <div className="px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[9px] text-emerald-400 font-mono tracking-widest uppercase">
      Verification Status: SEALED & SYNCED
    </div>
  </div>
);

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeModule, setActiveModule] = useState(MODULE_IDS.INTRO);
  const [configs, setConfigs] = useState<{ [key: string]: string }>(INITIAL_CONFIGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileStepperOpen, setMobileStepperOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // SaaS Tiers & Billing States


  // SaaS Workspace states
  const [activeWorkspace, setActiveWorkspace] = useState('Personal Workspace');
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  // SaaS Team seats
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { email: 'godfrey@orion-os.org', role: 'Admin', status: 'Active', avatar: 'GT' },
    { email: 'sarah.k@orion-os.org', role: 'Developer', status: 'Active', avatar: 'SK' },
    { email: 'alex.v@orion-os.org', role: 'Security', status: 'Active', avatar: 'AV' }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Developer' | 'Security'>('Developer');

  // Curriculum Pathways Progress
  const [masteredModules, setMasteredModules] = useState<{ [key: string]: boolean }>({});

  // Kiosk Registry States
  const [newRegistryKey, setNewRegistryKey] = useState('');
  const [newRegistryValue, setNewRegistryValue] = useState('');
  const [kioskLogs, setKioskLogs] = useState<KioskLog[]>([
    { id: '1', time: new Date().toLocaleTimeString(), msg: 'SAAS: Workspace session loaded.', type: 'info' },
    { id: '2', time: new Date().toLocaleTimeString(), msg: 'SECURITY: Geofence synchronization operational.', type: 'success' }
  ]);


  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeModule]);

  const modules = [
    { id: MODULE_IDS.INTRO, title: 'Dashboard & Roadmap', icon: '🚀', premium: false },
    { id: 'glossary', title: 'Git Glossary', icon: '📖', premium: false },
    { id: MODULE_IDS.SCOPES, title: 'Config Levels', icon: '📊', premium: false },
    { id: 'registry-editor', title: 'Registry Kiosk Console', icon: '⚙️', premium: false },
    { id: MODULE_IDS.ESSENTIALS, title: 'Workflow Essentials', icon: '🛠️', premium: false },
    { id: 'team-workspace', title: 'SaaS Workspace & Seats', icon: '👥', premium: true },
    { id: MODULE_IDS.READING, title: 'Reading Values', icon: '🔍', premium: false },
    { id: MODULE_IDS.WRITING, title: 'Writing & Updating', icon: '✍️', premium: false },
    { id: MODULE_IDS.REMOVING, title: 'Removing Config', icon: '🗑️', premium: false },
    { id: MODULE_IDS.CHEATSHEET, title: 'Full Command Hub', icon: '📜', premium: false },
    { id: MODULE_IDS.TROUBLESHOOTING, title: 'Diagnostics & Fixes', icon: '🩺', premium: true },
  ];

  const masteredCount = Object.values(masteredModules).filter(Boolean).length;
  const progressPercentage = Math.round((masteredCount / modules.length) * 100);
  const isCurriculumFinished = masteredCount === modules.length;

  const triggerCopy = (cmdText: string) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedCmd(cmdText);
    setTimeout(() => {
      setCopiedCmd(null);
    }, 1500);
  };

  const addKioskLog = (msg: string, type: 'success' | 'info' | 'warn') => {
    setKioskLogs(prev => [
      { id: Math.random().toString(), time: new Date().toLocaleTimeString(), msg, type },
      ...prev
    ].slice(0, 15));
  };

  // Expand categories when search query is entered
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const allCategoryNames = GIT_COMMANDS_DATABASE.map(c => c.name);
      setExpandedCategories(allCategoryNames);
    } else {
      setExpandedCategories([]);
    }
  }, [searchQuery]);

  const toggleCategory = (catName: string) => {
    setExpandedCategories(prev =>
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  const handleUpdateConfig = (key: string, val: string) => {
    if (!key.trim()) return;
    setConfigs(prev => ({ ...prev, [key]: val }));
    addKioskLog(`UPDATED registry variable "${key}" to "${val}"`, 'success');
  };

  const handleRemoveConfig = (key: string) => {
    setConfigs(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    addKioskLog(`UNSET registry variable "${key}"`, 'warn');
  };

  const handleAddSeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;
    


    const initials = newMemberEmail.substring(0, 2).toUpperCase();
    const newMember: TeamMember = {
      email: newMemberEmail.trim(),
      role: newMemberRole,
      status: 'Pending',
      avatar: initials
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    setNewMemberEmail('');
    addKioskLog(`INVITED new seat user: ${newMember.email}`, 'info');
  };

  // Filtering commands
  const filteredDatabase = GIT_COMMANDS_DATABASE.map(category => {
    const matchingCmds = category.commands.filter(cmd => 
      cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cmd.note && cmd.note.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...category, commands: matchingCmds };
  }).filter(category => category.commands.length > 0);

  const toggleMasteryState = () => {
    setMasteredModules(prev => ({
      ...prev,
      [activeModule]: !prev[activeModule]
    }));
  };
  
  const renderModuleContent = () => {
    switch (activeModule) {
      case MODULE_IDS.INTRO:
        return (
          <section className="space-y-8 animate-fadeIn" aria-labelledby="module-title">
            <h2 id="module-title" className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Enterprise learning path <span className="text-emerald-600 dark:text-emerald-500">&</span> Roadmap</h2>
            <p className="text-slate-600 dark:text-emerald-100/80 leading-relaxed text-xl font-medium">
              Git configuration acts as the structural nervous system of your version control tree. It registers your identity and establishes the system parameters for every repository you operate.
            </p>
            
            {/* Live Interactive Git Pipeline visualizer */}
            <GitArchitectureVisualizer />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#010108] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/20 shadow-sm">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Legacy Schema</span>
                <code className="block mt-4 text-sm text-emerald-700 dark:text-emerald-300 font-mono bg-emerald-50 dark:bg-black/40 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/10">git config [&lt;options&gt;]</code>
              </div>
              <div className="bg-white dark:bg-[#010108] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/20 shadow-sm">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Modern Standard</span>
                <code className="block mt-4 text-sm text-emerald-700 dark:text-emerald-200 font-mono bg-emerald-50 dark:bg-black/40 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/10">git config &lt;subcommand&gt;</code>
              </div>
            </div>

            {isCurriculumFinished ? (
              <div className="pt-6">
                <CertificateCard studentName={configs['user.name'] || 'Orion Student'} />
              </div>
            ) : null}

            <aside className="bg-slate-100 dark:bg-[#0c0d1e] p-8 rounded-3xl border border-slate-200 dark:border-[#1e1f48] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">💡</div>
              <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-[#ecfdf5] uppercase tracking-wider">Professional Summary</h3>
              <p className="text-slate-700 dark:text-[#b7b8e1] italic text-lg leading-relaxed">
                "Git configuration governs system and tool behaviors through prioritized files (Local, Global, System), primarily operated via the <code className="text-emerald-600 dark:text-[#9295d3] bg-slate-200 dark:bg-black/40 px-2 py-0.5 rounded font-mono font-bold">git config</code> subsystem."
              </p>
            </aside>


          </section>
        );

      case 'glossary':
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Core Lexicon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { term: 'Git', desc: 'The distributed local engine that tracks filesystem alterations.' },
                { term: 'GitHub', desc: 'The cloud collaboration layer and codebase hosting repository.' },
                { term: 'Commit', desc: 'An immutable SHA-1 hashed snapshot of your project state.' },
                { term: 'Branch', desc: 'A named pointer referencing a specific sequence of commits.' },
                { term: 'Clone', desc: 'A complete local duplication of a remote version controlled repository.' },
                { term: 'Remote', desc: 'The reference link to the primary repository hosted in the cloud (e.g. origin).' },
              ].map(g => (
                <div key={g.term} className="p-6 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/10 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-all cursor-default shadow-sm dark:shadow-none">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black block mb-2 text-sm uppercase tracking-widest">{g.term}</span>
                  <p className="text-slate-500 dark:text-emerald-100/40 leading-relaxed text-xs">{g.desc}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case MODULE_IDS.SCOPES:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Architectural Hierarchy</h2>
            <div className="flex items-center space-x-4 mb-4">
               <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-500 text-[10px] font-bold tracking-widest">PRIORITY ORDER</span>
               <div className="h-px flex-1 bg-slate-200 dark:bg-emerald-900/20"></div>
            </div>
            <div className="grid gap-6">
              {[
                { name: '--local', desc: 'Highest priority. Overrides all options. Specific to one project repository.', file: '.git/config', color: 'text-emerald-600 dark:text-emerald-400' },
                { name: '--global', desc: 'Middle priority. Applies user-wide. Governs your OS user profile settings.', file: '~/.gitconfig', color: 'text-emerald-600 dark:text-emerald-500' },
                { name: '--system', desc: 'Lowest priority. Machine-wide defaults. Governs all OS user accounts.', file: '/etc/gitconfig', color: 'text-emerald-800 dark:text-emerald-700' },
              ].map((s) => (
                <article key={s.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-3xl hover:border-emerald-500/30 transition-all group shadow-sm dark:shadow-none">
                  <div className="mb-4 sm:mb-0">
                    <code className={`font-black text-2xl ${s.color} transition-colors`}>{s.name}</code>
                    <p className="text-[10px] text-slate-400 dark:text-emerald-900 mt-2 font-mono uppercase tracking-[0.3em] font-bold">{s.file}</p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-emerald-100/50 font-medium max-w-xs sm:text-right">{s.desc}</p>
                </article>
              ))}
            </div>
          </section>
        );

      case 'registry-editor':
        return (
          <section className="space-y-8 animate-fadeIn">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Registry Kiosk Console</h2>
                <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-sm mt-1">Manage your variables visually inside our secure industrial-grade console.</p>
              </div>
              <div className="px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] uppercase tracking-widest rounded-xl self-start flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                GEOFENCE: operational
              </div>
            </header>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Presets and options */}
              <div className="p-8 bg-white dark:bg-[#080914] border-2 border-emerald-500/15 rounded-[2rem] space-y-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span> Core Registry Properties
                </h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'User Display Name (user.name)', key: 'user.name', type: 'text', placeholder: 'e.g. Orion Developer' },
                    { label: 'Primary Developer Email (user.email)', key: 'user.email', type: 'email', placeholder: 'e.g. developer@orion-os.org' },
                    { label: 'Default Branch Name (init.defaultBranch)', key: 'init.defaultBranch', type: 'text', placeholder: 'e.g. main' },
                    { label: 'Terminal Text Editor (core.editor)', key: 'core.editor', type: 'text', placeholder: 'e.g. code --wait, vim, nano' },
                  ].map(opt => (
                    <div key={opt.key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-emerald-500/50 uppercase tracking-wider block">{opt.label}</label>
                      <input
                        type={opt.type}
                        value={configs[opt.key] || ''}
                        onChange={(e) => handleUpdateConfig(opt.key, e.target.value)}
                        placeholder={opt.placeholder}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-xl text-xs font-mono text-emerald-800 dark:text-emerald-300 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom keys & green log console */}
              <div className="p-8 bg-white dark:bg-[#080914] border-2 border-emerald-500/15 rounded-[2rem] space-y-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                <div className="space-y-6">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span> Custom Variables
                  </h3>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="key (e.g. alias.st)"
                      value={newRegistryKey}
                      onChange={e => setNewRegistryKey(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-xl text-xs font-mono text-emerald-800 dark:text-emerald-300 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="value (e.g. status)"
                      value={newRegistryValue}
                      onChange={e => setNewRegistryValue(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-xl text-xs font-mono text-emerald-800 dark:text-emerald-300 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      onClick={() => {
                        if (newRegistryKey.trim() && newRegistryValue.trim()) {
                          handleUpdateConfig(newRegistryKey.trim(), newRegistryValue.trim());
                          setNewRegistryKey('');
                          setNewRegistryValue('');
                        }
                      }}
                      className="px-5 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-emerald-950 font-black rounded-xl text-[10px] uppercase tracking-wider active:scale-95 transition-all"
                    >
                      Add Key
                    </button>
                  </div>
                </div>

                {/* Cyber Kiosk Log Box */}
                <div className="mt-6 space-y-2 flex-1 flex flex-col">
                  <span className="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest">Kiosk Console Event Stream</span>
                  <div className="bg-[#04040b] p-4 rounded-2xl border border-emerald-900/50 font-mono text-[10px] text-emerald-400 min-h-[8rem] flex-1 space-y-1.5">
                    {kioskLogs.map(log => (
                      <div key={log.id} className="flex gap-2 leading-relaxed">
                        <span className="text-emerald-700 opacity-60">[{log.time}]</span>
                        <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-red-400' : 'text-emerald-600'}>
                          {log.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'team-workspace':
        return (
          <section className="space-y-8 animate-fadeIn">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight">SaaS Seats & Workspaces</h2>
                <p className="text-xs text-emerald-100/60 leading-relaxed mt-1">Manage active developer invitations, geofence authorizations, and seat quotas.</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                Workspace Quota: {teamMembers.length} seats active
              </span>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Invite seat form */}
              <div className="xl:col-span-1 p-8 bg-[#0c0d1e] border border-[#1e1f48] rounded-[2rem] space-y-6">
                <h3 className="text-base font-black text-white">Invite Team Developer</h3>
                <form onSubmit={handleAddSeat} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email"
                      value={newMemberEmail}
                      onChange={e => setNewMemberEmail(e.target.value)}
                      placeholder="e.g. engineer@orion-os.org"
                      className="w-full px-4 py-3 bg-black/40 border border-emerald-900/10 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-wider">Workspace Role</label>
                    <select
                      value={newMemberRole}
                      onChange={e => setNewMemberRole(e.target.value as any)}
                      className="w-full px-4 py-3 bg-black/40 border border-emerald-900/10 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Developer">Developer Seat</option>
                      <option value="Security">Security Auditor</option>
                      <option value="Admin">Administrator</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-emerald-950 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
                  >
                    Provision Seat License
                  </button>
                </form>
              </div>

              {/* Seats Grid */}
              <div className="xl:col-span-2 p-8 bg-[#0c0d1e] border border-[#1e1f48] rounded-[2rem] space-y-6 flex flex-col justify-between">
                <h3 className="text-base font-black text-white">Active Seats Registry</h3>
                <div className="divide-y divide-emerald-900/10 flex-1 pr-2">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white font-mono">{member.email}</p>
                          <span className="text-[9px] text-emerald-500/50 uppercase font-black">{member.role}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-wider ${
                          member.status === 'Active' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                        }`}>
                          {member.status}
                        </span>
                        {member.email !== 'godfrey@orion-os.org' && (
                          <button 
                            onClick={() => {
                              setTeamMembers(prev => prev.filter(m => m.email !== member.email));
                              addKioskLog(`REVOKED seat license for: ${member.email}`, 'warn');
                            }}
                            className="p-1.5 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.ESSENTIALS:
        return (
          <section className="space-y-10 animate-fadeIn">
            <header className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">The Core <span className="text-emerald-600 dark:text-emerald-500">Git Workflow</span></h2>
              <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed max-w-3xl">
                Mastering Git starts with understanding the standard cyclical sequence of checking, preparing, and publishing code. Remember: <strong>S → A → C → P</strong>.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              {[
                { step: '1. Status Checking', icon: '🔍', cmd: 'git status', desc: 'Inspects your directory tree for newly staged, altered, or completely untracked files.', color: 'emerald' },
                { step: '2. Staging Phase', icon: '📥', cmd: 'git add .', desc: 'Compiles and moves all chosen changes into the active logical Staging Area.', color: 'emerald' },
                { step: '3. Snapshot Hashing', icon: '💾', cmd: 'git commit -m "commit message"', desc: 'Generates a permanent, cryptographically indexable, locally signed snapshot of changes.', color: 'emerald' },
                { step: '4. Remote Sync', icon: '☁️', cmd: 'git push', desc: 'Safely transmits your newly recorded local commits up to the remote master server (GitHub).', color: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <span className="text-[10px] font-black text-slate-300 dark:text-emerald-800 uppercase tracking-widest">Phase 0{i+1}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{item.step}</h4>
                  <p className="text-xs text-slate-500 dark:text-emerald-100/40 leading-relaxed mb-6 h-10">{item.desc}</p>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900/20 rounded-xl">
                    <code className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                      {item.cmd}
                    </code>
                    <button 
                      onClick={() => triggerCopy(item.cmd)}
                      className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === item.cmd ? (
                        <svg className="w-4 h-4 text-emerald-500 animate-scaleIn" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 rounded-[3rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl font-black rotate-12">SACP</div>
               <h3 className="text-2xl font-black mb-4">Memory Pulse: S.A.C.P</h3>
               <p className="text-sm opacity-90 leading-relaxed max-w-xl">
                 If you ever feel lost in version control, follow the sequence: <strong>Status</strong> to inspect, <strong>Add</strong> to stage, <strong>Commit</strong> to sign, <strong>Push</strong> to synchronize.
               </p>
            </div>
          </section>
        );

      case MODULE_IDS.READING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">🔍 Reading Config Values</h2>
            <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-lg font-medium">Use these commands to debug your configuration scopes and review active parameters.</p>
            
            <div className="space-y-4">
              {[
                { cmd: 'git config --list', desc: 'Displays every compiled key-value pair from all active scopes (System, Global, and Local).' },
                { cmd: 'git config user.name', desc: 'Reads the specific active string defined for the chosen key.' },
                { cmd: 'git config --show-origin --list', desc: 'Diagnostic: shows the exact file path location where each specific config variable resides.' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none gap-4">
                  <div className="flex items-center justify-between md:justify-start gap-4 flex-1">
                    <code className="text-emerald-700 dark:text-emerald-400 font-mono text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-300 font-bold">{item.cmd}</code>
                    <button 
                      onClick={() => triggerCopy(item.cmd)}
                      className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === item.cmd ? (
                        <svg className="w-4 h-4 text-emerald-500 animate-scaleIn" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                      )}
                    </button>
                  </div>
                  <span className="text-slate-400 dark:text-emerald-100/30 text-xs italic max-w-sm md:text-right">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case MODULE_IDS.WRITING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">✍️ Writing & Updating</h2>
            <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-lg">Setting active identity keys and personalizing your developer preferences globally or locally.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-100 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 shadow-sm dark:shadow-none">
                <h4 className="text-emerald-700 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">Identity Setup</h4>
                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-2">
                    <p className="text-slate-400 dark:text-emerald-100/40"># Global scope setting (OS user wide)</p>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-black/40 rounded border border-slate-200 dark:border-transparent">
                      <code className="text-emerald-800 dark:text-emerald-200 font-bold block truncate">git config --global user.name "Your Name"</code>
                      <button onClick={() => triggerCopy('git config --global user.name "Your Name"')} className="text-slate-400 hover:text-emerald-500 ml-2">
                        {copiedCmd === 'git config --global user.name "Your Name"' ? '✓' : '⎘'}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 dark:text-emerald-100/40"># Local scope setting (Current folder only)</p>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-black/40 rounded border border-slate-200 dark:border-transparent">
                      <code className="text-emerald-800 dark:text-emerald-200 font-bold block truncate">git config --local user.email "work@co.com"</code>
                      <button onClick={() => triggerCopy('git config --local user.email "work@co.com"')} className="text-slate-400 hover:text-emerald-500 ml-2">
                        {copiedCmd === 'git config --local user.email "work@co.com"' ? '✓' : '⎘'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-100 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 shadow-sm dark:shadow-none">
                <h4 className="text-emerald-700 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">Core Preferences</h4>
                <div className="space-y-4 font-mono text-xs">
                  <div className="space-y-2">
                    <p className="text-slate-400 dark:text-emerald-100/40"># VS Code as default standard editor</p>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-black/40 rounded border border-slate-200 dark:border-transparent">
                      <code className="text-emerald-800 dark:text-emerald-200 font-bold block truncate">git config --global core.editor "code --wait"</code>
                      <button onClick={() => triggerCopy('git config --global core.editor "code --wait"')} className="text-slate-400 hover:text-emerald-500 ml-2">
                        {copiedCmd === 'git config --global core.editor "code --wait"' ? '✓' : '⎘'}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 dark:text-emerald-100/40"># Enforcing default primary branch name</p>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-black/40 rounded border border-slate-200 dark:border-transparent">
                      <code className="text-emerald-800 dark:text-emerald-200 font-bold block truncate">git config --global init.defaultBranch main</code>
                      <button onClick={() => triggerCopy('git config --global init.defaultBranch main')} className="text-slate-400 hover:text-emerald-500 ml-2">
                        {copiedCmd === 'git config --global init.defaultBranch main' ? '✓' : '⎘'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.REMOVING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">🗑️ Removing Config Keys</h2>
            <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-lg">Correcting registry errors or unsetting outdated variables from your configurations.</p>
            <div className="bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20 p-8 rounded-3xl space-y-6">
              <div className="flex items-center space-x-4">
                <span className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-500 text-lg">⚠️</span>
                <div>
                  <h4 className="text-red-700 dark:text-red-400 font-black text-[10px] uppercase tracking-widest">Scope Hazard Note</h4>
                  <p className="text-red-800/60 dark:text-red-100/40 text-xs">Always ensure you supply the exact scope option (--local/--global/--system) to target the correct setting file.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-black/40 rounded-xl border border-red-100 dark:border-red-900/10 flex justify-between items-center shadow-sm">
                  <div className="flex flex-col space-y-1">
                    <code className="text-red-600 dark:text-red-400 font-mono text-sm font-bold">git config --global --unset user.name</code>
                    <span className="text-red-800/40 dark:text-red-100/30 text-[9px] uppercase tracking-widest font-black">Removes username parameter from ~/.gitconfig</span>
                  </div>
                  <button onClick={() => triggerCopy('git config --global --unset user.name')} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors">
                    {copiedCmd === 'git config --global --unset user.name' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="p-4 bg-white dark:bg-black/40 rounded-xl border border-red-100 dark:border-red-900/10 flex justify-between items-center shadow-sm">
                  <div className="flex flex-col space-y-1">
                    <code className="text-red-600 dark:text-red-400 font-mono text-sm font-bold">git config --local --unset-all core.ignored</code>
                    <span className="text-red-800/40 dark:text-red-100/30 text-[9px] uppercase tracking-widest font-black">Removes multi-value variables in local scope</span>
                  </div>
                  <button onClick={() => triggerCopy('git config --local --unset-all core.ignored')} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors">
                    {copiedCmd === 'git config --local --unset-all core.ignored' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.TROUBLESHOOTING:


        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">🩺 Diagnostics & Troubleshooting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none flex flex-col justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">Issue: Commit Author logs under wrong profile</h4>
                  <p className="text-slate-500 dark:text-emerald-100/40 text-xs leading-relaxed mt-2">Typically triggered by a forgotten local config override inside your current repository, which supersedes your global parameters.</p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/10 mt-6">
                  <span className="text-emerald-600 dark:text-emerald-500 font-black text-[10px] uppercase tracking-widest block mb-2">Find active file source:</span>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900/20 rounded-xl">
                    <code className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-bold">git config --show-origin user.name</code>
                    <button onClick={() => triggerCopy('git config --show-origin user.name')} className="text-emerald-600 hover:text-emerald-400 font-mono text-[10px]">
                      {copiedCmd === 'git config --show-origin user.name' ? '✓' : 'copy'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none flex flex-col justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">Issue: Configuration edits not applying as expected</h4>
                  <p className="text-slate-500 dark:text-emerald-100/40 text-xs leading-relaxed mt-2">Precedence conflicts. The local file (highest precedence) ALWAYS overrides user global profiles, even if global was set more recently.</p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/10 mt-6 font-mono text-[10px] text-slate-400 dark:text-emerald-800">
                  <span className="text-emerald-600 dark:text-emerald-500 font-black text-[10px] uppercase tracking-widest block mb-2">Diagnostic Action:</span>
                  <p className="leading-relaxed">Inspect your repository's <code className="text-emerald-600 bg-emerald-100/30 px-1 py-0.5 rounded">.git/config</code> file directly to confirm overrides have not been established locally.</p>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.CHEATSHEET:
        return (
          <section className="space-y-10 animate-fadeIn h-auto">
            <header className="space-y-6">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Git Master Command Registry</h2>
              <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-sm">
                Fuzzy search across all 17 categories of standard Git commands. Review detailed scopes, notes, and visual branch diagrams.
              </p>

              {/* Search Engine Hub */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <div className="relative flex-1 w-full">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-emerald-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search commands, flags, keywords (e.g. 'rebase', 'stash', '--cached')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/20 rounded-2xl text-xs font-mono text-emerald-800 dark:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-500 text-xs uppercase tracking-wider font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => setExpandedCategories(GIT_COMMANDS_DATABASE.map(c => c.name))}
                    className="flex-1 sm:flex-none px-4 py-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Expand All
                  </button>
                  <button 
                    onClick={() => setExpandedCategories([])}
                    className="flex-1 sm:flex-none px-4 py-4 bg-slate-100 dark:bg-black/20 text-slate-400 hover:text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </header>

            {/* Accordion Database render */}
            <div className="space-y-6 pb-20">
              {filteredDatabase.map((category, catIdx) => {
                const isExpanded = expandedCategories.includes(category.name);


                return (
                  <article 
                    key={catIdx} 
                    className="bg-white dark:bg-black/20 border border-slate-200 dark:border-emerald-900/10 rounded-3xl overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 relative"
                  >
                    {/* Category Header */}
                    <button 
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center justify-between px-8 py-6 hover:bg-emerald-50/10 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{category.name}</h3>

                          </div>
                          <p className="text-[10px] text-slate-400 dark:text-emerald-900/60 uppercase tracking-widest font-black mt-1">
                            {category.commands.length} {category.commands.length === 1 ? 'Command' : 'Commands'} Available
                          </p>
                        </div>
                      </div>
                      <span className={`text-slate-400 dark:text-emerald-700 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </button>

                    {/* Accordion Body */}
                    {isExpanded && (
                      <div className="relative">
                        <div className="px-8 pb-8 pt-2 border-t border-slate-100 dark:border-emerald-900/5 divide-y divide-slate-100 dark:divide-emerald-900/5">
                            {category.commands.map((cmdItem, cmdIdx) => (
                              <div key={cmdIdx} className="py-6 first:pt-4 last:pb-0 space-y-4 group">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                  <div className="space-y-1">
                                    <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{cmdItem.desc}</h4>
                                    {cmdItem.note && (
                                      <p className="text-xs text-slate-500 dark:text-emerald-100/50 leading-relaxed max-w-3xl mt-1">{cmdItem.note}</p>
                                    )}
                                  </div>
                                  
                                  <button 
                                    onClick={() => triggerCopy(cmdItem.cmd)}
                                    className="self-start px-3 py-2 bg-slate-50 dark:bg-emerald-950/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/60 text-slate-500 dark:text-emerald-400 border border-slate-200 dark:border-emerald-900/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                                  >
                                    {copiedCmd === cmdItem.cmd ? (
                                      <>
                                        <svg className="w-3.5 h-3.5 text-emerald-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                        <span>Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                {/* Glow Code Block */}
                                <div className="relative">
                                  <pre className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-emerald-900/10 rounded-2xl overflow-x-auto custom-scrollbar">
                                    <code className="text-xs font-mono text-emerald-800 dark:text-emerald-300 font-bold block whitespace-pre-wrap">{cmdItem.cmd}</code>
                                  </pre>
                                </div>

                                {/* High-Fidelity Monospaced Branch Diagrams */}
                                {cmdItem.diagramBefore && cmdItem.diagramAfter && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-slate-100/50 dark:bg-black/20 p-5 rounded-2xl border border-slate-200/50 dark:border-emerald-900/5">
                                    <div className="space-y-2">
                                      <span className="text-[9px] font-black text-slate-400 dark:text-emerald-950/60 uppercase tracking-widest">Git Tree: BEFORE Operation</span>
                                      <pre className="p-3 bg-white dark:bg-black/60 rounded-xl border border-slate-200 dark:border-emerald-950/40 text-[10px] font-mono text-slate-600 dark:text-emerald-500 overflow-x-auto">
                                        <code>{cmdItem.diagramBefore}</code>
                                      </pre>
                                    </div>
                                    <div className="space-y-2">
                                      <span className="text-[9px] font-black text-emerald-500/70 dark:text-emerald-700 uppercase tracking-widest">Git Tree: AFTER Operation</span>
                                      <pre className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-xl border border-emerald-100 dark:border-emerald-950 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 overflow-x-auto">
                                        <code>{cmdItem.diagramAfter}</code>
                                      </pre>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                      </div>
                    )}
                  </article>
                );
              })}

              {filteredDatabase.length === 0 && (
                <div className="text-center py-16 bg-slate-100 dark:bg-black/20 border border-dashed border-slate-200 dark:border-emerald-900/10 rounded-3xl">
                  <span className="text-4xl block mb-4">🔍</span>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-emerald-500">No matching commands located</h4>
                  <p className="text-xs text-slate-400 mt-2">Adjust your query filters to trace another Git command.</p>
                </div>
              )}
            </div>
          </section>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="text-8xl mb-8 opacity-10 animate-pulse text-emerald-900">⚙️</div>
             <p className="text-emerald-800 dark:text-emerald-800 uppercase tracking-[0.5em] text-[10px] font-black">Initialization Sequence Active...</p>
             <button 
                onClick={() => setActiveModule(MODULE_IDS.INTRO)}
                className="mt-8 px-6 py-3 bg-emerald-600/10 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-600/20 transition-all"
             >
               Return to Introduction
             </button>
          </div>
        );
    }
  };

  if (!showDashboard) {
    return <LandingPage onEnter={() => setShowDashboard(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0b19] text-[#edf8f3] overflow-x-hidden transition-colors duration-500">
      {/* SaaS Top Navigation Header - Widescreen format */}
      <header className="p-6 border-b border-[#1e1f48] flex items-center justify-between bg-[#0a0b19]/90 backdrop-blur-lg sticky top-0 z-40 transition-colors">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-black text-white tracking-tighter flex items-center group cursor-default">
            <span 
              onClick={() => setShowDashboard(false)}
              className="bg-emerald-500 w-8 h-8 flex items-center justify-center rounded-lg mr-3 text-emerald-950 hover:scale-110 transition-transform cursor-pointer font-mono font-bold"
            >
              G
            </span>
            <span className="group-hover:text-emerald-400 transition-colors font-mono tracking-wider">GIT LEARNING HUB</span>
          </h1>

          {/* SaaS Workspace Dropdown Selector */}
          <div className="relative">
            <button 
              onClick={() => setWorkspaceOpen(!workspaceOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-emerald-950/30 border border-[#1e1f48] rounded-xl hover:border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold transition-all"
            >
              💼 {activeWorkspace}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {workspaceOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-[#0c0d1e] border border-[#1e1f48] rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-[#1e1f48]/40">
                {['Personal Workspace', 'Orion Eng Team', 'Security Audit Space'].map(ws => (
                  <button 
                    key={ws}
                    onClick={() => {
                      setActiveWorkspace(ws);
                      setWorkspaceOpen(false);
                      addKioskLog(`SWITCHED workspace context to: ${ws}`, 'info');
                    }}
                    className="w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-wider text-emerald-100/60 hover:bg-[#101129] hover:text-emerald-400 transition-colors"
                  >
                    {ws}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-black rounded-xl">
            PLATINUM WORKSPACE ACTIVE
          </div>
          
        </div>
      </header>

      {/* Horizontal Stepper - Replaces traditional Sidebar with mobile dropdown */}
      <nav className="border-b border-[#1e1f48] bg-[#0a0b19]/80 backdrop-blur-md sticky top-[73px] z-30 py-4 px-6 sm:px-12">
        {/* Mobile Stepper Radial Compass selector */}
        <div className="sm:hidden flex flex-col items-center py-6 relative">
          <button
            onClick={() => setMobileStepperOpen(!mobileStepperOpen)}
            className={`relative z-50 w-12 h-12 rounded-full border flex items-center justify-center text-base shadow-xl transition-all bg-[#0a0b19] ${
              mobileStepperOpen ? 'border-emerald-400 bg-emerald-950/30 rotate-180 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-[#1e1f48] bg-[#0c0d1e] text-emerald-400 hover:border-emerald-500/30'
            }`}
            title="Toggle Git Navigation Dial"
          >
            🧭
          </button>
          
          <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest mt-2.5 z-50">
            Active: {modules.find(m => m.id === activeModule)?.title}
          </span>

          {mobileStepperOpen && (
            <div className="absolute z-40 w-52 h-52 flex items-center justify-center animate-fadeIn pointer-events-none">
              {modules.map((m, idx) => {
                const angle = (idx * (2 * Math.PI)) / modules.length - Math.PI / 2; // Starts at 12 o'clock
                const r = 70; // Radius in pixels
                const x = r * Math.cos(angle);
                const y = r * Math.sin(angle);
                const isActive = activeModule === m.id;
                
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveModule(m.id);
                      setMobileStepperOpen(false);
                    }}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className={`absolute p-2 rounded-full border text-xs shadow-lg pointer-events-auto transition-all hover:scale-110 ${
                      isActive 
                        ? 'border-emerald-400 bg-emerald-950/60 text-emerald-400 scale-110 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                        : 'border-[#1e1f48] bg-[#0c0d1e]/90 text-emerald-100/60 hover:text-emerald-400'
                    }`}
                    title={m.title}
                  >
                    {m.icon}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop flex-wrap stepper */}
        <div className="hidden sm:flex flex-wrap items-center gap-3">
          {modules.map((m) => {
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(74,78,181,0.25)]'
                    : 'bg-transparent text-emerald-100/50 border-transparent hover:border-[#1e1f48] hover:text-emerald-400'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.title}</span>
                {masteredModules[m.id] && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Widescreen Card-less Layout */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 sm:p-12 grid grid-cols-1 xl:grid-cols-4 gap-12 items-start" role="main">
        {/* Left Spanning Stream (spans 3 columns) */}
        <div className="xl:col-span-3 space-y-12">
          {/* Module header */}
          <header className="space-y-4">
            <div className="flex items-center space-x-3 text-[10px] font-black text-emerald-700 uppercase tracking-[0.4em]">
              <span className="w-8 h-[1px] bg-[#1e1f48]"></span>
              <span>Active Reference Core</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter capitalize leading-tight">
              {activeModule.replace('-', ' ')}
            </h2>
          </header>

          {/* Content Area - Completely card-less raw design */}
          <div className="relative border-l border-dashed border-[#1e1f48] pl-8 space-y-8 animate-fadeIn">
            {renderModuleContent()}
          </div>
        </div>

        {/* Right Sticky Sidebar Control Panel (spans 1 column) */}
        <div className="space-y-8 xl:sticky xl:top-[180px] z-20">
          {/* Pathway Mastery Controls */}
          <div className="p-6 border border-[#1e1f48] rounded-3xl bg-transparent space-y-4">
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest block">Progress Verification</span>
            <h4 className="text-sm font-bold text-white">Pathway Sign-Off</h4>
            <p className="text-[11px] text-emerald-100/40 leading-relaxed">Sign off this active pathway module to register verified developer credits.</p>
            <button
              onClick={toggleMasteryState}
              className={`w-full py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${
                masteredModules[activeModule]
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-transparent text-emerald-100/60 hover:text-emerald-400 border-[#1e1f48] hover:border-emerald-500/20'
              }`}
            >
              {masteredModules[activeModule] ? '✓ Signed' : 'Authorize Pathway'}
            </button>
          </div>

          {/* Active Local configurations */}
          <div className="p-6 border border-[#1e1f48] rounded-3xl bg-transparent space-y-4">
            <header className="flex items-center justify-between">
              <h4 className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Git Registry State</h4>
              <span className="text-[8px] text-emerald-700 font-mono">UTF-8</span>
            </header>
            <div className="space-y-2">
              {Object.entries(configs).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-2 border-b border-[#1e1f48]/40 text-[10px] font-mono">
                  <span className="text-emerald-500 font-bold">{k}</span>
                  <span className="text-emerald-100/50 inline-block truncate max-w-[120px]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Workspace Seats */}
          <div className="p-6 border border-[#1e1f48] rounded-3xl bg-transparent space-y-4">
            <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest block">Workspace Seats</span>
            <div className="flex justify-between items-center text-[10px] font-mono">
              <div>
                <span className="text-emerald-500 font-bold">Quota Status</span>
                <p className="text-emerald-100/60 mt-0.5">{teamMembers.length} / ∞</p>
              </div>
              <button 
                onClick={() => setActiveModule('team-workspace')}
                className="px-2.5 py-1.5 bg-[#101129] border border-emerald-500/20 text-emerald-400 font-bold rounded-lg uppercase text-[8px] transition-all hover:bg-emerald-950/40"
              >
                Seats
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Widescreen footer */}
      <footer className="max-w-[1600px] mx-auto w-full px-8 py-10 border-t border-[#1e1f48] flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-emerald-800 font-mono tracking-widest uppercase mt-20">
        <nav className="flex items-center gap-10">
          <span className="flex items-center font-black text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            GIT LEARNING HUB SYSTEM
          </span>
          <button className="hover:text-emerald-500 transition-colors">Workspace SLA</button>
          <button className="hover:text-emerald-500 transition-colors">Privacy Policy</button>
        </nav>
        <p className="text-emerald-950">&copy; 2026 Git Learning Hub Inc // Project Orion</p>
      </footer>
    </div>
  );
};

export default App;