import type { Units } from "../types";

type Props = {
  data: any; // OpenWeather One Call response (or your mapped shape)
  units: Units;
  mode: "hourly" | "daily";
};

export default function Forecast({ data, units, mode }: Props) {
  const unitTemp = units === "metric" ? "°C" : "°F";
  const unitWind = units === "metric" ? "m/s" : "mph";
  const now = data.current;

  return (
    <div className="text-white">
      {/* Current */}
      <div className="rounded-xl p-4 bg-white/10 border border-white/20">
        <div className="text-xl font-semibold">Now</div>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-4xl font-bold">{Math.round(now.temp)}{unitTemp}</div>
            <div className="text-sm opacity-80">{new Date(now.dt * 1000).toLocaleTimeString()}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Humidity</div>
            <div className="text-lg">{Math.round(now.humidity)}%</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Wind</div>
            <div className="text-lg">{Math.round(now.wind_speed)} {unitWind}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Clouds</div>
            <div className="text-lg">{now.clouds}%</div>
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="mt-6 grid gap-3">
        {mode === "hourly" ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.hourly.slice(0, 24).map((h: any, i: number) => (
              <div key={i} className="p-3 rounded-lg bg-white/10 border border-white/20">
                <div className="text-sm opacity-80">{new Date(h.dt * 1000).toLocaleTimeString([], { hour: "2-digit" })}</div>
                <div className="text-lg font-semibold">{Math.round(h.temp)}{unitTemp}</div>
                <div className="text-xs opacity-80">Hum {h.humidity}%</div>
                <div className="text-xs opacity-80">Wind {Math.round(h.wind_speed)} {unitWind}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {data.daily.slice(0, 7).map((d: any, i: number) => (
              <div key={i} className="p-3 rounded-lg bg-white/10 border border-white/20">
                <div className="text-sm opacity-80">
                  {new Date(d.dt * 1000).toLocaleDateString([], { weekday: "short" })}
                </div>
                <div className="text-lg font-semibold">
                  {Math.round(d.temp.max)} / {Math.round(d.temp.min)}{unitTemp}
                </div>
                <div className="text-xs opacity-80">Rain {Math.round((d.pop ?? 0) * 100)}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
