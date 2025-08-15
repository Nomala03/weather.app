import { useEffect, useState } from 'react'
import WeatherNow from '../components/WeatherNow'
import HourlyStrip from '../components/HourlyStrip'
import DailyList from '../components/DailyList'
import LocationManager from '../components/LocationManager'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { useWeather } from '../hooks/useWeather'
import { storage } from '../services/storage'
import type { Geo, Units } from '../types'

export default function Home() {
  const saved = storage.getLocations()[0]
  const [showSearch, setShowSearch] = useState(false)
  const api = useWeather(saved)

  // geolocate on first load if nothing saved
  useEffect(() => {
    if (!api.geo && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const g: Geo = { name: 'My location', latitude: pos.coords.latitude, longitude: pos.coords.longitude }
        api.selectGeo(g)
      })
    }
  }, [api.geo])

  const onPick = (g: Geo) => {
    storage.upsertLocation(g)
    api.selectGeo(g)
    setShowSearch(false)
  }

  return (
    <div className="min-h-dvh">
      <Header
        units={api.units}
        onUnits={api.setUnits}
        onLocate={() => {
          navigator.geolocation.getCurrentPosition(pos => {
            api.selectGeo({ name: 'My location', latitude: pos.coords.latitude, longitude: pos.coords.longitude })
          })
        }}
        onSearch={() => setShowSearch(v=>!v)}
        onView={api.setView}
        view={api.view}
        data={api.data}
      />

      <main className="container grid gap-4">
        {showSearch && (
          <div className="card p-4">
            <SearchBar onPick={onPick} />
          </div>
        )}

        {api.error && <div className="card p-4 text-red-600">{api.error}</div>}
        {api.loading && <div className="card p-4">Loading...</div>}

        {api.data && (
          <>
            <WeatherNow data={api.data} />
            {api.view === 'hourly' ? (
              <HourlyStrip data={api.data} />
            ) : (
              <DailyList data={api.data} />
            )}
            <LocationManager current={api.data.geo} onPick={onPick} />
          </>
        )}

        {!api.data && !api.loading && (
          <div className="card p-6 text-center opacity-80">Search for a city or use your current location.</div>
        )}
      </main>
    </div>
  )
}