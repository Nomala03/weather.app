import type { Forecast, Geo, Units } from '../types'

const LS_KEYS = {
  LOCATIONS: 'weather.locations',
  PREFS: 'weather.prefs',
  CACHE: 'weather.cache',
} as const

type Prefs = {
  units: Units
  theme: 'light' | 'dark' | 'system'
  selected?: string
  view: 'hourly' | 'daily'
}

type Cache = Record<string, Forecast> // key: `${lat},${lon},${units}`

export const storage = {
  getLocations(): Geo[] {
    return JSON.parse(localStorage.getItem(LS_KEYS.LOCATIONS) || '[]')
  },
  saveLocations(list: Geo[]) {
    localStorage.setItem(LS_KEYS.LOCATIONS, JSON.stringify(list))
  },
  upsertLocation(loc: Geo) {
    const list = storage.getLocations()
    const exists = list.find((l) => l.latitude === loc.latitude && l.longitude === loc.longitude)
    const next = exists
      ? list.map((l) => (l.latitude === loc.latitude && l.longitude === loc.longitude ? loc : l))
      : [loc, ...list]
    storage.saveLocations(next.slice(0, 10))
  },
  removeLocation(lat: number, lon: number) {
    const list = storage.getLocations().filter((l) => !(l.latitude === lat && l.longitude === lon))
    storage.saveLocations(list)
  },
  getPrefs(): Prefs {
    return JSON.parse(
      localStorage.getItem(LS_KEYS.PREFS) || '{"units":"metric","theme":"system","view":"hourly"}'
    )
  },
  savePrefs(p: Partial<Prefs>) {
    const curr = storage.getPrefs()
    localStorage.setItem(LS_KEYS.PREFS, JSON.stringify({ ...curr, ...p }))
  },
  getCache(): Cache {
    return JSON.parse(localStorage.getItem(LS_KEYS.CACHE) || '{}')
  },
  setCache(cache: Cache) {
    localStorage.setItem(LS_KEYS.CACHE, JSON.stringify(cache))
  },
  setForecastCache(key: string, fc: Forecast) {
    const cache = storage.getCache()
    cache[key] = fc
    storage.setCache(cache)
  },
}
