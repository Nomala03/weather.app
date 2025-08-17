import type { Geo } from '../types'

const GEOCODE = 'https://geocoding-api.open-meteo.com/v1/search'

export async function geocode(q: string): Promise<Geo[]> {
  const url = new URL(GEOCODE)
  url.searchParams.set('name', q)
  url.searchParams.set('count', '10')
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Geocoding failed')
  const data = await res.json()
  const list: Geo[] = (data.results || []).map((r: any) => ({
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }))
  return list
}
