import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  high: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

const tagColors: Record<string, string> = {
  setup: 'bg-slate-500/10 text-slate-300 border border-slate-500/20',
  devops: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
  backend: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  database: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
  design: 'bg-pink-500/10 text-pink-300 border border-pink-500/20',
  ui: 'bg-rose-500/10 text-rose-300 border border-rose-500/20',
  auth: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
  frontend: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
  react: 'bg-sky-500/10 text-sky-300 border border-sky-500/20',
  documentation: 'bg-teal-500/10 text-teal-300 border border-teal-500/20',
  api: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
  planning: 'bg-green-500/10 text-green-300 border border-green-500/20',
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      onClick={() => onClick?.(task)}
      className="bg-white/[0.03] rounded-xl p-4 border border-white/10 hover:bg-white/[0.06] hover:border-violet-500/30 transition-all cursor-pointer group"
    >
      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${tagColors[tag] || 'bg-slate-500/10 text-slate-300 border border-slate-500/20'}`}
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-white/5 text-slate-400 border border-white/10">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-slate-100 mb-2 group-hover:text-violet-400 transition-colors">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        {/* Priority Badge */}
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4" />
              <path d="M8 2v4" />
              <path d="M3 10h18" />
            </svg>
            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        )}
      </div>

      {/* Assignee */}
      {task.assignee && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-medium">
            {task.assignee === '1' ? 'K' : 'M'}
          </div>
          <span className="text-xs text-slate-400">
            {task.assignee === '1' ? 'Kaveeshan' : 'Minaga'}
          </span>
        </div>
      )}
    </div>
  );
}
