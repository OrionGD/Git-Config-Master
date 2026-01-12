import React, { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { INITIAL_CONFIGS, MODULE_IDS } from './constants';

const ThemeToggle: React.FC<{ isDarkMode: boolean; setIsDarkMode: (val: boolean) => void }> = ({ isDarkMode, setIsDarkMode }) => (
  <button 
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-500 hover:scale-105 transition-all shadow-sm border border-emerald-200 dark:border-emerald-800/30"
    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
  >
    {isDarkMode ? (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
    ) : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    )}
  </button>
);

const LandingPage: React.FC<{ onEnter: () => void; isDarkMode: boolean; setIsDarkMode: (val: boolean) => void }> = ({ onEnter, isDarkMode, setIsDarkMode }) => (
  <main className="min-h-screen bg-slate-50 dark:bg-[#020a08] flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500" role="main">
    {/* Floating Theme Toggle */}
    <div className="absolute top-8 right-8 z-50">
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>

    {/* Ambient background visuals */}
    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-900/40 dark:bg-emerald-900/40 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px]"></div>
    </div>
    
    <div className="relative z-10 max-w-5xl w-full text-center space-y-16 animate-fadeIn">
      <header className="space-y-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-900/30 bg-emerald-100/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse"></span>
          Secure Environment v3.2
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
          GIT <span className="text-emerald-600 dark:text-emerald-500">CONFIG</span><br/>
          <span className="opacity-90">MASTER</span>
        </h1>
        <p className="text-slate-600 dark:text-emerald-100/40 text-sm sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Master the professional architecture of your version control system with an interactive simulator and high-fidelity technical guides.
        </p>
      </header>

      <nav className="flex flex-col sm:flex-row items-center justify-center gap-6" aria-label="Landing Navigation">
        <button 
          onClick={onEnter}
          aria-label="Enter the interactive dashboard"
          className="group relative px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-emerald-950 font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl dark:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]"
        >
          Initialize Dashboard
          <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/0 group-hover:border-emerald-400/50 transition-all scale-105 opacity-0 group-hover:opacity-100"></div>
        </button>
        
        <a 
          href="https://training.github.com/downloads/github-git-cheat-sheet.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Download official GitHub cheat sheet PDF"
          className="px-10 py-5 bg-emerald-100 dark:bg-emerald-950/40 hover:bg-emerald-200 dark:hover:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3"
        >
          Reference Manual
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </a>
      </nav>

      <footer className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {[
          { title: "Simulator", desc: "Risk-free terminal environment for executing live config commands.", icon: "⌨️" },
          { title: "Architecture", desc: "Detailed breakdown of Local, Global, and System level scopes.", icon: "🏛️" },
          { title: "Scenarios", desc: "Real-world team workflows for conflict-free collaboration.", icon: "🤝" }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-3xl bg-slate-200/50 dark:bg-emerald-950/5 border border-slate-300 dark:border-emerald-900/10 hover:border-emerald-500/20 transition-all group shadow-sm dark:shadow-none">
            <span className="text-2xl mb-4 block grayscale group-hover:grayscale-0 transition-all">{feature.icon}</span>
            <h4 className="text-emerald-600 dark:text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-3">{feature.title}</h4>
            <p className="text-slate-500 dark:text-emerald-100/30 text-xs leading-relaxed group-hover:text-slate-700 dark:group-hover:text-emerald-100/50 transition-colors">{feature.desc}</p>
          </div>
        ))}
      </footer>
    </div>
  </main>
);

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeModule, setActiveModule] = useState(MODULE_IDS.INTRO);
  const [configs, setConfigs] = useState(INITIAL_CONFIGS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeModule]);

  const modules = [
    { id: MODULE_IDS.INTRO, title: 'Introduction', icon: '🚀' },
    { id: 'glossary', title: 'Git Glossary', icon: '📖' },
    { id: MODULE_IDS.SCOPES, title: 'Config Levels', icon: '📊' },
    { id: MODULE_IDS.ESSENTIALS, title: 'Workflow Essentials', icon: '🛠️' },
    { id: MODULE_IDS.READING, title: 'Reading Values', icon: '🔍' },
    { id: MODULE_IDS.WRITING, title: 'Writing & Updating', icon: '✍️' },
    { id: MODULE_IDS.REMOVING, title: 'Removing Config', icon: '🗑️' },
    { id: MODULE_IDS.SCENARIOS, title: 'Team Scenario', icon: '👥' },
    { id: MODULE_IDS.CHEATSHEET, title: 'Full Cheat Sheet', icon: '📜' },
    { id: MODULE_IDS.TROUBLESHOOTING, title: 'Troubleshooting', icon: '🩺' },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case MODULE_IDS.INTRO:
        return (
          <section className="space-y-8 animate-fadeIn" aria-labelledby="module-title">
            <h2 id="module-title" className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Introduction <span className="text-emerald-600 dark:text-emerald-500">&</span> Core Syntax</h2>
            <p className="text-slate-600 dark:text-emerald-100/80 leading-relaxed text-xl font-medium">
              Git configuration acts as the nervous system of your development environment. It defines your identity and establishes the ground rules for every repository you touch.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#010806] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/20 shadow-sm">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Legacy Schema</span>
                <code className="block mt-4 text-sm text-emerald-700 dark:text-emerald-300 font-mono bg-emerald-50 dark:bg-black/40 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/10">git config [&lt;options&gt;]</code>
              </div>
              <div className="bg-white dark:bg-[#010806] p-6 rounded-2xl border border-slate-200 dark:border-emerald-900/20 shadow-sm">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Modern Standard</span>
                <code className="block mt-4 text-sm text-emerald-700 dark:text-emerald-200 font-mono bg-emerald-50 dark:bg-black/40 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/10">git config &lt;subcommand&gt;</code>
              </div>
            </div>
            <aside className="bg-emerald-50 dark:bg-emerald-500/5 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">💡</div>
              <h3 className="text-lg font-bold mb-4 text-emerald-700 dark:text-emerald-400">Professional Summary</h3>
              <p className="text-emerald-900/70 dark:text-emerald-50/60 italic text-lg leading-relaxed">
                "Git configuration governs tool behavior through prioritized scopes (Local, Global, System), primarily managed via the <code className="text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-0.5 rounded font-mono font-bold">git config</code> API."
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
                { term: 'Git', desc: 'The distributed engine that tracks file changes.' },
                { term: 'GitHub', desc: 'The collaboration layer and cloud hosting environment.' },
                { term: 'Commit', desc: 'An immutable snapshot of your project state.' },
                { term: 'Branch', desc: 'A pointer to a specific stream of development.' },
                { term: 'Clone', desc: 'A full local duplication of a remote environment.' },
                { term: 'Remote', desc: 'The shared source of truth, typically on GitHub.' },
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
                { name: '--local', desc: 'Highest priority. Specific to one project directory.', file: '.git/config', color: 'text-emerald-600 dark:text-emerald-400' },
                { name: '--global', desc: 'Middle priority. Applies to your OS user profile.', file: '~/.gitconfig', color: 'text-emerald-600 dark:text-emerald-500' },
                { name: '--system', desc: 'Lowest priority. Global machine defaults.', file: '/etc/gitconfig', color: 'text-emerald-800 dark:text-emerald-700' },
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

      case MODULE_IDS.ESSENTIALS:
        return (
          <section className="space-y-10 animate-fadeIn h-full overflow-y-auto pr-4 custom-scrollbar">
            <header className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">The Core <span className="text-emerald-600 dark:text-emerald-500">Git Workflow</span></h2>
              <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed max-w-3xl">
                Mastering Git starts with understanding the standard cycle of saving and syncing your work. We use the memory trick <strong>S → A → C → P</strong>.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
              {[
                { step: '1. Status Command', icon: '🔍', cmd: 'git status', desc: 'See what files have changed since your last save.', color: 'emerald' },
                { step: '2. Add Command', icon: '📥', cmd: 'git add .', desc: 'Move your changes into the "Staging Area" (Preparing to save).', color: 'emerald' },
                { step: '3. Commit Command', icon: '💾', cmd: 'git commit -m "msg"', desc: 'Create a permanent snapshot of your staged changes.', color: 'emerald' },
                { step: '4. Push Command', icon: '☁️', cmd: 'git push', desc: 'Upload your local snapshots to a remote server (GitHub).', color: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <span className="text-[10px] font-black text-slate-300 dark:text-emerald-800 uppercase tracking-widest">Phase 0{i+1}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{item.step}</h4>
                  <p className="text-xs text-slate-500 dark:text-emerald-100/40 leading-relaxed mb-6 h-10">{item.desc}</p>
                  <code className="block p-3 bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold">
                    {item.cmd}
                  </code>
                </div>
              ))}
            </div>

            <div className="p-8 bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 rounded-[3rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl font-black rotate-12">SACP</div>
               <h3 className="text-2xl font-black mb-4">Memory Trick: S.A.C.P</h3>
               <p className="text-sm opacity-90 leading-relaxed max-w-xl">
                 If you ever feel lost, remember the sequence: <strong>Status</strong> to see, <strong>Add</strong> to stage, <strong>Commit</strong> to save, <strong>Push</strong> to sync. It's the standard pulse of a professional developer.
               </p>
            </div>
          </section>
        );

      case MODULE_IDS.SCENARIOS:
        return (
          <section className="space-y-10 animate-fadeIn" aria-labelledby="scenario-title">
            <header className="space-y-4">
              <h2 id="scenario-title" className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Team Synchronization <span className="text-emerald-600 dark:text-emerald-500">Scenario</span></h2>
              <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed">
                Imagine three developers (A, B, and C) collaborating on the same software project using different systems. Here is how Git Configuration ensures their work remains traceable and consistent.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { dev: 'Developer A', system: 'macOS', role: 'UI Lead', identity: 'a@orion.dev' },
                { dev: 'Developer B', system: 'Windows 11', role: 'Core API', identity: 'b@orion.dev' },
                { dev: 'Developer C', system: 'Ubuntu', role: 'Ops / Security', identity: 'c@orion.dev' },
              ].map((d, i) => (
                <div key={i} className="p-6 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/20 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none">
                  <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl font-black text-slate-900 dark:text-white">{i+1}</div>
                  <h4 className="text-emerald-600 dark:text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-4">{d.dev}</h4>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[11px]"><span className="text-slate-400 dark:text-emerald-900">OS:</span> <span className="text-slate-700 dark:text-emerald-100 font-medium">{d.system}</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-slate-400 dark:text-emerald-900">ROLE:</span> <span className="text-slate-700 dark:text-emerald-100 font-medium">{d.role}</span></div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/10 space-y-2">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-emerald-800 uppercase tracking-widest">Global Config</span>
                    <code className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-mono truncate bg-slate-50 dark:bg-black/20 p-1.5 rounded">user.email="{d.identity}"</code>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/10 space-y-6">
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center">
                <span className="mr-3">🔄</span> The Synchronization Workflow
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-600 dark:text-emerald-100/60">
                <div className="space-y-4">
                  <p>
                    Throughout the day, each developer makes independent changes and commits them locally. Their <span className="text-emerald-600 dark:text-emerald-400 font-bold">Global Config</span> ensures every commit is correctly signed with their unique identity.
                  </p>
                  <p>
                    By the end of the day, they push their local history to the <span className="text-emerald-700 dark:text-emerald-500 font-black">Remote Repository</span> (GitHub/GitLab).
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    To stay in sync, they pull updates from others. The <span className="text-emerald-600 dark:text-emerald-400 font-bold">Local Config</span> in their project ensures shared rules (like line ending handling or pre-commit hooks) apply identically to everyone.
                  </p>
                  <div className="p-4 bg-white dark:bg-black/40 rounded-xl border border-emerald-100 dark:border-emerald-900/20 italic text-[11px] text-emerald-800 dark:text-emerald-100/40 shadow-sm dark:shadow-none">
                    "Result: A chronological history of changes, with no work lost, synchronized across three different operating systems."
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.READING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">🔍 Inspecting Config</h2>
            <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-lg">Use these commands to debug your environment or verify which settings are currently active.</p>
            <div className="space-y-4">
              {[
                { cmd: 'git config --list', desc: 'Displays all variables from all scopes.' },
                { cmd: 'git config user.name', desc: 'Reads the specific value for a given key.' },
                { cmd: 'git config --show-origin --list', desc: 'Shows which file each setting is coming from.' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between group hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none">
                  <code className="text-emerald-700 dark:text-emerald-400 font-mono text-sm mb-2 sm:mb-0 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 font-bold">{item.cmd}</code>
                  <span className="text-slate-400 dark:text-emerald-100/30 text-xs italic">{item.desc}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case MODULE_IDS.WRITING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">✍️ Writing & Updating</h2>
            <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-lg">Establishing your identity and personalizing your developer experience.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-100 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 shadow-sm dark:shadow-none">
                <h4 className="text-emerald-700 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">Identity Setup</h4>
                <div className="space-y-2 font-mono text-xs">
                  <p className="text-slate-400 dark:text-emerald-100/40"># Global (Universal)</p>
                  <code className="text-emerald-800 dark:text-emerald-200 block bg-white dark:bg-black/40 p-2 rounded border border-slate-200 dark:border-transparent font-bold">git config --global user.name "Your Name"</code>
                  <p className="text-slate-400 dark:text-emerald-100/40 mt-4"># Local (Repo Specific)</p>
                  <code className="text-emerald-800 dark:text-emerald-200 block bg-white dark:bg-black/40 p-2 rounded border border-slate-200 dark:border-transparent font-bold">git config --local user.email "work@co.com"</code>
                </div>
              </div>
              <div className="p-8 bg-slate-100 dark:bg-emerald-900/10 border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 shadow-sm dark:shadow-none">
                <h4 className="text-emerald-700 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">Editor Preferences</h4>
                <div className="space-y-2 font-mono text-xs">
                  <p className="text-slate-400 dark:text-emerald-100/40"># VS Code as default editor</p>
                  <code className="text-emerald-800 dark:text-emerald-200 block bg-white dark:bg-black/40 p-2 rounded border border-slate-200 dark:border-transparent font-bold">git config --global core.editor "code --wait"</code>
                  <p className="text-slate-400 dark:text-emerald-100/40 mt-4"># Setting default branch</p>
                  <code className="text-emerald-800 dark:text-emerald-200 block bg-white dark:bg-black/40 p-2 rounded border border-slate-200 dark:border-transparent font-bold">git config --global init.defaultBranch main</code>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.REMOVING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">🗑️ Removing Config</h2>
            <p className="text-slate-600 dark:text-emerald-100/60 leading-relaxed text-lg">Correcting mistakes or resetting behavior by unsetting configuration keys.</p>
            <div className="bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20 p-8 rounded-3xl space-y-6">
              <div className="flex items-center space-x-4">
                <span className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-500 text-lg">⚠️</span>
                <div>
                  <h4 className="text-red-700 dark:text-red-400 font-black text-[10px] uppercase tracking-widest">Danger Zone</h4>
                  <p className="text-red-800/60 dark:text-red-100/40 text-xs">Always ensure you specify the correct scope to avoid unsetting the wrong file.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-black/40 rounded-xl border border-red-100 dark:border-red-900/10 flex flex-col space-y-2 shadow-sm dark:shadow-none">
                  <code className="text-red-600 dark:text-red-400 font-mono text-sm font-bold">git config --global --unset user.name</code>
                  <span className="text-red-800/40 dark:text-red-100/30 text-[10px] uppercase tracking-widest font-bold">Removes name from ~/.gitconfig</span>
                </div>
                <div className="p-4 bg-white dark:bg-black/40 rounded-xl border border-red-100 dark:border-red-900/10 flex flex-col space-y-2 shadow-sm dark:shadow-none">
                  <code className="text-red-600 dark:text-red-400 font-mono text-sm font-bold">git config --local --unset-all core.ignored</code>
                  <span className="text-red-800/40 dark:text-red-100/30 text-[10px] uppercase tracking-widest font-bold">Removes all entries for a multi-valued key</span>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.TROUBLESHOOTING:
        return (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">🩺 Diagnostic Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Problem: Commits show wrong author</h4>
                <p className="text-slate-500 dark:text-emerald-100/40 text-xs leading-relaxed">Usually caused by an incorrect global setting or a local override you forgot about.</p>
                <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/10">
                  <span className="text-emerald-600 dark:text-emerald-500 font-black text-[10px] uppercase tracking-widest">Solution</span>
                  <code className="block mt-2 text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-bold">git config --show-origin user.name</code>
                </div>
              </div>
              <div className="p-8 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/20 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Problem: Config not applying</h4>
                <p className="text-slate-500 dark:text-emerald-100/40 text-xs leading-relaxed">Priority order issues. Local config always beats Global, even if Global was set more recently.</p>
                <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/10">
                  <span className="text-emerald-600 dark:text-emerald-500 font-black text-[10px] uppercase tracking-widest">Solution</span>
                  <code className="block mt-2 text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-bold">Check .git/config for overrides</code>
                </div>
              </div>
            </div>
          </section>
        );

      case MODULE_IDS.CHEATSHEET:
        return (
          <section className="space-y-10 animate-fadeIn h-full overflow-y-auto pr-4 custom-scrollbar">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Git Cheat Sheet <span className="text-emerald-600 dark:text-emerald-500">(Student Edition)</span></h2>
            
            <div className="space-y-12 pb-10">
              {/* Section 1 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 border-b border-emerald-100 dark:border-emerald-900/20 pb-2">1. Basic Configuration (One Time)</h3>
                <div className="bg-slate-100 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-emerald-900/20">
                  <code className="text-xs sm:text-sm font-mono text-emerald-800 dark:text-emerald-300 block space-y-2 whitespace-pre">
                    git config --global user.name "Your Name"<br/>
                    git config --global user.email "your_email@gmail.com"<br/>
                    git config --global --list
                  </code>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 border-b border-emerald-100 dark:border-emerald-900/20 pb-2">2. Repository Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-emerald-900/10">
                    <p className="text-[10px] text-slate-400 dark:text-emerald-800 uppercase font-black mb-2">Create a new local repo</p>
                    <code className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">git init</code>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-emerald-900/10">
                    <p className="text-[10px] text-slate-400 dark:text-emerald-800 uppercase font-black mb-2">Clone a GitHub repo</p>
                    <code className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">git clone [url]</code>
                  </div>
                </div>
              </div>

              {/* Section 3 & 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-emerald-100">3. Connect to GitHub</h3>
                  <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block bg-slate-100 dark:bg-black/40 p-3 rounded-lg">
                    git remote add origin [url]<br/>
                    git remote -v<br/>
                    <span className="opacity-40 text-[10px]"># Fix if exists:</span><br/>
                    git remote remove origin
                  </code>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-emerald-100">4. Daily Workflow (S-A-C-P)</h3>
                  <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block bg-slate-100 dark:bg-black/40 p-3 rounded-lg border-l-4 border-emerald-500">
                    git status<br/>
                    git add .<br/>
                    git commit -m "Message"<br/>
                    git push
                  </code>
                </div>
              </div>

              {/* Sections 5, 6, 7, 8 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "5. Staging", cmd: "git add ." },
                  { title: "6. Commit", cmd: "git commit -m \"msg\"" },
                  { title: "7. Push", cmd: "git push" },
                  { title: "8. Pull", cmd: "git pull origin main" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-emerald-50 dark:bg-emerald-900/5 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl">
                    <h4 className="text-[10px] font-black text-emerald-800 dark:text-emerald-700 uppercase mb-2">{item.title}</h4>
                    <code className="text-emerald-600 dark:text-emerald-400 text-xs font-mono">{item.cmd}</code>
                  </div>
                ))}
              </div>

              {/* Sections 9 & 10 */}
              <div className="space-y-6">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-emerald-100">9. Check History & 10. Undo Changes</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-900/20 rounded-3xl">
                       <code className="text-sm font-mono text-emerald-700 dark:text-emerald-400 block whitespace-pre">
                        git log<br/>
                        git log --oneline
                       </code>
                    </div>
                    <div className="p-6 bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20 rounded-3xl">
                       <code className="text-sm font-mono text-red-600 dark:text-red-400 block whitespace-pre">
                        git reset file.ext<br/>
                        git reset --soft HEAD~1<br/>
                        git checkout -- file.ext
                       </code>
                    </div>
                 </div>
              </div>

              {/* Sections 11 & 12 */}
              <div className="bg-slate-100 dark:bg-emerald-950/20 p-8 rounded-[2rem] border border-slate-200 dark:border-emerald-900/20">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">11. Branching & 12. Fixes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-2">
                    <p className="font-bold text-emerald-600 dark:text-emerald-500">Branching:</p>
                    <code className="block font-mono text-xs opacity-70">git branch feature1</code>
                    <code className="block font-mono text-xs opacity-70">git checkout feature1</code>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-emerald-600 dark:text-emerald-500">Rejected Push Fix:</p>
                    <code className="block font-mono text-xs opacity-70">git pull origin main</code>
                    <code className="block font-mono text-xs opacity-70">git push</code>
                  </div>
                </div>
              </div>

              {/* Note Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-dashed border-emerald-200 dark:border-emerald-900/30 rounded-3xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-3">13. Authentication Note</h4>
                  <p className="text-xs text-slate-500 dark:text-emerald-100/40 leading-relaxed">
                    GitHub uses <strong>Personal Access Token (PAT)</strong> instead of passwords. Use your username and the generated Token as the password.
                  </p>
                </div>
                <div className="p-6 bg-emerald-600 text-white dark:text-emerald-950 rounded-3xl flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">14. Quick Memory Trick</h4>
                    <p className="text-2xl font-black tracking-tighter">S → A → C → P</p>
                  </div>
                  <div className="text-[10px] font-mono text-right opacity-60">
                    Status<br/>Add<br/>Commit<br/>Push
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <div className="text-8xl mb-8 opacity-10 animate-pulse text-emerald-900">🛠️</div>
             <p className="text-emerald-800 dark:text-emerald-800 uppercase tracking-[0.5em] text-[10px] font-black">Module Initialization Sequence...</p>
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
    return <LandingPage onEnter={() => setShowDashboard(true)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-[#020a08] overflow-x-hidden transition-colors duration-500">
      {/* Sidebar - Responsible Desktop / Mobile Header */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-[#05130d] border-r border-slate-200 dark:border-emerald-900/30 mobile-nav-transition lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="navigation"
        aria-label="Sidebar Navigation"
      >
        <div className="flex flex-col h-full">
          <header className="p-8 border-b border-slate-100 dark:border-emerald-900/10 flex items-center justify-between">
            <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter flex items-center group cursor-default">
              <span 
                onClick={() => setShowDashboard(false)}
                className="bg-emerald-600 w-8 h-8 flex items-center justify-center rounded-lg mr-3 text-white dark:text-emerald-950 hover:scale-110 transition-transform cursor-pointer"
              >
                G
              </span>
              <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">CONFIG MASTER</span>
            </h1>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-emerald-500"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>

          <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center space-x-4 border group relative overflow-hidden ${
                  activeModule === m.id 
                    ? 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/40 shadow-lg' 
                    : 'text-slate-400 dark:text-emerald-800 border-transparent hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:text-emerald-600'
                }`}
                aria-current={activeModule === m.id ? 'page' : undefined}
              >
                <span className={`text-xl ${activeModule === m.id ? 'grayscale-0' : 'grayscale opacity-40'}`}>{m.icon}</span>
                <span className="font-bold text-[10px] uppercase tracking-widest">{m.title}</span>
                {activeModule === m.id && <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>}
              </button>
            ))}
          </nav>

          <footer className="p-8 bg-slate-50 dark:bg-[#030d09] border-t border-slate-100 dark:border-emerald-900/10">
             <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-emerald-900">
                <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2"></span> LINK STABLE</span>
                <span>SECURE_ENV</span>
             </div>
          </footer>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative" role="main">
        {/* Top bar for dashboard */}
        <header className="p-6 border-b border-slate-200 dark:border-emerald-900/10 flex items-center justify-between bg-white/80 dark:bg-[#020a08]/80 backdrop-blur-lg sticky top-0 z-40 transition-colors">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-emerald-900/20 rounded-xl text-emerald-500"
              aria-label="Open navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
            <h1 className="text-sm font-black text-emerald-600 dark:text-emerald-500 tracking-tighter uppercase lg:block hidden">Git Config Master</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </header>

        <div className="p-6 sm:p-12 md:p-16 max-w-7xl mx-auto w-full space-y-16">
          {/* Module Header */}
          <header className="space-y-4">
            <div className="flex items-center space-x-3 text-[10px] font-black text-slate-300 dark:text-emerald-800 uppercase tracking-[0.4em]">
              <span className="w-8 h-[1px] bg-slate-200 dark:bg-emerald-900"></span>
              <span>Training Protocol Active</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter capitalize leading-tight">
              {activeModule.replace('-', ' ')}
            </h2>
          </header>

          {/* Core Content Glass Panel */}
          <div className="p-8 sm:p-12 rounded-[3rem] glass-panel shadow-2xl dark:shadow-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black select-none pointer-events-none group-hover:opacity-10 transition-opacity text-slate-900 dark:text-white">GIT</div>
            <div className="relative z-10 min-h-[400px]">
              {renderModuleContent()}
            </div>
          </div>

          {/* Simulator & State Section */}
          <section className="space-y-10">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-xs font-black text-slate-400 dark:text-emerald-500/60 uppercase tracking-[0.3em] flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-4 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></span>
                  Sandbox Environment
              </h3>
              <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-emerald-950/20 border border-slate-200 dark:border-emerald-900/10 text-[10px] font-mono text-slate-400 dark:text-emerald-700">
                STATUS: SYNC_LOCAL_GLOBAL
              </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2">
                <Terminal configs={configs} setConfigs={setConfigs} onExit={() => setShowDashboard(false)} />
              </div>
              <aside className="p-8 bg-white dark:bg-transparent border border-slate-200 dark:border-emerald-900/20 rounded-[2.5rem] flex flex-col h-full max-h-[22rem] shadow-sm dark:shadow-none box-glow-hover">
                <header className="flex items-center justify-between mb-8">
                  <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Active State</h4>
                  <span className="text-[9px] text-slate-300 dark:text-emerald-900 font-mono">HASH: 44F9A</span>
                </header>
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {Object.entries(configs).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-emerald-900/10 group hover:border-emerald-500/40 transition-all cursor-default">
                      <span className="text-emerald-700 dark:text-emerald-700 font-bold text-[10px] font-mono tracking-tight">{k}</span>
                      <span className="text-slate-500 dark:text-emerald-100/60 text-[10px] font-mono truncate max-w-[120px]">{v}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          {/* Responsible Footer */}
          <footer className="pt-16 pb-12 border-t border-slate-200 dark:border-emerald-900/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-slate-400 dark:text-emerald-900 font-mono tracking-widest uppercase">
            <nav className="flex items-center gap-10">
              <span className="flex items-center font-black text-emerald-600 dark:text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2"></span>
                CORE SECURE
              </span>
              <button className="hover:text-emerald-600 transition-colors">Documentation</button>
              <button className="hover:text-emerald-600 transition-colors">Privacy Policy</button>
            </nav>
            <p className="text-slate-300 dark:text-emerald-950/80">&copy; 2026 Git Mastery Systems // Project Orion</p>
          </footer>
        </div>
      </main>

      {/* Backdrop for mobile nav */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default App;