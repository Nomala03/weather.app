import type { Units } from '../types'

type Props = { units: Units; onToggle: (u: Units) => void }

export default function UnitsToggle({ units, onToggle }: Props) {
  return (
    <div className="inline-flex rounded-2xl bg-slate-200 dark:bg-slate-700 p-1">
      <button
        className={`toggle ${units==='metric' ? 'bg-white dark:bg-slate-900 shadow' : ''}`}
        onClick={() => onToggle('metric')}
        aria-pressed={units==='metric'}
      >°C</button>
      <button
        className={`toggle ${units==='imperial' ? 'bg-white dark:bg-slate-900 shadow' : ''}`}
        onClick={() => onToggle('imperial')}
        aria-pressed={units==='imperial'}
      >°F</button>
    </div>
  )
}