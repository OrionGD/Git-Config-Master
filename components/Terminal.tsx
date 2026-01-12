import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  configs: { [key: string]: string };
  setConfigs: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onExit?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ configs, setConfigs, onExit }) => {
  const [history, setHistory] = useState<string[]>(['$ orion-os --version 3.2.0', 'Secure Shell established. Type "help" to list available git configuration commands.']);
  const [input, setInput] = useState('');
  const [currentBranch, setCurrentBranch] = useState('main');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Responsibility: Auto-focus terminal on click
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmd = trimmedInput.toLowerCase();
    const parts = trimmedInput.split(' ');
    let output = '';

    if (cmd === 'help') {
      output = `Available Training Commands:
- git config --list               : Show all active configurations
- git config <key>                : Get value for specific key
- git config --global <key> <val> : Set global user identity
- git config --unset <key>        : Remove configuration entry
- git status                      : View repository state
- git add <file>                  : Stage changes
- git commit -m "<msg>"           : Create a new history snapshot
- clear                           : Reset terminal history
- exit                            : Return to mission control`;
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'exit') {
      if (onExit) onExit();
      return;
    } else if (cmd === 'git status') {
      output = `On branch ${currentBranch}\nYour branch is up to date with 'origin/${currentBranch}'.\n\nnothing to commit, working tree clean`;
    } else if (cmd.startsWith('git add')) {
      output = `Staged changes for commit.`;
    } else if (cmd.startsWith('git commit')) {
      const msg = trimmedInput.split('-m')[1]?.replace(/"/g, '').trim() || 'Manual update';
      output = `[${currentBranch} f3a2d5e] ${msg}\n 1 file changed, 1 insertion(+)`;
    } else if (cmd.startsWith('git branch')) {
      if (parts.length === 3) {
        output = `Created branch '${parts[2]}'`;
      } else {
        output = `* ${currentBranch}\n  development\n  staging`;
      }
    } else if (cmd.startsWith('git checkout')) {
      if (parts.length >= 3) {
        const target = parts[parts.length - 1];
        setCurrentBranch(target);
        output = `Switched to branch '${target}'`;
      }
    } else if (cmd === 'git log') {
      output = `commit f3a2d5e8 (HEAD -> ${currentBranch})\nAuthor: ${configs['user.name'] || 'User'} <${configs['user.email'] || 'user@example.com'}>\nDate:   ${new Date().toDateString()}\n\n    Project architecture baseline established`;
    } else if (cmd.startsWith('git config')) {
      if (cmd.includes('--list')) {
        output = Object.entries(configs)
          .map(([k, v]) => `${k}=${v}`)
          .join('\n');
      } else if (cmd.includes('--unset')) {
        const key = parts[parts.length - 1];
        const newConfigs = { ...configs };
        delete newConfigs[key];
        setConfigs(newConfigs);
        output = `Configuration key '${key}' removed successfully.`;
      } else if (parts.length === 3) {
        const key = parts[2];
        output = configs[key] || `Error: Key '${key}' not found in active scope.`;
      } else if (cmd.includes('--global') || parts.length >= 4) {
        let key = '';
        let value = '';
        const configParts = parts.filter(p => !p.startsWith('--') && p !== 'git' && p !== 'config');
        if (configParts.length >= 2) {
          key = configParts[0];
          value = parts.slice(parts.indexOf(key) + 1).join(' ').replace(/"/g, '');
        }
        if (key && value) {
          setConfigs(prev => ({ ...prev, [key]: value }));
          output = `Successfully set ${key} in global scope.`;
        }
      }
    } else {
      output = `System Error: Command '${parts[0]}' not recognized in this shell.`;
    }

    setHistory(prev => [...prev, `$ ${trimmedInput}`, output].filter(Boolean));
    setInput('');
  };

  return (
    <div 
      className="bg-[#010806] border border-emerald-900/30 rounded-[2rem] overflow-hidden flex flex-col h-[450px] shadow-2xl transition-all relative group"
      onClick={handleTerminalClick}
      aria-label="Interactive Terminal Simulator"
    >
      {/* Terminal Header */}
      <div className="bg-[#081b14] px-8 py-5 border-b border-emerald-950 flex items-center justify-between">
        <div className="flex space-x-2.5">
          <div className="w-3 h-3 rounded-full bg-red-900/40"></div>
          <div className="w-3 h-3 rounded-full bg-amber-900/20"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
        </div>
        <div className="text-[10px] text-emerald-900 font-mono flex items-center uppercase tracking-[0.3em] font-black">
          <svg className="w-3 h-3 mr-3 opacity-40" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          Simulator Shell // orion_v3
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto code-font text-[12px] text-emerald-100/60 whitespace-pre-wrap leading-relaxed scroll-smooth custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.03)_0%,_transparent_100%)]"
        role="log"
        aria-live="polite"
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'text-emerald-400 font-bold mb-2 mt-4 first:mt-0 flex items-center' : 'opacity-40 pl-6 border-l border-emerald-900/20 mb-4 ml-1'}>
            {line.startsWith('$') && <span className="mr-3 text-emerald-700 opacity-60">❯</span>}
            {line.startsWith('$') ? line.substring(2) : line}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form 
        onSubmit={handleCommand} 
        className="p-8 pt-0 flex bg-[#010806]/95 items-center border-t border-emerald-900/10 focus-within:bg-[#010a08] transition-colors"
      >
        <span className="text-emerald-500 font-black mr-4 text-glow-hover animate-pulse">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-emerald-100 code-font text-[12px] placeholder-emerald-900/20 font-medium"
          placeholder="Input command (try 'git config --list')..."
          autoFocus
          spellCheck="false"
          autoComplete="off"
          aria-label="Terminal input field"
        />
      </form>
      
      {/* Decorative focus ring */}
      <div className="absolute inset-0 border border-emerald-500/0 pointer-events-none group-focus-within:border-emerald-500/20 transition-all rounded-[2rem]"></div>
    </div>
  );
};