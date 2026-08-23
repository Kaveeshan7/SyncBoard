import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Board from '../components/Board';
import CreateTaskModal from '../components/CreateTaskModal';
import CreateBoardModal from '../components/CreateBoardModal';
import TaskDetailModal from '../components/TaskDetailModal';
import DashboardOverview from '../components/DashboardOverview';
import CalendarView from '../components/CalendarView';
import TeamsView from '../components/TeamsView';
import AnalyticsView from '../components/AnalyticsView';
import NotificationsView from '../components/NotificationsView';
import SettingsView from '../components/SettingsView';
import UserProfileModal from '../components/UserProfileModal';

import { Board as BoardType, Task, User } from '../types';
import { mockBoard, mockUsers } from '../data/mockData';

type ViewMode =
  | 'dashboard'
  | 'boards'
  | 'calendar'
  | 'teams'
  | 'analytics'
  | 'notifications'
  | 'settings';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [boards, setBoards] = useState<BoardType[]>([mockBoard]);
  const [activeBoardId, setActiveBoardId] = useState<string>(mockBoard.id);
  const [activeView, setActiveView] = useState<ViewMode>('dashboard');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Search & sidebar
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeBoard = boards.find((b) => b.id === activeBoardId) || boards[0];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleAddTask = (_columnId: string) => {
    setIsCreateModalOpen(true);
  };

  const handleCreateBoard = (boardData: { title: string; columns: string[] }) => {
    const newBoard: BoardType = {
      id: `board-${Date.now()}`,
      title: boardData.title,
      columns: boardData.columns.map((title, index) => ({
        id: `col-${Date.now()}-${index}`,
        title,
        tasks: [],
      })),
    };

    setBoards((prev) => [...prev, newBoard]);
    setActiveBoardId(newBoard.id);
    setActiveView('boards');
  };

  const handleCreateTask = (taskData: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate?: string;
  }) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...taskData,
      assignee: user?.id,
      createdAt: new Date().toISOString(),
    };

    // Add task to the first column of active board
    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== activeBoardId) return b;
        return {
          ...b,
          columns: b.columns.map((col, index) =>
            index === 0 ? { ...col, tasks: [...col.tasks, newTask] } : col
          ),
        };
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setBoards((prev) =>
      prev.map((b) => {
        if (b.id !== activeBoardId) return b;
        return {
          ...b,
          columns: b.columns.map((col) => ({
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskId),
          })),
        };
      })
    );
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateUser = (updated: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updated };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Filter tasks based on search query
  const filteredBoard: BoardType = {
    ...activeBoard,
    columns: activeBoard.columns.map((col) => ({
      ...col,
      tasks: col.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    })),
  };

  if (!user) {
    return null;
  }

  // Sidebar navigation sections
  const mainNavItems = [
    {
      id: 'dashboard' as ViewMode,
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 'boards' as ViewMode,
      label: 'Boards',
      badge: boards.length > 1 ? `${boards.length}` : undefined,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M10 4v16M2 10h20" />
        </svg>
      ),
    },
    {
      id: 'calendar' as ViewMode,
      label: 'Calendar',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      id: 'teams' as ViewMode,
      label: 'Teams',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      id: 'analytics' as ViewMode,
      label: 'Analytics',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
    },
  ];

  const personalNavItems = [
    {
      id: 'notifications' as ViewMode,
      label: 'Notifications',
      badge: '2',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      ),
    },
    {
      id: 'settings' as ViewMode,
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#05050a] relative flex flex-col">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Header
          isAuthenticated
          user={user}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenNotifications={() => setActiveView('notifications')}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? 'w-64' : 'w-0'
            } bg-[#0b0b14] border-r border-white/10 transition-all overflow-hidden flex-shrink-0 flex flex-col justify-between`}
          >
            <div className="p-5 space-y-7 overflow-y-auto">
              {/* Workspace Header */}
              <div className="flex items-center justify-between px-2 pt-1">
                <div>
                  <h2 className="text-sm font-bold text-white tracking-wide">SyncBoard Client</h2>
                  <p className="text-[10px] text-violet-400 font-medium uppercase tracking-wider">
                    Collaborative Workspace
                  </p>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/10 text-violet-300 border border-violet-500/30 shadow-lg shadow-violet-950/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? 'text-violet-400' : 'text-slate-500'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-section: Boards List (if in Boards view or for quick switching) */}
              {activeView === 'boards' && (
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Active Boards
                    </h3>
                    <button
                      onClick={() => setIsCreateBoardOpen(true)}
                      className="text-xs text-violet-400 hover:text-violet-300 font-semibold"
                    >
                      + New
                    </button>
                  </div>
                  <div className="space-y-1">
                    {boards.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setActiveBoardId(b.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                          b.id === activeBoardId
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span className="truncate">{b.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Navigation Section */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">
                  Personal
                </h3>
                <div className="space-y-1">
                  {personalNavItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/10 text-violet-300 border border-violet-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? 'text-violet-400' : 'text-slate-500'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500 text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Profile Footer Card */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              <div
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-violet-300 transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileModalOpen(true);
                  }}
                  className="text-slate-500 hover:text-violet-400 p-1"
                  title="View Profile"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col overflow-hidden bg-[#05050a]">
            {/* Top Bar / Search / Actions */}
            <div className="bg-[#0b0b14] border-b border-white/10 px-6 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
                  title="Toggle Sidebar"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </button>

                {/* Search Bar */}
                <div className="relative hidden sm:block">
                  <svg
                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks, tags..."
                    className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-60 text-xs"
                  />
                </div>
              </div>

              {/* View Title & Main CTA */}
              <div className="flex items-center gap-3">
                {activeView === 'boards' && (
                  <button
                    onClick={() => setIsCreateBoardOpen(true)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold rounded-xl hover:bg-white/10 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    New Board
                  </button>
                )}

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-xs font-semibold rounded-xl hover:from-violet-400 hover:to-indigo-500 shadow-md shadow-indigo-900/50 transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                  New Task
                </button>
              </div>
            </div>

            {/* Dynamic View Rendering */}
            {activeView === 'dashboard' && (
              <DashboardOverview
                user={user}
                boards={boards}
                activeBoard={activeBoard}
                onSelectBoard={(id) => {
                  setActiveBoardId(id);
                  setActiveView('boards');
                }}
                onTaskClick={handleTaskClick}
                onNavigateView={(view) => setActiveView(view as ViewMode)}
              />
            )}

            {activeView === 'boards' && (
              <Board
                board={filteredBoard}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            )}

            {activeView === 'calendar' && (
              <CalendarView boards={boards} onTaskClick={handleTaskClick} />
            )}

            {activeView === 'teams' && (
              <TeamsView mockUsers={mockUsers} boards={boards} />
            )}

            {activeView === 'analytics' && <AnalyticsView boards={boards} />}

            {activeView === 'notifications' && <NotificationsView />}

            {activeView === 'settings' && (
              <SettingsView user={user} onUpdateUser={handleUpdateUser} />
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <CreateBoardModal
        isOpen={isCreateBoardOpen}
        onClose={() => setIsCreateBoardOpen(false)}
        onSubmit={handleCreateBoard}
      />
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />
      <TaskDetailModal
        task={selectedTask}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
        onDelete={handleDeleteTask}
      />
      <UserProfileModal
        user={user}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        boards={boards}
      />
    </div>
  );
}
