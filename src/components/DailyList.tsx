import type { Forecast } from '../types'

export default function DailyList({ data }: { data: Forecast }) {
  const { daily } = data
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-3">Next 7 Days</h3>
      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {daily.time.map((t, i) => (
          <li key={t} className="py-3 flex items-center justify-between">
            <div className="opacity-80 w-32">{new Date(t).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <div className="flex items-center gap-6">
              <div className="opacity-80">💧 {daily.precipitation_sum[i]} mm</div>
              <div className="opacity-80">💨 {daily.wind_speed_10m_max?.[i] ?? '-'} </div>
              <div className="font-semibold">{Math.round(daily.temperature_2m_min[i])}° / {Math.round(daily.temperature_2m_max[i])}°</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}