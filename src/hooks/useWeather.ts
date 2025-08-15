import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Forecast, Geo, Units } from '../types'
import { storage } from '../services/storage'
import { cacheKey, fetchForecast } from '../services/openMetro'

const TTL_MS = 15 * 60 * 1000 // 15 minutes cache

export function useWeather(initial?: Geo) {
  const [units, setUnits] = useState(storage.getPrefs().units)
  const [view, setView] = useState(storage.getPrefs().view)
  const [geo, setGeo] = useState<Geo | undefined>(initial)
  const [data, setData] = useState<Forecast | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // persist prefs
  useEffect(() => storage.savePrefs({ units, view }), [units, view])

  const load = useCallback(async (g: Geo, u: Units) => {
    setLoading(true)
    setError(null)
    const key = cacheKey(g, u)
    const cache = storage.getCache()
    const cached = cache[key]
    const fresh = cached && (Date.now() - cached.fetchedAt < TTL_MS)
    try {
      if (fresh) {
        setData(cached)
      } else {
        const fc = await fetchForecast(g, u)
        setData(fc)
        storage.setForecastCache(key, fc)
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load weather')
      if (cached) setData(cached) // offline fallback
    } finally {
      setLoading(false)
    }
  }, [])

  const setUnitsSafe = (u: Units) => setUnits(u)

  const selectGeo = useCallback((g: Geo) => {
    setGeo(g)
  }, [])

  useEffect(() => {
    if (geo) load(geo, units)
  }, [geo, units, load])

  const api = useMemo(() => ({
    units,
    setUnits: setUnitsSafe,
    view,
    setView,
    geo,
    selectGeo,
    data,
    loading,
    error
  }), [units, view, geo, data, loading, error, selectGeo])

  return api
}