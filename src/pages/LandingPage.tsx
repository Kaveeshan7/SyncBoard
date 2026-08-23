import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Real-Time Sync',
    description:
      'Every card move, edit, and comment appears instantly across your whole team — no refresh needed.',
    icon: (
      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    ),
  },
  {
    title: 'Kanban Boards',
    description:
      'Organize work into columns like To Do, In Progress and Done. Drag, drop, and stay in flow.',
    icon: <path d="M3 3h7v18H3zM14 3h7v10h-7z" />,
  },
  {
    title: 'Conflict Detection',
    description:
      'SyncBoard flags conflicting edits instead of silently overwriting your teammates’ work.',
    icon: (
      <>
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </>
    ),
  },
  {
    title: 'Secure Auth',
    description:
      'Protected routes and token-based authentication keep every board private to your team.',
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </>
    ),
  },
  {
    title: 'Works Offline',
    description:
      'Local persistence keeps your in-progress work available even after a refresh or dropped connection.',
    icon: (
      <>
        <path d="M2 12.5a9 9 0 0118 0" />
        <path d="M5 12.5a6 6 0 0112 0" />
        <circle cx="12" cy="18" r="1" />
      </>
    ),
  },
  {
    title: 'Built for Teams',
    description:
      'Invite teammates, assign tasks, and see who is working on what at a single glance.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </>
    ),
  },
];

const steps = [
  {
    number: '01',
    title: 'Create a board',
    description: 'Spin up a board for your project or sprint in seconds.',
  },
  {
    number: '02',
    title: 'Add your tasks',
    description: 'Break work down into cards, set priorities, tags and due dates.',
  },
  {
    number: '03',
    title: 'Sync in real time',
    description: 'Invite your team and watch updates land live, for everyone.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-slate-200 selection:bg-violet-500/30 overflow-x-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-3xl" />
      </div>

      {/* Nav */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M10 4v4" />
                  <path d="M2 8h20" />
                  <path d="M6 4v4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">SyncBoard</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How it works
              </a>
              <a href="#team" className="hover:text-white transition-colors">
                Team
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 rounded-lg shadow-lg shadow-indigo-900/40 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-slate-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live collaboration, built for small teams
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto">
          Plan, track and ship work{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            together, in sync
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          SyncBoard is a real-time Kanban board for teams who want simple task management
          without losing track of who changed what. Create boards, move cards, and stay
          perfectly in sync.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/50 hover:from-violet-400 hover:to-indigo-500 transition-all"
          >
            Start for free
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 font-semibold hover:bg-white/10 transition-all"
          >
            Sign in
          </Link>
        </div>

        {/* Preview mock board */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-rose-400/70" />
              <span className="w-3 h-3 rounded-full bg-amber-400/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs text-slate-500">syncboard.app/dashboard</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                { title: 'To Do', color: 'from-slate-400 to-slate-500', tasks: ['Design wireframes', 'Set up repo'] },
                {
                  title: 'In Progress',
                  color: 'from-amber-400 to-orange-500',
                  tasks: ['Build auth flow', 'Kanban board UI'],
                },
                { title: 'Done', color: 'from-emerald-400 to-green-500', tasks: ['Project planning'] },
              ].map((col) => (
                <div key={col.title} className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${col.color}`} />
                    <span className="text-sm font-semibold text-slate-200">{col.title}</span>
                  </div>
                  <div className="space-y-2">
                    {col.tasks.map((t) => (
                      <div
                        key={t}
                        className="rounded-lg bg-[#0b0b14] border border-white/10 px-3 py-2.5 text-sm text-slate-300"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '2', label: 'Team Members' },
            { value: '4', label: 'Board Columns' },
            { value: '100%', label: 'Real-Time Sync' },
            { value: '24/7', label: 'Availability' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Everything your team needs</h2>
          <p className="mt-4 text-slate-400">
            A focused feature set that keeps your board fast, simple, and always up to date.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-violet-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-violet-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Up and running in minutes</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold bg-gradient-to-br from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">The Team</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">Built by</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { name: 'Kaveeshan', role: 'Full-Stack Developer', seed: 'Kaveeshan' },
            { name: 'Minaga', role: 'Full-Stack Developer', seed: 'Minaga' },
          ].map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center hover:bg-white/[0.06] transition-all"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to sync your team?</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Create your first board in seconds and invite your teammates to collaborate live.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/50 hover:from-violet-400 hover:to-indigo-500 transition-all"
            >
              Create free account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M10 4v4" />
                <path d="M2 8h20" />
                <path d="M6 4v4" />
              </svg>
            </div>
            <span className="text-sm text-slate-400">© {new Date().getFullYear()} SyncBoard. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#features" className="hover:text-slate-300 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-300 transition-colors">
              How it works
            </a>
            <a href="#team" className="hover:text-slate-300 transition-colors">
              Team
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
