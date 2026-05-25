import React, { useState } from 'react';
import { CampaignItem } from '../types';

interface CampaignsViewProps {
  campaigns: CampaignItem[];
  masteredMissions: string[];
  setMasteredMissions: React.Dispatch<React.SetStateAction<string[]>>;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  unlockBadge: (badgeId: string) => void;
  triggerSound: (type: any) => void;
  addKioskLog: (msg: string, type: 'success' | 'info' | 'warn') => void;
  workingFiles: string[];
  stagedFiles: string[];
  localCommits: any[];
  remoteCommits: any[];
  handleGitAdd: () => void;
  handleGitCommit: () => void;
  handleGitPush: () => void;
  setActiveModule: (mod: string) => void;
  hasUnsetConfig: boolean;
  reactorState: string;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  masteredMissions,
  setMasteredMissions,
  xp,
  setXp,
  unlockBadge,
  triggerSound,
  addKioskLog,
  handleGitAdd,
  handleGitCommit,
  handleGitPush,
  setActiveModule,
  workingFiles,
  stagedFiles,
  localCommits,
  remoteCommits,
  hasUnsetConfig,
  reactorState,
}) => {
  const [expandedHintId, setExpandedHintId] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<'basic' | 'intermediate' | 'advanced'>('basic');

  const questHints: { [key: string]: string } = {
    m1: 'Go to the "Registry Hub" page. Under "Standard Config Variables", enter your username (user.name) and primary developer email (user.email) to configure precedence overrides.',
    m2: 'Use the "Workspace Sandbox" panel. Click the "git add ." action button to stage your modified working directory files into the tracked index.',
    m3: 'Ensure you have staged changes in the Staging Area (Stage 02). Then click the "git commit" button to seal and write these changes as a local commit log snapshot.',
    m4: 'Navigate to the Variables Registry Editor. Type a custom editor name in the "core.editor" parameter and click save to overwrite your default terminal editor settings.',
    m5: 'Under the Variables Registry Editor page, configure the "init.defaultBranch" parameter globally with a custom value (e.g. main or trunk) to set standard init repositories settings.',
    m6: 'Audit your active workspace. Ensure that there is at least one modified or staged file active in the Directory sandbox to pass status checks.',
    m7: 'Verify that you have at least one commit sealed locally. Then click the "git push" action button in the Workspace Sandbox to synchronize changes up to the remote origin.',
    m8: 'Remove or unset a configuration variable key using the variables editor to log an unset event (you can click Reset Profile in Registry Hub to unset standard keys instantly).',
    m9: 'Navigate to the Conflict Reactor stabilization arena. Answer the basic override merging scenarios correctly to successfully contain and stabilize the reactor.',
    m10: 'Under standard config variables in the registry hub, enter a custom file path in the "core.excludesfile" field to establish your global pattern ignore list.',
    m11: 'Configure core.fileMode parameter checks in standard settings. Type "false" in the "core.fileMode" variable input box to ignore file mode executability tracking.',
    m12: 'Restore workspace staging area using sandboxed resets. Clear staging indexes and ensure at least index.js exists in the working directory sandbox.',
    m13: 'Go to the "Workspace Sandbox" panel at the bottom. Click the "Reset Pipeline" button to cleanly revert staging directories, index snapshots, and commits to base state.',
    m14: 'Set user.name and user.email under config settings, then navigate to the Conflict Reactor arena and correctly resolve all stabilization questions to achieve victory.',
    m15: 'Stabilize at least 3 layers correctly inside the Conflict Reactor stabilization sequence to demonstrate expertise in resolving complex merge conflicts.',
    m16: 'Either register a new custom system variable key in the registry editor or delete config variables to trigger precedence logs.',
    m17: 'Master all workflows: ensure remote commits are synced, reactor status is fully stabilized, and a custom config parameter is unset or removed.'
  };

  const filteredCampaigns = campaigns.filter(camp => camp.difficulty === activeDifficulty);

  return (
    <div className="space-y-8 animate-fadeIn text-[#ecfdf5]">
      <header className="space-y-2 border-b border-emerald-950 pb-6">
        <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
          Quest Hub
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight uppercase font-mono">Learning Quests Portal</h2>
        <p className="text-emerald-100/50 text-xs">
          Simulate essential repository steps, configure priority override hierarchies, and secure files to earn permanent achievements.
        </p>
      </header>

      {/* 🧭 Sci-Fi Difficulty Selector Tab Bar */}
      <div className="flex flex-wrap gap-4 border-b border-emerald-950/60 pb-6">
        {[
          { id: 'basic', label: '🟢 Basic Track', desc: 'Stages 1-6 // Staging & Configurations' },
          { id: 'intermediate', label: '🟡 Intermediate Track', desc: 'Stages 7-12 // Remotes & Stabilization' },
          { id: 'advanced', label: '🔴 Advanced Track', desc: 'Stages 13-17 // Advanced Overrides' }
        ].map(track => (
          <button
            key={track.id}
            onClick={() => {
              triggerSound?.('click');
              setActiveDifficulty(track.id as any);
              setExpandedHintId(null);
            }}
            className={`flex-1 min-w-[200px] p-5 border text-left rounded-2xl transition-all duration-300 font-mono active:scale-95 ${
              activeDifficulty === track.id
                ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/50'
                : 'bg-black/40 border-emerald-950/80 text-emerald-100/40 hover:border-emerald-500/20 hover:text-emerald-100/60'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-wider block mb-1">{track.label}</span>
            <span className="text-[8.5px] block opacity-80">{track.desc}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredCampaigns.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-emerald-950 rounded-[2rem] font-mono text-[10px] text-emerald-500/50">
            No missions provisioned for this difficulty track yet.
          </div>
        ) : (
          filteredCampaigns.map((camp, cidx) => {
            const isMastered = masteredMissions.includes(camp.id);
            const allDone = camp.steps.every(s => s.check === undefined || s.check === true);
            return (
              <div key={camp.id} className={`p-8 rounded-[2.5rem] border-2 transition-all duration-300 relative overflow-hidden ${
                isMastered 
                  ? 'bg-emerald-950/10 border-emerald-500/30 opacity-75 hover:opacity-100' 
                  : 'bg-black/55 border-emerald-950/60 hover:border-emerald-500/20 shadow-xl'
              }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 font-mono">
                  <div>
                    <span className="text-[8px] tracking-widest text-emerald-500 uppercase font-black">
                      {activeDifficulty.toUpperCase()} Track // Stage {camp.id.substring(1)}
                    </span>
                    <h3 className="text-lg font-black text-white mt-0.5 tracking-tight group-hover:text-emerald-400 font-mono">{camp.title}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2 self-start sm:self-auto font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-[9px] text-amber-400 font-black rounded-lg">
                        +{camp.xp} XP AWARD
                      </span>
                      {isMastered && (
                        <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 text-[9px] text-emerald-400 font-bold rounded-lg animate-pulse">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        triggerSound?.('click');
                        setExpandedHintId(prev => prev === camp.id ? null : camp.id);
                      }}
                      className="px-3 py-1 bg-slate-900 hover:bg-emerald-950/40 border border-emerald-950 hover:border-emerald-500/35 text-[8px] text-amber-500 hover:text-amber-400 font-black rounded-lg transition-all uppercase flex items-center gap-1 active:scale-95 shadow-md"
                    >
                      💡 {expandedHintId === camp.id ? 'Hide Hint' : 'Hint'}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-100/40 mb-6 font-mono leading-relaxed">{camp.desc}</p>
                
                {/* Requirement Protocols */}
                <div className="space-y-4 mb-6 bg-slate-950/60 p-5 rounded-2xl border border-emerald-950/80">
                  <span className="text-[8px] text-emerald-500/50 uppercase tracking-wider block font-mono font-bold">Requirement Protocols:</span>
                  {camp.steps.map((st, sidx) => (
                    <div key={sidx} className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono gap-3 pt-2 border-t border-emerald-950/30 first:border-t-0">
                      <span className="text-emerald-100/60 flex items-center gap-2 text-left">
                        <span className={st.check ? 'text-emerald-400 animate-pulse' : 'text-amber-500'}>
                          {st.check ? '●' : '○'}
                        </span> 
                        {st.text}
                      </span>
                      <div className="flex items-center gap-2 self-end">
                        {st.check ? (
                          <span className="text-emerald-400 font-bold text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">COMPLETED</span>
                        ) : (
                          <>
                            <span className="text-amber-500 text-[9px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25 animate-pulse">PENDING</span>
                            {st.action === 'add' && (
                              <button 
                                onClick={() => { triggerSound('click'); handleGitAdd(); }}
                                className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:text-black text-[9px] font-black uppercase transition-all animate-pulse"
                              >
                                git add .
                              </button>
                            )}
                            {st.action === 'commit' && (
                              <button 
                                onClick={() => { triggerSound('click'); handleGitCommit(); }}
                                className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:text-black text-[9px] font-black uppercase transition-all animate-pulse"
                              >
                                git commit
                              </button>
                            )}
                            {st.action === 'push' && (
                              <button 
                                onClick={() => { triggerSound('click'); handleGitPush(); }}
                                className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500 hover:text-black text-[9px] font-black uppercase transition-all animate-pulse"
                              >
                                git push
                              </button>
                            )}
                            {(st.action === 'unset' || st.action === 'reactor' || st.type === 'config') && (
                              <button 
                                onClick={() => {
                                  triggerSound('click');
                                  setActiveModule(st.action === 'reactor' ? 'reactor' : 'registry-editor');
                                }}
                                className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-lg hover:bg-emerald-500/20 text-[9px] font-black uppercase transition-all"
                              >
                                Open Portal
                              </button>
                            )}
                            {st.action === 'reset' && (
                              <span className="text-[8.5px] text-amber-500 italic block">Use sandbox reset controls below</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!isMastered && (
                  <button
                    onClick={() => {
                      if (allDone) {
                        setMasteredMissions(prev => [...prev, camp.id]);
                        setXp(prev => prev + camp.xp);
                        unlockBadge(camp.badge);
                        triggerSound('levelup');
                        addKioskLog(`MISSION SUCCESS: Completed "${camp.title}"!`, 'success');
                      } else {
                        triggerSound('error');
                        addKioskLog(`MISSION PENDING: Complete all pending quest prerequisites first!`, 'warn');
                      }
                    }}
                    className={`w-full py-4 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] border font-mono ${
                      allDone 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-950/45 animate-pulse' 
                        : 'bg-transparent text-emerald-600/40 border-emerald-950/60 cursor-not-allowed'
                    }`}
                  >
                    Verify Mission Completion
                  </button>
                )}

                {/* 💡 Expandable Hint Box */}
                {expandedHintId === camp.id && (
                  <div className="mt-6 p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-2 animate-slideDown">
                    <span className="text-[9px] text-amber-400 font-black uppercase tracking-widest block font-mono">💡 Mission Intel / Quick Hint:</span>
                    <p className="text-[10.5px] text-amber-100/60 leading-relaxed font-mono text-left">
                      {questHints[camp.id]}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default CampaignsView;
