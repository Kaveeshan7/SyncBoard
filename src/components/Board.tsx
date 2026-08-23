import { Board as BoardType, Task } from '../types';
import Column from './Column';

interface BoardProps {
  board: BoardType;
  onTaskClick?: (task: Task) => void;
  onAddTask?: (columnId: string) => void;
}

export default function Board({ board, onTaskClick, onAddTask }: BoardProps) {
  return (
    <div className="flex-1 p-6 overflow-x-auto">
      {/* Board Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">{board.title}</h1>
        <p className="text-slate-400 mt-1">Manage your team's tasks and collaborate in real-time</p>
      </div>

      {/* Columns Container */}
      <div className="flex gap-6 pb-6">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onTaskClick={onTaskClick}
            onAddTask={onAddTask}
          />
        ))}

        {/* Add Column Button */}
        <button className="w-80 min-w-[320px] h-32 border-2 border-dashed border-white/10 rounded-2xl text-slate-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/5 transition-all flex flex-col items-center justify-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
          <span className="text-sm font-medium">Add Column</span>
        </button>
      </div>
    </div>
  );
}
