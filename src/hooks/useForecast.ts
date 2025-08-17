import { useEffect, useState } from 'react'
import { fetchWeather, fetchCityCoords } from '../utils/api'
import { storage } from '../utils/localStorage'

export default function useForecast() {
  const [forecast, setForecast] = useState<any>(null)
  const [locations, setLocations] = useState<string[]>(storage.get('locations') || [])
  const [units, setUnits] = useState<string>(storage.get('units') || 'metric')
  const [theme, setTheme] = useState<string>(storage.get('theme') || 'light')
  const [loading, setLoading] = useState(false)

  const getWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true)
    const data = await fetchWeather(lat, lon, units)
    setForecast(data)
    storage.set('forecast', data)
    setLoading(false)
  }

  const searchCity = async (city: string) => {
    const [coords] = await fetchCityCoords(city)
    if (coords) {
      getWeatherByCoords(coords.lat, coords.lon)
      const updated = [city, ...locations.filter((l) => l !== city)].slice(0, 5)
      setLocations(updated)
      storage.set('locations', updated)
    }
  }

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
      })
    }
  }

  const toggleUnits = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric'
    setUnits(newUnits)
    storage.set('units', newUnits)
    if (forecast?.lat && forecast?.lon) getWeatherByCoords(forecast.lat, forecast.lon)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    storage.set('theme', newTheme)
  }

  useEffect(() => {
    const cached = storage.get('forecast')
    if (cached) setForecast(cached)
    else detectLocation()
  }, [])

  return {
    forecast,
    locations,
    units,
    theme,
    loading,
    searchCity,
    detectLocation,
    toggleUnits,
    toggleTheme,
  }
}
