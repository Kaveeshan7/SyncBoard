import { Board, Task, User } from '../types';

interface DashboardOverviewProps {
  user: User;
  boards: Board[];
  activeBoard: Board;
  onSelectBoard: (boardId: string) => void;
  onTaskClick: (task: Task) => void;
  onNavigateView: (view: string) => void;
}

export default function DashboardOverview({
  user,
  boards,
  activeBoard,
  onSelectBoard,
  onTaskClick,
  onNavigateView,
}: DashboardOverviewProps) {
  // Aggregate stats across all boards
  const allTasks = boards.flatMap((b) => b.columns.flatMap((c) => c.tasks));
  const totalTasks = allTasks.length;
  const completedTasks = boards
    .flatMap((b) => b.columns.filter((c) => c.title.toLowerCase() === 'done').flatMap((c) => c.tasks))
    .length;
  const inProgressTasks = boards
    .flatMap((b) => b.columns.filter((c) => c.title.toLowerCase() === 'in progress').flatMap((c) => c.tasks))
    .length;
  const highPriorityTasks = allTasks.filter((t) => t.priority === 'high');

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Recent activity mock
  const recentActivities = [
    {
      id: 'act-1',
      user: 'Kaveeshan',
      action: 'moved task to In Progress',
      task: 'Build authentication system',
      time: '10 mins ago',
      badge: 'In Progress',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'act-2',
      user: 'Minaga',
      action: 'completed task',
      task: 'Set up development environment',
      time: '1 hour ago',
      badge: 'Done',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'act-3',
      user: 'Kaveeshan',
      action: 'created new task',
      task: 'Design database schema',
      time: '3 hours ago',
      badge: 'To Do',
      badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    },
  ];

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300">
              Workspace Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-slate-400 mt-1 max-w-xl text-sm sm:text-base">
              Here is what is happening across your SyncBoard projects today. You have{' '}
              <span className="text-amber-400 font-semibold">{inProgressTasks} tasks in progress</span> and{' '}
              <span className="text-rose-400 font-semibold">{highPriorityTasks.length} high priority items</span>.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigateView('boards')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-semibold hover:from-violet-400 hover:to-indigo-500 shadow-lg shadow-indigo-900/50 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="3" width="7" height="10" rx="1" />
              </svg>
              Go to Boards
            </button>
            <button
              onClick={() => onNavigateView('analytics')}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-sm font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-violet-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Total Tasks</span>
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-3">{totalTasks}</div>
          <div className="text-xs text-slate-500 mt-1">Across {boards.length} workspace board(s)</div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">In Progress</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-amber-400 mt-3">{inProgressTasks}</div>
          <div className="text-xs text-slate-500 mt-1">Active tasks in flight</div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Completed</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-400 mt-3">{completedTasks}</div>
          <div className="text-xs text-slate-500 mt-1">{completionPercentage}% sprint completion</div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-rose-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">High Priority</span>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-rose-400 mt-3">{highPriorityTasks.length}</div>
          <div className="text-xs text-slate-500 mt-1">Requires immediate attention</div>
        </div>
      </div>

      {/* Main Grid: High Priority & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent & High Priority Tasks */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-white">Active Board Tasks</h2>
              <p className="text-xs text-slate-400">Current view: {activeBoard.title}</p>
            </div>
            <div className="flex gap-2">
              {boards.map((b) => (
                <button
                  key={b.id}
                  onClick={() => onSelectBoard(b.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    b.id === activeBoard.id
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/10'
                  }`}
                >
                  {b.title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {activeBoard.columns.flatMap((col) =>
              col.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${
                        task.priority === 'high'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : task.priority === 'medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-500">{col.title}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Feed & Team Status */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Live Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs border-b border-white/5 pb-3 last:border-none last:pb-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
                    {act.user.charAt(0)}
                  </div>
                  <div>
                    <div className="text-slate-300">
                      <span className="font-semibold text-white">{act.user}</span> {act.action}{' '}
                      <span className="text-violet-300 font-medium">"{act.task}"</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-500">{act.time}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${act.badgeColor}`}>
                        {act.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Team Availability</h2>
              <button
                onClick={() => onNavigateView('teams')}
                className="text-xs text-violet-400 hover:text-violet-300 font-medium"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      K
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0b14]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Kaveeshan</div>
                    <div className="text-[10px] text-slate-400">Full-Stack Dev</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      M
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0b14]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Minaga</div>
                    <div className="text-[10px] text-slate-400">Full-Stack Dev</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
