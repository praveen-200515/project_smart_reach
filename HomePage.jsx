import { Link } from 'react-router-dom'

const stats = [
  { label: 'Active users', value: '1.2K+' },
  { label: 'Real-time updates', value: '99.9%' },
  { label: 'AI-assisted search', value: '24/7' },
]

const features = [
  {
    title: 'AI Status Generator',
    description: 'Create professional availability messages automatically for every context.',
  },
  {
    title: 'Live status updates',
    description: 'See who is available before making a call and avoid missed connections.',
  },
  {
    title: 'Smart privacy controls',
    description: 'Protect your profile while still sharing relevant availability with contacts.',
  },
  {
    title: 'Contact requests & favorites',
    description: 'Build trusted connections and get notified when key people become available.',
  },
]

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-black/20">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            SmartReach
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#platform" className="transition hover:text-white">Platform</a>
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#security" className="transition hover:text-white">Security</a>
          <Link to="/register" className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Register
          </Link>
          <Link to="/login" className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-400">
            Login
          </Link>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-10 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100 ring-1 ring-indigo-500/20">
                <span className="font-semibold">AI-Powered Availability</span>
                <span className="text-slate-300">Reach people at the right time</span>
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  SmartReach helps you know when someone is free before you call.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Reduce missed calls, improve communication, and protect privacy with real-time status, AI-powered messages, and instant availability insights.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
                  Register now
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white">
                  Login
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-soft">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-soft ring-1 ring-white/5">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/20 to-transparent" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/95 p-5 ring-1 ring-white/5">
                  <div>
                    <p className="text-sm text-indigo-300">Welcome back, Praveen!</p>
                    <p className="text-lg font-semibold text-white">Your current status</p>
                  </div>
                  <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-slate-950">Available</span>
                </div>

                <div className="rounded-[2rem] bg-slate-800/90 p-5 text-slate-100">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Status summary</p>
                  <h2 className="mt-3 text-2xl font-semibold">Working on a college project.</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-300">SmartReach automatically updates your availability, so contacts know when they can call.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-950/80 p-4 text-sm ring-1 ring-white/5">
                      <p className="text-slate-400">Available after</p>
                      <p className="mt-2 text-lg font-semibold text-white">06:00 PM</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/80 p-4 text-sm ring-1 ring-white/5">
                      <p className="text-slate-400">Last updated</p>
                      <p className="mt-2 text-lg font-semibold text-white">5 mins ago</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                    <p className="text-sm text-slate-400">Contacts</p>
                    <p className="mt-3 text-xl font-semibold text-white">36</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                    <p className="text-sm text-slate-400">Notifications</p>
                    <p className="mt-3 text-xl font-semibold text-white">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="border-t border-slate-800 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Platform</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A professional status platform built for modern communication.</h2>
              <p className="mt-4 text-base leading-8 text-slate-400">Designed for calls, status updates, privacy rules, and AI-powered assistant support across web and mobile browsers.</p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft">
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-4 text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-slate-950/95 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Features</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Everything you need for secure availability management.</h2>
                <p className="mt-4 text-base leading-8 text-slate-400">SmartReach combines status controls, privacy, search, contacts, notifications, and AI to deliver a polished experience.</p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/5">
                    <p className="text-sm font-semibold text-white">Status control</p>
                    <p className="mt-3 text-slate-400">Update availability, choose a custom message, and set expiry for long meetings.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/5">
                    <p className="text-sm font-semibold text-white">Search & privacy</p>
                    <p className="mt-3 text-slate-400">Search by mobile number, respect privacy settings, and manage who can view your status.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/5">
                    <p className="text-sm font-semibold text-white">Contacts & favorites</p>
                    <p className="mt-3 text-slate-400">Build your trusted network, accept contact requests, and mark favorites.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/5">
                    <p className="text-sm font-semibold text-white">Live notifications</p>
                    <p className="mt-3 text-slate-400">Get immediate alerts when contacts become available or status changes occur.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-soft">
                <div className="space-y-5">
                  <div className="rounded-3xl bg-slate-950/90 p-6 ring-1 ring-white/5">
                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">AI assistant</p>
                    <h3 className="mt-4 text-2xl font-semibold text-white">AI-powered insights that keep your day moving.</h3>
                    <p className="mt-3 text-slate-400">From status text generation to search recommendations, AI makes availability smarter.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/5">
                      <p className="text-sm font-semibold text-white">Assistant search</p>
                      <p className="mt-2 text-slate-400">Find contacts using natural phrases like "Project team" or "College friend".</p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/5">
                      <p className="text-sm font-semibold text-white">Notification summary</p>
                      <p className="mt-2 text-slate-400">Receive a single concise update even when multiple alerts happen at once.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_0.75fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Security</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Built with privacy-first controls and secure authentication.</h2>
                <p className="mt-4 text-base leading-8 text-slate-400">JWT sign-in, encrypted passwords, role-based access, and strong input validation keep your data protected.</p>
              </div>
              <div className="space-y-4 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft">
                <div className="rounded-3xl bg-slate-950/90 p-6 ring-1 ring-white/5">
                  <p className="text-sm font-semibold text-white">Privacy settings</p>
                  <p className="mt-3 text-slate-400">Choose who can view your status and keep others from seeing sensitive updates.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-6 ring-1 ring-white/5">
                  <p className="text-sm font-semibold text-white">Real-time updates</p>
                  <p className="mt-3 text-slate-400">WebSocket notifications keep everyone synchronized instantly.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-6 ring-1 ring-white/5">
                  <p className="text-sm font-semibold text-white">AI awareness</p>
                  <p className="mt-3 text-slate-400">Smart recommendations and message generation without compromising user control.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
