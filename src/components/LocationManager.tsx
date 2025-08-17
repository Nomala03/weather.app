import { storage } from '../services/storage'
import type { Geo } from '../types'

export default function LocationManager({
  current,
  onPick,
}: {
  current?: Geo
  onPick: (g: Geo) => void
}) {
  const list = storage.getLocations()
  return (
    <div className="card w-full rounded-b-2xl bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white shadow-md md:max-w-[500px]">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">Saved Locations</h3>
        <button
          className="rounded-xl p-1 text-sm"
          onClick={() => {
            if (!current) return
            storage.upsertLocation(current)
            alert('Saved current location')
          }}
        >
          Save current
        </button>
      </div>
      {list.length === 0 ? (
        <p className="opacity-70">No saved locations yet.</p>
      ) : (
        <ul className="xs:grid-cols-1 flex grid gap-2 px-2 py-2 sm:grid-cols-2 md:grid-cols-3">
          {list.map((g) => (
            <li
              key={`${g.latitude},${g.longitude}`}
              className="bg-opacity-20 flex items-center justify-between gap-2 rounded-xl bg-white/20 py-6 backdrop-blur-md"
            >
              <button className="text-left" onClick={() => onPick(g)}>
                {g.name}
                {g.country ? `, ${g.country}` : ''}
              </button>
              <button
                className="px-2 text-xs opacity-70 hover:opacity-100"
                onClick={() => {
                  storage.removeLocation(g.latitude, g.longitude)
                  location.reload()
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
