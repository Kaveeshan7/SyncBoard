import { useState } from 'react';
import { User } from '../types';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (updated: Partial<User>) => void;
}

export default function SettingsView({ user, onUpdateUser }: SettingsViewProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  // Workspace simulation settings
  const [conflictDetection, setConflictDetection] = useState(true);
  const [offlinePersistence, setOfflinePersistence] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings & Preferences</h1>
        <p className="text-slate-400 text-sm mt-1">
          Configure your personal profile, workspace synchronization, and notification rules.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'text-violet-400 border-violet-500'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          Personal Profile
        </button>
        <button
          onClick={() => setActiveTab('workspace')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'workspace'
              ? 'text-violet-400 border-violet-500'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          Workspace & Sync
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === 'security'
              ? 'text-violet-400 border-violet-500'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          Security & API
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-900/50">
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{name}</h3>
              <p className="text-xs text-slate-400">Team Member & Developer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold text-sm rounded-xl hover:from-violet-400 hover:to-indigo-500 shadow-md shadow-indigo-900/50 transition-all"
            >
              Save Profile
            </button>
            {saved && (
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                ✓ Profile saved successfully!
              </span>
            )}
          </div>
        </form>
      )}

      {activeTab === 'workspace' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6 max-w-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div>
                <h4 className="text-sm font-bold text-white">Concurrent Edit Conflict Detection</h4>
                <p className="text-xs text-slate-400">
                  Detect conflicting edits on tasks and alert users rather than overwriting.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setConflictDetection(!conflictDetection)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  conflictDetection ? 'bg-violet-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    conflictDetection ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div>
                <h4 className="text-sm font-bold text-white">Client-side Offline Persistence</h4>
                <p className="text-xs text-slate-400">
                  Cache in-progress board changes in localStorage for offline resiliency.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOfflinePersistence(!offlinePersistence)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  offlinePersistence ? 'bg-violet-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    offlinePersistence ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div>
                <h4 className="text-sm font-bold text-white">Email Digest & Task Alerts</h4>
                <p className="text-xs text-slate-400">
                  Receive summary notifications when tasks are assigned or moved to Done.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  emailAlerts ? 'bg-violet-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    emailAlerts ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white">JWT Authorization Token</h4>
              <p className="text-xs text-slate-400 mt-1">
                Your client auth token for future REST API endpoints.
              </p>
              <div className="mt-3 p-3 bg-[#05050a] border border-white/10 rounded-xl font-mono text-xs text-slate-300 break-all select-all">
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiS2F2ZWVzaGFuIiwiaWF0IjoxNzA0MDAwMDAwfQ.simulated_jwt_signature
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold text-white">Session Information</h4>
              <div className="grid grid-cols-2 gap-4 mt-3 text-xs text-slate-300">
                <div className="p-3 bg-white/5 rounded-xl">
                  <span className="text-slate-500 block">Logged in as</span>
                  <span className="font-semibold text-white">{user.email}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl">
                  <span className="text-slate-500 block">Workspace Role</span>
                  <span className="font-semibold text-violet-400">Admin / Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
