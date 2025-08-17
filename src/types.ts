export type Units = 'metric' | 'imperial'

export type Geo = { name: string; country?: string; latitude: number; longitude: number }

export type Current = {
  temperature_2m: number
  relative_humidity_2m: number
  wind_speed_10m: number
}

export type Hourly = {
  time: string[]
  temperature_2m: number[]
  relative_humidity_2m: number[]
  wind_speed_10m: number[]
}

export type Daily = {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  wind_speed_10m_max?: number[]
}

export type Alerts = {
  warnings?: Array<{
    id: string
    event: string
    headline?: string
    description?: string
    severity?: string
  }>
}

export type Forecast = {
  current: Current
  hourly: Hourly
  daily: Daily
  timezone: string
  units: Units
  geo: Geo
  alerts?: Alerts
  fetchedAt: number
}
