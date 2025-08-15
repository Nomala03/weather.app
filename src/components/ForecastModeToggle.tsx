type Props = { mode: "hourly" | "daily"; onChange: (m: "hourly" | "daily") => void };

export default function ForecastModeToggle({ mode, onChange }: Props) {
  const tab = (key: "hourly" | "daily", label: string) => (
    <button
      key={key}
      onClick={() => onChange(key)}
      className={`px-4 py-2 rounded-md border ${
        mode === key ? "bg-white text-sky-700 border-white" : "bg-white/10 text-white border-white/30"
      }`}
    >
      {label}
    </button>
  );
  return <div className="flex gap-2">{["hourly","daily"].map(k => tab(k as any, k[0].toUpperCase()+k.slice(1)))}</div>;
}
