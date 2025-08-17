import type { Forecast } from '../types'

export default function HourlyStrip({ data }: { data: Forecast }) {
  const { hourly } = data
  return (
    <div className="card w-full rounded-b-2xl bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white shadow-md md:max-w-[500px] md:py-4">
      <h3 className="mb-3 text-lg font-semibold">Next Hours</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hourly.time.slice(0, 24).map((t, i) => (
          <div
            key={t}
            className="bg-opacity-20 min-w-28 rounded-xl bg-white/20 p-6 shadow-lg backdrop-blur-md"
          >
            <div className="text-sm opacity-70">
              {new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-2xl font-semibold">{Math.round(hourly.temperature_2m[i])}°</div>
            <div className="text-xs opacity-70">💧 {hourly.relative_humidity_2m[i]}%</div>
            <div className="text-xs opacity-70">💨 {Math.round(hourly.wind_speed_10m[i])}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
