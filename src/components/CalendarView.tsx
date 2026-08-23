import { useState } from 'react';
import { Board, Task } from '../types';

interface CalendarViewProps {
  boards: Board[];
  onTaskClick: (task: Task) => void;
}

export default function CalendarView({ boards, onTaskClick }: CalendarViewProps) {
  const [currentDate] = useState(new Date());

  // Collect all tasks with due dates
  const tasksWithDates = boards.flatMap((b) =>
    b.columns.flatMap((c) =>
      c.tasks
        .filter((t) => t.dueDate)
        .map((t) => ({ ...t, columnTitle: c.title, boardTitle: b.title }))
    )
  );

  // Generate calendar days for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const days = [];
  // Empty padding cells
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Month days
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const priorityColors = {
    low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    high: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Project Schedule & Calendar</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track task due dates, milestones, and release targets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-white/5 border border-white/10 text-slate-200 text-sm font-semibold rounded-xl">
            {monthNames[month]} {year}
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-white/5 border-b border-white/10 text-center py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 auto-rows-fr bg-[#05050a] gap-px">
          {days.map((dayNum, index) => {
            if (dayNum === null) {
              return <div key={`empty-${index}`} className="min-h-[110px] bg-white/[0.01]" />;
            }

            // Date string format YYYY-MM-DD for comparison
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const matchedTasks = tasksWithDates.filter((t) => t.dueDate === dateStr);
            const isToday = dayNum === currentDate.getDate();

            return (
              <div
                key={dayNum}
                className={`min-h-[110px] p-2 border border-white/5 transition-colors ${
                  isToday ? 'bg-violet-500/5 ring-1 ring-violet-500/30' : 'bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? 'w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center'
                        : 'text-slate-400'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {matchedTasks.length > 0 && (
                    <span className="text-[10px] text-slate-500 font-medium">
                      {matchedTasks.length} task(s)
                    </span>
                  )}
                </div>

                <div className="space-y-1 mt-1">
                  {matchedTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className={`p-1.5 rounded-lg border text-xs cursor-pointer truncate transition-transform hover:scale-105 ${
                        priorityColors[task.priority]
                      }`}
                      title={`${task.title} (${task.boardTitle})`}
                    >
                      <div className="font-medium truncate">{task.title}</div>
                      <div className="text-[9px] opacity-75 truncate">{task.columnTitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
