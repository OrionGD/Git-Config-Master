import React from 'react';
import { TeamMember } from '../types';

interface TeamWorkspaceViewProps {
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  newMemberEmail: string;
  setNewMemberEmail: (val: string) => void;
  newMemberRole: 'Admin' | 'Developer' | 'Security';
  setNewMemberRole: (val: 'Admin' | 'Developer' | 'Security') => void;
  handleAddSeat: (e: React.FormEvent) => void;
  addKioskLog: (msg: string, type: 'success' | 'info' | 'warn') => void;
  triggerSound: (type: any) => void;
}

export const TeamWorkspaceView: React.FC<TeamWorkspaceViewProps> = ({
  teamMembers,
  setTeamMembers,
  newMemberEmail,
  setNewMemberEmail,
  newMemberRole,
  setNewMemberRole,
  handleAddSeat,
  addKioskLog,
  triggerSound,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn text-[#ecfdf5]">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-emerald-950 pb-6">
        <div className="space-y-2">
          <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
            Workspace Hub
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase font-mono font-black">Team Workspace</h2>
          <p className="text-emerald-100/50 text-xs">
            Manage organization members, allocate workspace seat slots, and customize role parameters.
          </p>
        </div>
        <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 rounded-xl font-bold">
          Slots Provisioned: {teamMembers.length} active
        </span>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="p-8 bg-black/55 border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden h-fit">
          <h3 className="text-sm font-black text-white font-mono uppercase">Invite Workspace Developer</h3>
          <form onSubmit={handleAddSeat} className="space-y-5 font-mono">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-emerald-500/50 uppercase tracking-wider">Email Address</label>
              <input 
                type="email"
                value={newMemberEmail}
                onChange={e => setNewMemberEmail(e.target.value)}
                placeholder="e.g. arborist@orion-os.org"
                className="w-full px-4 py-3.5 bg-slate-950/70 border border-emerald-950 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/40 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-emerald-500/50 uppercase tracking-wider">Workspace Role</label>
              <select
                value={newMemberRole}
                onChange={e => setNewMemberRole(e.target.value as any)}
                className="w-full px-4 py-3.5 bg-slate-950/70 border border-emerald-950 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500/40 transition-all shadow-inner"
              >
                <option value="Developer">Developer Seat</option>
                <option value="Security">Security Auditor</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 animate-pulse"
            >
              Provision Slot License
            </button>
          </form>
        </div>

        {/* Active seat registry list */}
        <div className="xl:col-span-2 p-8 bg-black/55 border-2 border-emerald-950/60 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <h3 className="text-sm font-black text-white font-mono uppercase">Slots Registry</h3>
          <div className="divide-y divide-emerald-950/40 flex-1">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-black text-[11px]">
                    {member.avatar}
                  </div>
                  <div className="font-mono">
                    <p className="text-xs font-bold text-white leading-tight">{member.email}</p>
                    <span className="text-[7.5px] text-emerald-500/50 uppercase font-black tracking-wider block mt-0.5">{member.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className={`px-2.5 py-1 rounded-lg text-[7.5px] font-black uppercase tracking-wider border ${
                    member.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                  }`}>
                    {member.status}
                  </span>
                  {member.email !== 'godfrey@orion-os.org' && (
                    <button 
                      onClick={() => {
                        setTeamMembers(prev => prev.filter(m => m.email !== member.email));
                        addKioskLog(`REVOKED seat license for: ${member.email}`, 'warn');
                        triggerSound('click');
                      }}
                      className="px-3 py-1 bg-red-950/40 border border-red-900/30 rounded-lg text-red-400 hover:bg-red-500 hover:text-black text-[9px] font-black uppercase transition-all"
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
    </div>
  );
};
export default TeamWorkspaceView;
