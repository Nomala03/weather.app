import type { CurrentWeather, Units } from "../types";
import { formatWind } from "../utils/units";

export default function Current({ current, units }: { current: CurrentWeather; units: Units }) {
  return (
    <div className="rounded-xl p-4 bg-white/10 border border-white/20 text-white">
      <div className="text-xl font-semibold">Now</div>
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <div className="text-4xl font-bold">
            {Math.round(current.temperature)}°{units === "metric" ? "C" : "F"}
          </div>
          <div className="text-sm opacity-80">{new Date(current.timeISO).toLocaleTimeString()}</div>
        </div>
        <div>
          <div className="text-sm opacity-80">Humidity</div>
          <div className="text-lg">{Math.round(current.humidity)}%</div>
        </div>
        <div>
          <div className="text-sm opacity-80">Wind</div>
          <div className="text-lg">{formatWind(current.windSpeed, units)}</div>
        </div>
        <div>
          <div className="text-sm opacity-80">Direction</div>
          <div className="text-lg">{Math.round(current.windDirection)}°</div>
        </div>
      </div>
    </div>
  );
}
