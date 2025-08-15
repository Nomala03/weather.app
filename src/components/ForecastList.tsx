import type { DailyPoint, HourlyPoint, Units } from "../types";

export function HourlyList({ data, units }: { data: HourlyPoint[]; units: Units }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {data.slice(0, 24).map((h, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/10 border border-white/20 text-white">
          <div className="text-sm opacity-80">{new Date(h.timeISO).toLocaleTimeString([], { hour: "2-digit" })}</div>
          <div className="text-lg font-semibold">{Math.round(h.temperature)}°{units==="metric"?"C":"F"}</div>
          <div className="text-xs opacity-80">Hum {Math.round(h.humidity)}%</div>
          <div className="text-xs opacity-80">Wind {Math.round(h.windSpeed)} {units==="metric"?"m/s":"mph"}</div>
        </div>
      ))}
    </div>
  );
}

export function DailyList({ data, units }: { data: DailyPoint[]; units: Units }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
      {data.slice(0, 7).map((d, i) => (
        <div key={i} className="p-3 rounded-lg bg-white/10 border border-white/20 text-white">
          <div className="text-sm opacity-80">{new Date(d.dateISO).toLocaleDateString([], { weekday: "short" })}</div>
          <div className="text-lg font-semibold">
            {Math.round(d.tMax)}° / {Math.round(d.tMin)}° {units==="metric"?"C":"F"}
          </div>
          {typeof d.precipProb === "number" && (
            <div className="text-xs opacity-80">Rain {d.precipProb}%</div>
          )}
        </div>
      ))}
    </div>
  );
}
