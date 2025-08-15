import { storage } from '../services/storage'
import type { Geo } from '../types'

export default function LocationManager({ current, onPick }: { current?: Geo; onPick: (g: Geo) => void }) {
  const list = storage.getLocations()
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Saved Locations</h3>
        <button className="btn text-sm" onClick={() => {
          if (!current) return
          storage.upsertLocation(current)
          alert('Saved current location')
        }}>Save current</button>
      </div>
      {list.length === 0 ? (
        <p className="opacity-70">No saved locations yet.</p>
      ) : (
        <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {list.map(g => (
            <li key={`${g.latitude},${g.longitude}`} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
              <button className="text-left" onClick={() => onPick(g)}>{g.name}{g.country?`, ${g.country}`:''}</button>
              <button className="text-xs opacity-70 hover:opacity-100" onClick={() => { storage.removeLocation(g.latitude, g.longitude); location.reload() }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}