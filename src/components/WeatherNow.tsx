import type { Forecast } from '../types'

export default function WeatherNow({ data }: { data: Forecast }) {
  const { current, geo } = data
  return (
    <div className="card xs:grid-cols-1 grid w-full gap-4 rounded-b-2xl bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white shadow-md md:max-w-[500px] md:grid-cols-4">
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">
          {geo.name}
          {geo.country ? `, ${geo.country}` : ''}
        </h2>
        <p className="opacity-70">
          {new Date().toLocaleString()} ({data.timezone})
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-4xl font-bold">{Math.round(current.temperature_2m)}°</div>
        <div className="opacity-70">Temperature</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xl">{Math.round(current.relative_humidity_2m)}%</div>
        <div className="opacity-70">Humidity</div>
        <div className="text-xl">{Math.round(current.wind_speed_10m)}</div>
        <div className="opacity-70">Wind</div>
      </div>
    </div>
  )
}
