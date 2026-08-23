import { User, Board } from '../types';

interface UserProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  boards: Board[];
}

export default function UserProfileModal({ user, isOpen, onClose, boards }: UserProfileModalProps) {
  if (!isOpen) return null;

  // Compute tasks assigned to user
  const assignedTasks = boards
    .flatMap((b) =>
      b.columns.flatMap((c) =>
        c.tasks
          .filter((t) => t.assignee === user.id)
          .map((t) => ({ ...t, boardTitle: b.title, columnTitle: c.title }))
      )
    );

  const completedCount = assignedTasks.filter((t) => t.columnTitle === 'Done').length;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-[#0b0b14] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 relative p-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="-mt-12 mb-4 flex items-end justify-between">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 border-4 border-[#0b0b14] flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              {user.name.charAt(0)}
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ● Active Contributor
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-violet-400 font-medium">Full-Stack Developer • SyncBoard Team</p>
            <p className="text-xs text-slate-400 mt-1">{user.email}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
            <div>
              <div className="text-lg font-bold text-white">{assignedTasks.length}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Assigned</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-400">{completedCount}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-400">
                {assignedTasks.length - completedCount}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">In Flight</div>
            </div>
          </div>

          {/* Assigned Tasks List */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Assigned Tasks ({assignedTasks.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {assignedTasks.length > 0 ? (
                assignedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{task.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {task.boardTitle} • {task.columnTitle}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                        task.priority === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : task.priority === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No tasks currently assigned to you.</p>
              )}
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white/5 border border-white/10 text-slate-200 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
