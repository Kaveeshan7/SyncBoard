import { Board } from '../types';

interface AnalyticsViewProps {
  boards: Board[];
}

export default function AnalyticsView({ boards }: AnalyticsViewProps) {
  const allTasks = boards.flatMap((b) => b.columns.flatMap((c) => c.tasks));
  const totalTasks = allTasks.length;

  const lowPriority = allTasks.filter((t) => t.priority === 'low').length;
  const mediumPriority = allTasks.filter((t) => t.priority === 'medium').length;
  const highPriority = allTasks.filter((t) => t.priority === 'high').length;

  const columnsData = boards[0]?.columns.map((col) => ({
    title: col.title,
    count: col.tasks.length,
    percentage: totalTasks > 0 ? Math.round((col.tasks.length / totalTasks) * 100) : 0,
  })) || [];

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Project Analytics & Metrics</h1>
        <p className="text-slate-400 text-sm mt-1">
          Real-time visibility into sprint progress, task velocity, and priority breakdowns.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Overall Completion Rate
          </div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">78%</div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full w-[78%]" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">+12% vs last milestone</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Sprint Velocity
          </div>
          <div className="text-3xl font-bold text-violet-400 mt-2">14 pts</div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-violet-400 rounded-full w-[65%]" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Tasks completed per cycle</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Conflict Rate
          </div>
          <div className="text-3xl font-bold text-sky-400 mt-2">0.0%</div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full w-[5%]" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Clean concurrent edits</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            API Health & Uptime
          </div>
          <div className="text-3xl font-bold text-amber-400 mt-2">99.9%</div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full w-[99%]" />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Static UI scaffold responsive</p>
        </div>
      </div>

      {/* Visual Distributions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column Distribution */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="text-base font-bold text-white">Tasks by Status Column</h3>
          <div className="space-y-4">
            {columnsData.map((col) => (
              <div key={col.title} className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-medium">{col.title}</span>
                  <span className="text-slate-400">{col.count} tasks ({col.percentage}%)</span>
                </div>
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all ${
                      col.title === 'To Do'
                        ? 'bg-slate-400'
                        : col.title === 'In Progress'
                        ? 'bg-amber-400'
                        : col.title === 'Review'
                        ? 'bg-indigo-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.max(col.percentage, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="text-base font-bold text-white">Priority Distribution</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-medium text-rose-400">High Priority</span>
                <span>{highPriority} task(s)</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (highPriority / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-medium text-amber-400">Medium Priority</span>
                <span>{mediumPriority} task(s)</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (mediumPriority / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="font-medium text-emerald-400">Low Priority</span>
                <span>{lowPriority} task(s)</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (lowPriority / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Workload Comparison */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Team Contribution & Load</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Kaveeshan</div>
              <div className="text-xs text-slate-400">Lead Full-Stack Dev</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-violet-400">5 Tasks</div>
              <div className="text-[10px] text-slate-500">50% workload</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Minaga</div>
              <div className="text-xs text-slate-400">Lead Full-Stack Dev</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-400">5 Tasks</div>
              <div className="text-[10px] text-slate-500">50% workload</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
