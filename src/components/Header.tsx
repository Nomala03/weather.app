import UnitsToggle from './UnitsToggle'
import ThemeToggle from './ThemeToggle'
import AlertBell from './AlertBell'
import type { Geo, Units } from '../types'

export default function Header({ units, onUnits, onLocate, onSearch, onView, view, data, geo }: {
  units: Units,
  onUnits: (u: Units)=>void,
  onLocate: ()=>void,
  onSearch: ()=>void,
  onView: (v: 'hourly'|'daily')=>void,
  view: 'hourly'|'daily',
  data: any,
  geo?: Geo
}) {
  return (
    <header className="container py-4 flex items-center gap-3 flex-wrap">
      <h1 className="text-2xl font-bold">☀️ Weather{geo ? `- ${geo.name}${geo.country ? `, ${geo.country}` : ''}` : ''}</h1>
      <div className="flex-1" />
      <nav className="flex items-center gap-2">
        <button className="btn" onClick={onLocate} title="Use my location">📍</button>
        <button className="btn" onClick={onSearch} title="Search city">🔎</button>
        <div className="hidden sm:block"><UnitsToggle units={units} onToggle={onUnits} /></div>
        <div className="hidden sm:block"><ThemeToggle /></div>
        <AlertBell data={data} />
      </nav>
      <div className="w-full flex items-center gap-2 mt-2">
        <button onClick={()=>onView('hourly')} className={`toggle ${view==='hourly'?'bg-sky-500 text-white':''}`}>Hourly</button>
        <button onClick={()=>onView('daily')} className={`toggle ${view==='daily'?'bg-sky-500 text-white':''}`}>Daily</button>
        <div className="sm:hidden ml-auto flex items-center gap-2"><UnitsToggle units={units} onToggle={onUnits} /><ThemeToggle /></div>
      </div>
    </header>
  )
}