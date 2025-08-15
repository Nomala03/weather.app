import type { Theme, Units } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  units: Units;
  setUnits: (u: Units) => void;
};

export default function SettingsModal({ open, onClose, theme, setTheme, units, setUnits }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 p-5">
        <div className="text-lg font-semibold mb-4">Settings</div>

        <div className="mb-4">
          <div className="font-medium mb-1">Theme</div>
          <div className="flex gap-2">
            {(["light","dark","system"] as const).map(t => (
              <button key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 rounded border ${theme===t ? "bg-sky-500 text-white" : "bg-transparent"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="font-medium mb-1">Units</div>
          <div className="flex gap-2">
            {(["metric","imperial"] as const).map(u => (
              <button key={u}
                onClick={() => setUnits(u)}
                className={`px-3 py-1 rounded border ${units===u ? "bg-sky-500 text-white" : "bg-transparent"}`}>
                {u === "metric" ? "°C, m/s" : "°F, mph"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
        </div>
      </div>
    </div>
  );
}
