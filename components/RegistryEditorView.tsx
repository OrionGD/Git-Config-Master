import React from 'react';
import { KioskLog } from '../types';

interface RegistryEditorViewProps {
  configs: { [key: string]: string };
  handleUpdateConfig: (key: string, val: string) => void;
  handleRemoveConfig: (key: string) => void;
  newRegistryKey: string;
  setNewRegistryKey: (val: string) => void;
  newRegistryValue: string;
  setNewRegistryValue: (val: string) => void;
  kioskLogs: KioskLog[];
  triggerSound?: (type: any) => void;
}

export const RegistryEditorView: React.FC<RegistryEditorViewProps> = ({
  configs,
  handleUpdateConfig,
  handleRemoveConfig,
  newRegistryKey,
  setNewRegistryKey,
  newRegistryValue,
  setNewRegistryValue,
  kioskLogs,
  triggerSound,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn text-[#ecfdf5]">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-emerald-950 pb-6">
        <div className="space-y-2">
          <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            Registry Hub
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase font-mono">Variables Registry Editor</h2>
          <p className="text-emerald-100/50 text-xs">
            Visually configure standard and custom key variables stored in local or global configuration layers.
          </p>
        </div>
        <div className="px-4 py-1.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[8px] uppercase tracking-widest rounded-xl self-start flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          DATABASE LINK: ACTIVE
        </div>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Standard Presets Panel */}
        <div className="p-8 bg-black/55 border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-emerald-950 pb-4">
            <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide font-mono">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span> Standard Config Variables
            </h3>
            <button
              onClick={() => {
                triggerSound?.('click');
                handleRemoveConfig('user.name');
                handleRemoveConfig('user.email');
              }}
              className="px-3.5 py-1.5 bg-red-950/45 hover:bg-red-500 hover:text-black border border-red-500/30 rounded-xl text-red-400 text-[8px] uppercase font-black tracking-wider transition-all font-mono active:scale-95 shadow-md flex items-center gap-1.5 self-end sm:self-auto"
            >
              🗑️ Reset Profile (Unset Keys)
            </button>
          </div>
          
          <div className="space-y-4 font-mono">
            {[
              { label: 'User Display Name (user.name)', key: 'user.name', type: 'text', placeholder: 'e.g. godfrey, prithvi' },
              { label: 'User Email Address (user.email)', key: 'user.email', type: 'email', placeholder: 'e.g. developer@orion-os.org' },
              { label: 'Default Branch Name (init.defaultBranch)', key: 'init.defaultBranch', type: 'text', placeholder: 'e.g. main' },
              { label: 'System Default Editor (core.editor)', key: 'core.editor', type: 'text', placeholder: 'e.g. code, vim, nano' },
            ].map(opt => (
              <div key={opt.key} className="space-y-1.5">
                <label className="text-[8.5px] font-black text-emerald-500/50 uppercase tracking-wider block">{opt.label}</label>
                <input
                  type={opt.type}
                  value={configs[opt.key] || ''}
                  onChange={(e) => {
                    handleUpdateConfig(opt.key, e.target.value);
                  }}
                  placeholder={opt.placeholder}
                  className="w-full px-4 py-3.5 bg-slate-950/70 border border-emerald-950 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/40 transition-all shadow-inner"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Key Value panel */}
        <div className="p-8 bg-black/55 border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="space-y-6 font-mono">
            <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span> Custom Key-Value Parameters
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Variable Key (e.g. alias.st)"
                value={newRegistryKey}
                onChange={e => setNewRegistryKey(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-slate-950/70 border border-emerald-950 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/40 transition-all shadow-inner"
              />
              <input
                type="text"
                placeholder="Value (e.g. status)"
                value={newRegistryValue}
                onChange={e => setNewRegistryValue(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-slate-950/70 border border-emerald-950 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/40 transition-all shadow-inner"
              />
              <button
                onClick={() => {
                  if (newRegistryKey.trim() && newRegistryValue.trim()) {
                    triggerSound?.('click');
                    handleUpdateConfig(newRegistryKey.trim(), newRegistryValue.trim());
                    setNewRegistryKey('');
                    setNewRegistryValue('');
                  }
                }}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-[9px] uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                Add Key
              </button>
            </div>
          </div>

          {/* Registry Event Stream Logs */}
          <div className="mt-6 space-y-2 flex-1 flex flex-col font-mono">
            <span className="text-[8px] font-black text-emerald-500/50 uppercase tracking-widest block">Variable Override log stream</span>
            <div className="bg-black/60 p-4 rounded-2xl border border-emerald-950/80 font-mono text-[9px] text-emerald-400 min-h-[7rem] flex-1 space-y-1.5 overflow-y-auto shadow-inner">
              {kioskLogs.map(log => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-emerald-700 opacity-60">[{log.time}]</span>
                  <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warn' ? 'text-red-400' : 'text-emerald-600'}>
                    {log.msg}
                  </span>
                </div>
              ))}
              {kioskLogs.length === 0 && (
                <div className="text-emerald-800 italic text-center pt-6">Waiting for configuration modifications...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistryEditorView;
