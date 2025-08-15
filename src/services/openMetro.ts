import type { Alerts, Current, Daily, Forecast, Geo, Hourly, Units } from '../types'

const BASE = 'https://api.open-meteo.com/v1/forecast'
const WARN = 'https://api.open-meteo.com/v1/warnings'

function unitParams(units: Units) {
  return units === 'metric'
    ? { temp: 'celsius', speed: 'ms' }
    : { temp: 'fahrenheit', speed: 'mph' }
}

export async function fetchForecast(geo: Geo, units: Units): Promise<Forecast> {
  const u = unitParams(units)
  const url = new URL(BASE)
  url.searchParams.set('latitude', String(geo.latitude))
  url.searchParams.set('longitude', String(geo.longitude))
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,wind_speed_10m')
  url.searchParams.set('hourly', 'temperature_2m,relative_humidity_2m,wind_speed_10m')
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max')
  url.searchParams.set('temperature_unit', u.temp)
  url.searchParams.set('wind_speed_unit', u.speed)
  url.searchParams.set('forecast_days', '7')

  const [fRes, aRes] = await Promise.all([
    fetch(url.toString()),
    fetch(`${WARN}?latitude=${geo.latitude}&longitude=${geo.longitude}&timezone=auto`)
  ])

  if (!fRes.ok) throw new Error('Forecast request failed')
  const data = await fRes.json()

  const current: Current = data.current
  const hourly: Hourly = data.hourly
  const daily: Daily = data.daily

  let alerts: Alerts | undefined
  if (aRes.ok) {
    try {
      const a = await aRes.json()
      alerts = { warnings: a.warnings }
    } catch {}
  }

  return {
    current,
    hourly,
    daily,
    timezone: data.timezone,
    units,
    geo,
    alerts,
    fetchedAt: Date.now(),
  }
}

export function cacheKey(geo: Geo, units: Units) {
  return `${geo.latitude},${geo.longitude},${units}`
}