import type { SavedPlace } from "../types";

type Props = {
  places: SavedPlace[];
  onSelect: (p: SavedPlace) => void;
  onDelete: (p: SavedPlace) => void;
};

export default function LocationSwitcher({ places, onSelect, onDelete }: Props) {
  if (!places.length) return null;
  return (
    <div className="rounded-lg bg-white/10 border border-white/20 p-3 text-white">
      <div className="font-semibold mb-2">Saved locations</div>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((p) => (
          <li key={`${p.lat},${p.lon}`} className="flex items-center justify-between bg-white/10 px-3 py-2 rounded">
            <button onClick={() => onSelect(p)} className="text-left truncate">{p.label}</button>
            <button onClick={() => onDelete(p)} className="text-xs underline opacity-80">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
