import type { Forecast } from '../types'

export default function HourlyStrip({ data }: { data: Forecast }) {
  const { hourly } = data
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">Next Hours</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hourly.time.slice(0, 24).map((t, i) => (
          <div key={t} className="min-w-28 p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
            <div className="text-sm opacity-70">{new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-2xl font-semibold">{Math.round(hourly.temperature_2m[i])}°</div>
            <div className="text-xs opacity-70">💧 {hourly.relative_humidity_2m[i]}%</div>
            <div className="text-xs opacity-70">💨 {Math.round(hourly.wind_speed_10m[i])}</div>
          </div>
        ))}
      </div>
    </div>
  )
}