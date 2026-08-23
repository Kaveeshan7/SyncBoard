import { useState } from 'react';
import { User, Board } from '../types';

interface TeamsViewProps {
  mockUsers: User[];
  boards: Board[];
}

export default function TeamsView({ mockUsers, boards }: TeamsViewProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Full-Stack Developer');
  const [inviteSent, setInviteSent] = useState(false);

  // Compute tasks count per member
  const getTasksForMember = (memberId: string) => {
    return boards
      .flatMap((b) => b.columns.flatMap((c) => c.tasks))
      .filter((t) => t.assignee === memberId);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      setInviteSent(true);
      setTimeout(() => {
        setInviteSent(false);
        setInviteEmail('');
        setIsInviteOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Team & Collaboration</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your project contributors, roles, and collaborative workflows.
          </p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:from-violet-400 hover:to-indigo-500 shadow-lg shadow-indigo-900/50 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          Invite Teammate
        </button>
      </div>

      {/* Team Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockUsers.map((member) => {
          const memberTasks = getTasksForMember(member.id);

          return (
            <div
              key={member.id}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-900/40">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-xs text-violet-400 font-medium">Full-Stack Developer</p>
                    <p className="text-xs text-slate-400 mt-1">{member.email}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>

              {/* Task statistics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{memberTasks.length}</div>
                  <div className="text-[11px] text-slate-400">Assigned Tasks</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-400">
                    {memberTasks.filter((t) => t.priority === 'high' || t.priority === 'medium').length}
                  </div>
                  <div className="text-[11px] text-slate-400">Active Sprint</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400">Commit Sync</div>
                </div>
              </div>

              {/* Assigned tasks preview */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Assigned Task Focus
                </h4>
                <div className="space-y-1.5">
                  {memberTasks.length > 0 ? (
                    memberTasks.slice(0, 3).map((t) => (
                      <div
                        key={t.id}
                        className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300 flex items-center justify-between"
                      >
                        <span className="truncate">{t.title}</span>
                        <span className="text-[10px] text-violet-400 font-medium capitalize">{t.priority}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">No tasks currently assigned.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Working Agreement Section */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Team Working Agreement & Branch Strategy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <h3 className="font-semibold text-white text-sm">Branch Strategy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use feature branches (`feature/auth`, `feature/board`) with PR reviews merged into `main`.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <h3 className="font-semibold text-white text-sm">Role Rotation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rotate core roles (Frontend, Backend REST, Testing & DevOps) so both members touch every layer.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
            <h3 className="font-semibold text-white text-sm">Conflict Handling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detect concurrent edits and raise real-time conflict warnings rather than overwriting data.
            </p>
          </div>
        </div>
      </div>

      {/* Invite Teammate Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-[#0b0b14] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Invite New Teammate</h3>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="text-slate-500 hover:text-slate-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {inviteSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h4 className="text-white font-bold">Invitation Sent!</h4>
                <p className="text-xs text-slate-400">An email invite was delivered to {inviteEmail}.</p>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@syncboard.com"
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#121222] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="QA / DevOps Engineer">QA / DevOps Engineer</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsInviteOpen(false)}
                    className="flex-1 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl text-sm font-medium hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-violet-400 hover:to-indigo-500"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
