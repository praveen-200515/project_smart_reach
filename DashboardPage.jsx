import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sampleUsers = [
  {
    name: 'Rahul Kumar',
    mobile: '+91 9876543210',
    status: 'Busy',
    condition: 'In a meeting with the team',
    availableAfter: '04:30 PM',
    lastUpdated: '2 mins ago',
    privacy: 'Contacts only',
    busyReason: 'Team standup and planning call.',
  },
  {
    name: 'Priya Sharma',
    mobile: '+91 9123456780',
    status: 'Available',
    condition: 'Open for calls',
    availableAfter: 'Now',
    lastUpdated: 'Just now',
    privacy: 'Public',
    busyReason: '',
  },
  {
    name: 'Arun Prakash',
    mobile: '+91 9988776655',
    status: 'Driving',
    condition: 'Driving, call later',
    availableAfter: '05:00 PM',
    lastUpdated: '10 mins ago',
    privacy: 'Selected contacts',
    busyReason: '',
  },
]

// ─── helpers ────────────────────────────────────────────────────────────────

/** Return the full users array from localStorage. */
function getUsers() {
  return JSON.parse(localStorage.getItem('smartreach_users') || '[]')
}

/** Persist an updated users array. */
function saveUsers(users) {
  localStorage.setItem('smartreach_users', JSON.stringify(users))
}

/** Find the currently logged-in user object, or null. */
function getCurrentUser() {
  const session = localStorage.getItem('smartreach_session')
  if (!session) return null
  const users = getUsers()
  return users.find((u) => u.mobile === session) || null
}

/** Update a single field on the logged-in user and persist. */
function patchCurrentUser(patch) {
  const session = localStorage.getItem('smartreach_session')
  if (!session) return
  const users = getUsers()
  const idx = users.findIndex((u) => u.mobile === session)
  if (idx === -1) return
  users[idx] = { ...users[idx], ...patch }
  saveUsers(users)
}

// ─── component ───────────────────────────────────────────────────────────────

function DashboardPage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('Search a number to view availability.')
  const [status, setStatus] = useState('Available')
  const [condition, setCondition] = useState('Open for calls')
  const [availableAfter, setAvailableAfter] = useState('')
  const [busyReason, setBusyReason] = useState('')

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      navigate('/login', { replace: true })
      return
    }
    setCurrentUser(user)
    setStatus(user.status || 'Available')
    setCondition(user.condition || 'Open for calls')
    setAvailableAfter(user.availableAfter || '')
    setBusyReason(user.busyReason || '')
  }, [navigate])

  // ── status toggle ──────────────────────────────────────────────────────────

  const toggleStatus = () => {
    const nextStatus = status === 'Available' ? 'Busy' : 'Available'
    const nextCondition = nextStatus === 'Available' ? 'Open for calls' : 'Busy'
    const nextAvailableAfter = nextStatus === 'Available' ? (availableAfter || 'Now') : availableAfter
    const nextBusyReason = nextStatus === 'Available' ? '' : busyReason

    setStatus(nextStatus)
    setCondition(nextCondition)
    setAvailableAfter(nextAvailableAfter)
    setBusyReason(nextBusyReason)

    patchCurrentUser({
      status: nextStatus,
      condition: nextCondition,
      availableAfter: nextAvailableAfter,
      busyReason: nextBusyReason,
    })
  }

  const handleAvailableAfterChange = (event) => {
    const value = event.target.value
    setAvailableAfter(value)
    patchCurrentUser({ availableAfter: value })
  }

  const handleBusyReasonChange = (event) => {
    const value = event.target.value
    setBusyReason(value)
    patchCurrentUser({ busyReason: value })
  }

  // ── logout ─────────────────────────────────────────────────────────────────
  // Only clears the session — all users' data stays intact in smartreach_users

  const handleLogout = () => {
    localStorage.removeItem('smartreach_session')
    navigate('/login', { replace: true })
  }

  // ── search ─────────────────────────────────────────────────────────────────

  const handleSearch = (event) => {
    event.preventDefault()
    const searchValue = query.trim().replace(/\s+/g, '')
    if (!searchValue) {
      setResult(null)
      setMessage('Enter a mobile number to search for availability.')
      return
    }

    // Build unified pool: sample users + ALL registered users from localStorage
    const registeredUsers = getUsers()
    const allUsers = [...sampleUsers]

    registeredUsers.forEach((u) => {
      const alreadyIn = allUsers.some(
        (x) => x.mobile.replace(/\s+/g, '') === u.mobile.replace(/\s+/g, '')
      )
      if (!alreadyIn) {
        allUsers.push({
          name: u.name,
          mobile: u.mobile,
          status: u.status || 'Available',
          condition: u.condition || 'Open for calls',
          availableAfter: u.availableAfter || 'Now',
          lastUpdated: 'Just now',
          privacy: 'Public',
          busyReason: u.busyReason || '',
          about: u.about || '',
        })
      }
    })

    const found = allUsers.find(
      (u) => u.mobile.replace(/\s+/g, '') === searchValue
    )

    if (!found) {
      setResult(null)
      setMessage('No SmartReach profile found for this number. Please try a different mobile number.')
      return
    }
    setResult({ ...found })
    setMessage('')
  }

  // ── quick-pick buttons ─────────────────────────────────────────────────────

  const quickUsers = useMemo(() => {
    // Start with sample users (their own isolated data)
    const list = sampleUsers.map((u) => ({ ...u }))

    // Add all registered users that aren't already in sample list
    getUsers().forEach((u) => {
      const alreadyIn = list.some(
        (x) => x.mobile.replace(/\s+/g, '') === u.mobile.replace(/\s+/g, '')
      )
      if (!alreadyIn) {
        const isCurrentUser = u.mobile === localStorage.getItem('smartreach_session')
        list.push({
          name: u.name + (isCurrentUser ? ' (You)' : ''),
          mobile: u.mobile,
          status: u.status || 'Available',
          condition: u.condition || 'Open for calls',
          availableAfter: u.availableAfter || 'Now',
          lastUpdated: 'Just now',
          privacy: 'Public',
          busyReason: u.busyReason || '',
          about: u.about || '',
        })
      }
    })

    return list
  // Recalculate whenever status changes so "(You)" button reflects live status
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, busyReason, condition, availableAfter])

  // ── status card ────────────────────────────────────────────────────────────

  const statusCard = useMemo(() => {
    if (!currentUser) return null
    return (
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Your status</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{condition}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${status === 'Available' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
              {status}
            </span>
            <button
              type="button"
              onClick={toggleStatus}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Toggle status
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
            <p className="text-sm text-slate-400">Name</p>
            <p className="mt-2 text-lg font-semibold text-white">{currentUser.name}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
            <p className="text-sm text-slate-400">Mobile</p>
            <p className="mt-2 text-lg font-semibold text-white">{currentUser.mobile}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
            <p className="text-sm text-slate-400">About</p>
            <p className="mt-3 text-slate-300">{currentUser.about || 'SmartReach user sharing availability.'}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
            <label htmlFor="availableAfter" className="text-sm text-slate-400">Available after</label>
            <input
              id="availableAfter"
              type="text"
              value={availableAfter}
              onChange={handleAvailableAfterChange}
              placeholder="Type a time or leave blank"
              className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
            />
            <p className="mt-3 text-sm text-slate-400">{availableAfter ? availableAfter : 'Unknown'}</p>
          </div>
        </div>

        {status === 'Busy' && (
          <div className="mt-6 rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
            <label htmlFor="busyReason" className="text-sm text-slate-400">Busy reason</label>
            <textarea
              id="busyReason"
              value={busyReason}
              onChange={handleBusyReasonChange}
              rows="4"
              placeholder="Type the reason for being busy"
              className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
            />
            <p className="mt-3 text-sm text-slate-400">{busyReason ? busyReason : 'Reason not specified.'}</p>
          </div>
        )}
      </div>
    )
  }, [currentUser, status, condition, availableAfter, busyReason])

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">SmartReach Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Search a mobile number and see live availability.</h1>
            <p className="mt-4 max-w-2xl text-slate-400">Search SmartReach contacts and understand whether they are available, busy, driving, or in a meeting.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5 text-slate-300 flex flex-col gap-4">
            <div>
              <p className="text-sm text-slate-400">Logged in as</p>
              <p className="mt-2 text-lg font-semibold text-white">{currentUser?.name || 'Loading...'}</p>
              <p className="text-sm text-slate-500">{currentUser?.mobile}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.55fr]">
          <section className="space-y-8">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/5">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Phone search</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Find availability by mobile number.</h2>
                </div>
                <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/5">
                  Search by exact mobile number to see the current status and work condition.
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-3xl bg-slate-950/90 p-4 ring-1 ring-white/5 text-slate-300">
                  <p className="text-sm text-slate-400">Availability</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${status === 'Available' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {status}
                    </span>
                    <button
                      type="button"
                      onClick={toggleStatus}
                      className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                    >
                      Toggle status
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSearch} className="grid w-full gap-4 sm:grid-cols-[1fr_auto]">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="text"
                    placeholder="Enter mobile number, e.g. +91 9876543210"
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-5 py-4 text-sm text-slate-100 outline-none ring-1 ring-slate-800 transition focus:border-indigo-500 focus:ring-indigo-500/30"
                  />
                  <button type="submit" className="rounded-3xl bg-indigo-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400">
                    Search
                  </button>
                </form>
              </div>

              <p className="mt-4 text-sm text-slate-400">Tip: Use the buttons below to quickly view a contact's availability.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {quickUsers.map((user) => (
                  <button
                    key={user.mobile}
                    type="button"
                    onClick={() => {
                      setQuery(user.mobile)
                      setResult({ ...user })
                      setMessage('')
                    }}
                    className="rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-500 hover:text-white"
                  >
                    {user.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/5">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Search result</p>
              <div className="mt-6 min-h-[220px] rounded-[2rem] bg-slate-950/90 p-8 ring-1 ring-white/5">
                {result ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-400">{result.name}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{result.mobile}</h3>
                      </div>
                      <span className={`rounded-full px-4 py-2 text-sm font-semibold ${result.status === 'Available' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                        {result.status}
                      </span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl bg-slate-900/95 p-4">
                        <p className="text-sm text-slate-400">Condition</p>
                        <p className="mt-2 text-base font-semibold text-white">{result.condition}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/95 p-4">
                        <p className="text-sm text-slate-400">Available after</p>
                        <p className="mt-2 text-base font-semibold text-white">{result.availableAfter}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/95 p-4">
                        <p className="text-sm text-slate-400">Last updated</p>
                        <p className="mt-2 text-base font-semibold text-white">{result.lastUpdated}</p>
                      </div>
                    </div>
                    {result.busyReason ? (
                      <div className="rounded-3xl bg-slate-900/95 p-4">
                        <p className="text-sm text-slate-400">Busy reason</p>
                        <p className="mt-2 text-base font-semibold text-white">{result.busyReason}</p>
                      </div>
                    ) : null}
                    <div className="rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-300 ring-1 ring-white/5">
                      <p className="font-semibold text-white">Privacy</p>
                      <p className="mt-2">{result.privacy}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-center text-sm text-slate-400">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-8">
            {statusCard}
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-soft ring-1 ring-white/5">
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Work condition</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Understand availability at a glance.</h2>
              <p className="mt-4 text-slate-400">SmartReach lets you see whether someone is available, busy, driving, or studying before you call.</p>

              <div className="mt-8 grid gap-4">
                {quickUsers.map((user) => (
                  <div key={user.mobile} className="rounded-3xl bg-slate-950/90 p-5 ring-1 ring-white/5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold text-white">{user.name}</p>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">{user.status}</span>
                    </div>
                    <p className="mt-2 text-slate-400">{user.condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
