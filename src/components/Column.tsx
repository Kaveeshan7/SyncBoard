import { Column as ColumnType, Task } from '../types';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  onTaskClick?: (task: Task) => void;
  onAddTask?: (columnId: string) => void;
}

const columnHeaderColors: Record<string, string> = {
  'To Do': 'from-slate-400 to-slate-500',
  'In Progress': 'from-amber-400 to-orange-500',
  Review: 'from-blue-400 to-indigo-500',
  Done: 'from-emerald-400 to-green-500',
};

const columnIconBg: Record<string, string> = {
  'To Do': 'bg-slate-500/15 text-slate-300',
  'In Progress': 'bg-amber-500/15 text-amber-300',
  Review: 'bg-blue-500/15 text-blue-300',
  Done: 'bg-emerald-500/15 text-emerald-300',
};

export default function Column({ column, onTaskClick, onAddTask }: ColumnProps) {
  return (
    <div className="flex flex-col w-80 min-w-[320px] bg-white/[0.02] border border-white/5 rounded-2xl">
      {/* Column Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full bg-gradient-to-r ${columnHeaderColors[column.title] || 'from-slate-400 to-slate-500'}`}
            />
            <h2 className="font-semibold text-slate-100">{column.title}</h2>
          </div>
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${columnIconBg[column.title] || 'bg-slate-500/15 text-slate-300'}`}
          >
            {column.tasks.length}
          </span>
        </div>
        <div className={`h-1 w-full rounded-full bg-gradient-to-r ${columnHeaderColors[column.title] || 'from-slate-400 to-slate-500'} opacity-30`} />
      </div>

      {/* Tasks Container */}
      <div className="flex-1 p-4 pt-2 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}

        {/* Add Task Button */}
        <button
          onClick={() => onAddTask?.(column.id)}
          className="w-full p-3 border-2 border-dashed border-white/10 rounded-xl text-slate-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/5 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
          <span className="text-sm font-medium">Add Task</span>
        </button>
      </div>
    </div>
  );
}
