import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ mobile: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    const session = localStorage.getItem('smartreach_session')
    if (session) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const users = JSON.parse(localStorage.getItem('smartreach_users') || '[]')

    if (users.length === 0) {
      setError('No registered users found. Please register first.')
      return
    }

    // Find user by mobile (whitespace-insensitive) and password
    const match = users.find(
      (u) =>
        u.mobile.replace(/\s+/g, '') === form.mobile.replace(/\s+/g, '') &&
        u.password === form.password
    )

    if (!match) {
      setError('Mobile number or password is incorrect.')
      return
    }

    // Store the mobile as the active session identifier
    localStorage.setItem('smartreach_session', match.mobile)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-10 shadow-soft lg:max-w-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100 ring-1 ring-indigo-500/15">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              SmartReach Login
            </div>
            <h1 className="text-4xl font-semibold text-white">Sign in to your account</h1>
            <p className="max-w-xl text-slate-400">Access your SmartReach dashboard, manage status updates, and stay connected with your contacts.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-slate-200">
                Mobile number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
              />
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500" />
                Remember me
              </label>
              <a href="#" className="font-medium text-indigo-400 transition hover:text-indigo-300">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="w-full rounded-3xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
              Continue
            </button>
          </form>

          <div className="rounded-3xl bg-slate-950/70 p-5 text-sm text-slate-400 ring-1 ring-white/5">
            <p className="text-slate-300">New to SmartReach?</p>
            <p className="mt-2">
              <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Go to register page.
              </Link>
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-soft ring-1 ring-white/5 lg:flex-1">
          <div className="grid gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Why SmartReach</p>
              <h2 className="text-3xl font-semibold text-white">A professional status platform for real-time availability.</h2>
              <p className="text-slate-400">Keep your contacts informed, avoid missed calls, and share privacy-safe presence updates with the people who matter.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Privacy first</p>
                <p className="mt-2 text-slate-400">Control who sees your status and how long it stays visible.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">AI support</p>
                <p className="mt-2 text-slate-400">Generate clear availability messages in one click.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Fast search</p>
                <p className="mt-2 text-slate-400">Search users by mobile even when their status is private.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Live alerts</p>
                <p className="mt-2 text-slate-400">Get notified instantly when favorite contacts become available.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 ring-1 ring-white/5">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Quick preview</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl bg-slate-900/95 p-4">
                  <p className="text-sm text-slate-400">Current Status</p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">Busy</p>
                      <p className="text-sm text-slate-500">In a meeting with the team</p>
                    </div>
                    <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-300">Busy</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/95 p-4">
                  <p className="text-sm text-slate-400">Privacy</p>
                  <p className="mt-3 text-sm text-slate-300">Only contacts can see your status.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Back to <Link to="/" className="font-semibold text-indigo-400 hover:text-indigo-300">SmartReach home</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
