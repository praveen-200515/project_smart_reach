import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    password: '',
    about: '',
  })
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
    if (!form.name || !form.mobile || !form.password) {
      setError('All fields are required to register.')
      return
    }

    // Load existing users array
    const existing = JSON.parse(localStorage.getItem('smartreach_users') || '[]')

    // Check if this mobile is already registered
    const duplicate = existing.find(
      (u) => u.mobile.replace(/\s+/g, '') === form.mobile.replace(/\s+/g, '')
    )
    if (duplicate) {
      setError('This mobile number is already registered. Please login instead.')
      return
    }

    // Build the new user entry with default status data
    const newUser = {
      name: form.name,
      mobile: form.mobile,
      password: form.password,
      about: form.about,
      status: 'Available',
      condition: 'Open for calls',
      availableAfter: 'Now',
      busyReason: '',
    }

    // Save updated users array
    localStorage.setItem('smartreach_users', JSON.stringify([...existing, newUser]))

    // Start session for this user
    localStorage.setItem('smartreach_session', form.mobile)

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-10 shadow-soft lg:max-w-xl">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100 ring-1 ring-indigo-500/15">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              SmartReach Register
            </div>
            <h1 className="text-4xl font-semibold text-white">Create your SmartReach account</h1>
            <p className="max-w-xl text-slate-400">Register first to manage your availability status and let other users discover when you're free.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-200">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Praveen M"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
              />
            </div>

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
                placeholder="Create password"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
              />
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-semibold text-slate-200">
                About
              </label>
              <textarea
                id="about"
                name="about"
                value={form.about}
                onChange={handleChange}
                rows="3"
                placeholder="Full Stack Developer | Building cool projects"
                className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
              />
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button type="submit" className="w-full rounded-3xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">
              Register
            </button>
          </form>

          <div className="rounded-3xl bg-slate-950/70 p-5 text-sm text-slate-400 ring-1 ring-white/5">
            <p className="text-slate-300">Already registered?</p>
            <p className="mt-2">
              <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Go to login page.
              </Link>
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 shadow-soft ring-1 ring-white/5 lg:flex-1">
          <div className="grid gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Welcome to SmartReach</p>
              <h2 className="text-3xl font-semibold text-white">Register to share your availability and stay visible to your contacts.</h2>
              <p className="text-slate-400">Once registered, your contacts can search your number and see your current status, whether you're available, busy, or in a meeting.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Real-time status</p>
                <p className="mt-2 text-slate-400">Register now and start sharing live availability updates.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Contact discovery</p>
                <p className="mt-2 text-slate-400">Your number becomes searchable by other SmartReach users.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Secure signup</p>
                <p className="mt-2 text-slate-400">Secure local registration state to simulate the user journey.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                <p className="text-sm font-semibold text-white">Easy onboarding</p>
                <p className="mt-2 text-slate-400">Registered users are directed immediately to their dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
