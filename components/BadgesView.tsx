import React from 'react';
import { BadgeItem } from '../types';

interface BadgesViewProps {
  badgeLibrary: BadgeItem[];
  earnedBadges: string[];
  setEarnedBadges?: React.Dispatch<React.SetStateAction<string[]>>;
  configs?: Record<string, string>;
  stagedFiles?: string[];
  localCommits?: any[];
  remoteCommits?: any[];
  reactorState?: string;
  level?: number;
  addKioskLog?: (msg: string, type: 'success' | 'info' | 'warn') => void;
  triggerSound?: (type: any) => void;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ 
  badgeLibrary, 
  earnedBadges,
  setEarnedBadges,
  configs = {},
  stagedFiles = [],
  localCommits = [],
  remoteCommits = [],
  reactorState = 'idle',
  level = 1,
  addKioskLog,
  triggerSound,
}) => {

  // Live sandbox criteria checkers
  const checkBadgeCriteria = (badgeId: string): boolean => {
    switch (badgeId) {
      case 'arborist': // Configuration Primer
        return !!(configs['user.name'] && configs['user.name'] !== 'Learner' && configs['user.email'] && configs['user.email'] !== 'learner@example.com');
      case 'oxygenizer': // Staging Area
        return stagedFiles.length > 0 || localCommits.length > 0 || remoteCommits.length > 0;
      case 'carbon': // Commit Log
        return localCommits.length > 0 || remoteCommits.length > 0;
      case 'canopy': // Remote Upstream
        return remoteCommits.length > 0;
      case 'precedence': // Precedence Sage
        return level >= 2;
      case 'reactor': // Reactor Master
        return reactorState === 'victory';
      default:
        return false;
    }
  };

  // Get human-readable diagnostic criteria checks
  const getBadgeCriteriaDetails = (badgeId: string): { label: string; ok: boolean }[] => {
    switch (badgeId) {
      case 'arborist':
        const nameOk = !!(configs['user.name'] && configs['user.name'] !== 'Learner');
        const emailOk = !!(configs['user.email'] && configs['user.email'] !== 'learner@example.com');
        return [
          { label: 'Set custom user.name parameter', ok: nameOk },
          { label: 'Set custom user.email parameter', ok: emailOk }
        ];
      case 'oxygenizer':
        const stagedOk = stagedFiles.length > 0 || localCommits.length > 0 || remoteCommits.length > 0;
        return [
          { label: 'Stage files in staging area [git add]', ok: stagedOk }
        ];
      case 'carbon':
        const commitsOk = localCommits.length > 0 || remoteCommits.length > 0;
        return [
          { label: 'Register a local commit [git commit]', ok: commitsOk }
        ];
      case 'canopy':
        const remoteOk = remoteCommits.length > 0;
        return [
          { label: 'Synchronize remote upstream [git push]', ok: remoteOk }
        ];
      case 'precedence':
        const levelOk = level >= 2;
        return [
          { label: 'Reach rank Level 2 progression', ok: levelOk }
        ];
      case 'reactor':
        const victoryOk = reactorState === 'victory';
        return [
          { label: 'Achieve Conflict Reactor victory', ok: victoryOk }
        ];
      default:
        return [];
    }
  };

  const handleClaimBadge = (badgeId: string) => {
    const met = checkBadgeCriteria(badgeId);
    if (met) {
      triggerSound?.('levelup');
      if (setEarnedBadges && !earnedBadges.includes(badgeId)) {
        setEarnedBadges(prev => [...prev, badgeId]);
        addKioskLog?.(`SUCCESS: Certified Achievement "${badgeLibrary.find(b => b.id === badgeId)?.label}" unlocked!`, 'success');
      }
    } else {
      triggerSound?.('error');
      addKioskLog?.(`VERIFICATION DENIED: Finish required criteria in sandbox directory!`, 'warn');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn text-[#ecfdf5]">
      <header className="flex flex-col xl:flex-row justify-between xl:items-center gap-6 border-b border-emerald-950 pb-6">
        <div className="space-y-2">
          <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit">
            Credentials Shelf
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase font-mono">Holographic Achievements Shelf</h2>
          <p className="text-emerald-100/50 text-xs">
            Review earned milestones, configured registries achievements, and verified credentials compiled from core simulator missions.
          </p>
        </div>
      </header>

      {/* Badges Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badgeLibrary.map(badge => {
          const isUnlocked = earnedBadges.includes(badge.id);
          const criteriaList = getBadgeCriteriaDetails(badge.id);
          const criteriaMet = checkBadgeCriteria(badge.id);

          return (
            <div 
              key={badge.id} 
              onClick={() => handleClaimBadge(badge.id)}
              className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[260px] ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-emerald-500/40 shadow-xl shadow-emerald-950/20 hover:border-emerald-400 hover:scale-[1.02]' 
                  : 'bg-black/55 border-emerald-950/50 opacity-60 hover:opacity-90 hover:border-emerald-500/20'
              }`}
            >
              {/* Decorative radial blur for active badge */}
              {isUnlocked && (
                <div className="absolute -right-12 -top-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-[30px] group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-4xl filter drop-shadow-[0_4px_8px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-300">
                    {badge.icon}
                  </span>
                  <span className={`px-2.5 py-1 text-[8px] font-black rounded-lg transition-all border uppercase tracking-wider ${
                    isUnlocked 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 animate-pulse' 
                      : 'bg-slate-950 text-red-500/40 border-red-500/10'
                  }`}>
                    {isUnlocked ? 'SEALED & SYNCD' : 'LOCKED OVERRIDE'}
                  </span>
                </div>
                
                <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors font-mono">{badge.label}</h3>
                <p className="text-[10.5px] text-emerald-100/40 leading-relaxed font-mono">{badge.desc}</p>
                
                {/* 🔍 Criteria Diagnostics Block */}
                <div className="pt-2 space-y-1.5 border-t border-emerald-950/40">
                  <span className="text-[7.5px] text-emerald-500/50 font-black uppercase tracking-wider block font-mono">Verification Status:</span>
                  {criteriaList.map((crit, index) => (
                    <div key={index} className="flex justify-between items-center text-[9px] font-mono gap-2">
                      <span className="text-emerald-100/60 truncate">{crit.label}</span>
                      <span className={`text-[8px] font-bold ${crit.ok ? 'text-emerald-400' : 'text-amber-500/60 animate-pulse'}`}>
                        {crit.ok ? '✓ ACTIVE' : '✗ PENDING'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-3 border-t border-emerald-950/40 flex justify-between items-center font-mono text-[8px] gap-2">
                <span className="text-emerald-700 uppercase tracking-widest font-black truncate max-w-[150px]">
                  Target: {badge.unlock}
                </span>
                
                {isUnlocked ? (
                  <span className="text-emerald-400 font-bold text-[8.5px] uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    SEAL CLAIMED
                  </span>
                ) : criteriaMet ? (
                  <span className="text-amber-400 font-black text-[8.5px] uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30 animate-pulse">
                    ⚡ CLICK TO SEAL
                  </span>
                ) : (
                  <span className="text-red-500/50 text-[8px] uppercase tracking-wider bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10 font-bold">
                    🔒 WORK REQUIRED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BadgesView;
