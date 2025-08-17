import { useState } from 'react'
import { Menu } from 'lucide-react'
import UnitsToggle from './UnitsToggle'
import ThemeToggle from './ThemeToggle'
import AlertBell from './AlertBell'
import type { Geo, Units } from '../types'

export default function Header({
  units,
  onUnits,
  onLocate,
  onSearch,
  onView,
  view,
  data,
  geo,
}: {
  units: Units
  onUnits: (u: Units) => void
  onLocate: () => void
  onSearch: () => void
  onView: (v: 'hourly' | 'daily') => void
  view: 'hourly' | 'daily'
  data: any
  geo?: Geo
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-50 h-full w-full items-center p-4 py-2 drop-shadow-lg md:px-4 md:py-6 lg:h-auto">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <h1 className="truncate text-xl font-bold md:text-2xl">
          ☀️ Weather
          {geo ? ` - ${geo.name}${geo.country ? `, ${geo.country}` : ''}` : ''}
        </h1>

        <div className="relative">
          {/* Hamburger menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg bg-white/20 p-2 transition hover:bg-white/30"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Search + Location Bar */}
      <div className="mx-auto mt-4 flex w-full max-w-2xl items-center overflow-hidden rounded-full bg-white/20 shadow-md">
        <button
          onClick={onLocate}
          className="rounded-l-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition hover:bg-white/30 sm:px-4 sm:text-base"
          title="Use my location"
        >
          📍 Location
        </button>
        <input
          type="text"
          placeholder="Search city..."
          className="sm:px- min-w-0 flex-1 bg-transparent px-2 text-white placeholder-gray-200 sm:text-base"
        />
        <button
          onClick={onSearch}
          className="rounded-r-full bg-blue-600 px-6 py-3 font-semibold whitespace-nowrap transition hover:bg-blue-700 sm:px-6"
          title="Search city"
        >
          🔎 Search
        </button>
      </div>

      {/* Hourly / Daily Toggle */}
      <div className="mt-3 flex justify-center gap-3">
        <button
          onClick={() => onView('hourly')}
          className={`rounded-full px-4 py-2 font-medium transition ${
            view === 'hourly' ? 'bg-sky-500 text-white' : 'bg-white/20'
          }`}
        >
          Hourly
        </button>
        <button
          onClick={() => onView('daily')}
          className={`rounded-full px-4 py-2 font-medium transition ${
            view === 'daily' ? 'bg-sky-500 text-white' : 'bg-white/20'
          }`}
        >
          Daily
        </button>
      </div>

      {/* Dropdown menu for Theme + Units */}
      {menuOpen && (
        <div className="absolute top-21 right-0 z-50 w-70 space-y-3 rounded-lg bg-white/95 p-4 text-gray-800 shadow-lg dark:bg-slate-300">
          <div className="flex items-center justify-between gap-5">
            <span className="text-sm font-medium">Theme</span>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Units</span>
            <button
              onClick={() => {
                setMenuOpen(false)
                onUnits(units === 'metric' ? 'imperial' : 'metric')
              }}
            >
              <UnitsToggle units={units} onToggle={onUnits} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium"> Notifications</span>
            <button>
              <AlertBell data={data} />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
