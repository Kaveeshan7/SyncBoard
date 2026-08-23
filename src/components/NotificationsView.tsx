import { useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'assignment' | 'comment' | 'system' | 'conflict';
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Task Assigned',
    message: 'Minaga assigned "Build authentication system" to you.',
    time: '15 mins ago',
    unread: true,
    type: 'assignment',
  },
  {
    id: 'n-[#]',
    title: 'Milestone 01 Notice',
    message: 'Static Front-End Skeleton submission ready for Assignment 01.',
    time: '1 hour ago',
    unread: true,
    type: 'system',
  },
  {
    id: 'n-3',
    title: 'Conflict Detection Active',
    message: 'SyncBoard concurrent edit detection is enabled for your workspace.',
    time: '3 hours ago',
    unread: false,
    type: 'conflict',
  },
  {
    id: 'n-4',
    title: 'New Board Created',
    message: 'Kaveeshan created board "SyncBoard Project".',
    time: 'Yesterday',
    unread: false,
    type: 'system',
  },
];

export default function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filterUnread, setFilterUnread] = useState(false);

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const filtered = filterUnread ? notifications.filter((n) => n.unread) : notifications;
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Stay updated with task assignments, board updates, and system notices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              filterUnread
                ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {filterUnread ? 'Showing Unread' : 'Filter Unread'}
          </button>
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleRead(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                item.unread
                  ? 'bg-violet-500/5 border-violet-500/20'
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.type === 'assignment'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : item.type === 'conflict'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                  }`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-violet-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{item.message}</p>
                  <span className="text-[10px] text-slate-500 mt-2 block">{item.time}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRead(item.id);
                }}
                className="text-xs text-slate-500 hover:text-slate-300 p-1"
              >
                {item.unread ? 'Mark read' : 'Unread'}
              </button>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-2xl">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <p className="text-slate-400 text-sm font-medium">No notifications to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
