import { useEffect, useMemo, useState } from 'react'
import { geocode } from '../services/geocode'
import type { Geo } from '../types'

export default function SearchBar({ onPick }: { onPick: (g: Geo) => void }) {
  const [q, setQ] = useState('')
  const [list, setList] = useState<Geo[]>([])
  const [loading, setLoading] = useState(false)

  // debounce
  const debounced = useMemo(() => {
    let t: any
    return (val: string) => {
      clearTimeout(t)
      t = setTimeout(async () => {
        if (!val) return setList([])
        setLoading(true)
        try {
          setList(await geocode(val))
        } finally {
          setLoading(false)
        }
      }, 300)
    }
  }, [])

  useEffect(() => debounced(q), [q, debounced])

  return (
    <div className="w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search city..."
        className="input"
      />
      {loading && <div className="mt-1 text-sm opacity-70">Searching...</div>}
      {!!list.length && (
        <ul className="mt-2 max-h-60 overflow-auto rounded-xl border border-slate-200 dark:border-slate-400">
          {list.map((g) => (
            <li key={`${g.latitude},${g.longitude}`}>
              <button
                className="w-full px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => {
                  onPick(g)
                  setQ('')
                  setList([])
                }}
              >
                {g.name}
                {g.country ? `, ${g.country}` : ''}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
