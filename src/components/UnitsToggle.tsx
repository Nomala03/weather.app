import type { Units } from '../types'

type Props = { units: Units; onToggle: (u: Units) => void }

export default function UnitsToggle({ units, onToggle }: Props) {
  return (
    <div className="inline-flex gap-1 rounded-2xl p-1">
      <button
        className={`toggle ${units === 'metric' ? 'bg-white shadow dark:bg-slate-900' : ''}`}
        onClick={() => onToggle('metric')}
        aria-pressed={units === 'metric'}
      >
        °C
      </button>
      <button
        className={`toggle ${units === 'imperial' ? 'bg-white shadow dark:bg-slate-900' : ''}`}
        onClick={() => onToggle('imperial')}
        aria-pressed={units === 'imperial'}
      >
        °F
      </button>
    </div>
  )
}
