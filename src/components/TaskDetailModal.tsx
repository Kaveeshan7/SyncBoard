import { Task } from '../types';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
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

export default function TaskDetailModal({ task, isOpen, onClose, onEdit, onDelete }: TaskDetailModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-[#0b0b14] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${priorityColors[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">{task.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Description</h3>
            <p className="text-slate-300 leading-relaxed">
              {task.description || 'No description provided.'}
            </p>
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-sm font-medium rounded-full ${tagColors[tag] || 'bg-slate-500/10 text-slate-300 border border-slate-500/20'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {task.dueDate && (
              <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                <h3 className="text-xs font-medium text-slate-500 mb-1">Due Date</h3>
                <div className="flex items-center gap-2 text-slate-200">
                  <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                  <span className="text-sm">
                    {new Date(task.dueDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            )}

            {task.assignee && (
              <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl">
                <h3 className="text-xs font-medium text-slate-500 mb-1">Assignee</h3>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-medium">
                    {task.assignee === '1' ? 'K' : 'M'}
                  </div>
                  <span className="text-sm text-slate-200">
                    {task.assignee === '1' ? 'Kaveeshan' : 'Minaga'}
                  </span>
                </div>
              </div>
            )}

            <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl">
              <h3 className="text-xs font-medium text-slate-500 mb-1">Created</h3>
              <span className="text-sm text-slate-200">
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-white/10">
          <button
            onClick={() => onDelete?.(task.id)}
            className="flex items-center gap-2 px-4 py-2.5 border border-rose-500/30 bg-rose-500/5 text-rose-400 rounded-xl font-medium hover:bg-rose-500/15 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            Delete
          </button>
          <button
            onClick={() => onEdit?.(task)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-400 hover:to-indigo-500 shadow-md shadow-indigo-900/50 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}
