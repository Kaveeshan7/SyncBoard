import { useState } from 'react';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (board: { title: string; columns: string[] }) => void;
}

const DEFAULT_COLUMNS = ['To Do', 'In Progress', 'Review', 'Done'];

export default function CreateBoardModal({ isOpen, onClose, onSubmit }: CreateBoardModalProps) {
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState<string[]>(DEFAULT_COLUMNS);
  const [columnInput, setColumnInput] = useState('');

  const handleAddColumn = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && columnInput.trim()) {
      e.preventDefault();
      if (!columns.includes(columnInput.trim())) {
        setColumns([...columns, columnInput.trim()]);
      }
      setColumnInput('');
    }
  };

  const handleRemoveColumn = (col: string) => {
    setColumns(columns.filter((c) => c !== col));
  };

  const resetForm = () => {
    setTitle('');
    setColumns(DEFAULT_COLUMNS);
    setColumnInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && columns.length > 0) {
      onSubmit?.({ title: title.trim(), columns });
      resetForm();
      onClose();
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-[#0b0b14] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Create New Board</h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="board-title" className="block text-sm font-medium text-slate-300 mb-2">
              Board Name <span className="text-rose-400">*</span>
            </label>
            <input
              id="board-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Marketing Sprint"
              autoFocus
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Columns */}
          <div>
            <label htmlFor="board-columns" className="block text-sm font-medium text-slate-300 mb-2">
              Columns <span className="text-slate-500 text-xs">(Press Enter to add)</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {columns.map((col) => (
                <span
                  key={col}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-violet-500/15 text-violet-300 border border-violet-500/30 rounded-full text-sm font-medium"
                >
                  {col}
                  <button
                    type="button"
                    onClick={() => handleRemoveColumn(col)}
                    className="hover:text-violet-100"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <input
              id="board-columns"
              type="text"
              value={columnInput}
              onChange={(e) => setColumnInput(e.target.value)}
              onKeyDown={handleAddColumn}
              placeholder="Add a column..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {columns.length === 0 && (
              <p className="mt-1.5 text-xs text-rose-400">Add at least one column</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-white/10 bg-white/5 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || columns.length === 0}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-400 hover:to-indigo-500 shadow-md shadow-indigo-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
