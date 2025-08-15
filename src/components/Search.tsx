type Props = {
  onSearch: (city: string) => void;
  onDetect: () => void;
};

export default function Search({ onSearch, onDetect }: Props) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim(); if (v) onSearch(v); }}
      className="w-full max-w-2xl"
    >
      <label className="mb-2 block text-white font-semibold">Search locations</label>
      <div className="flex">
        <input
          name="q"
          placeholder="Try: Cape Town, Nairobi, London"
          className="flex-1 px-3 py-2 rounded-l-md border border-white/60 bg-white/10 text-white placeholder-white/70 focus:outline-none"
        />
        <button type="submit" className="px-4 py-2 rounded-r-md border border-white/60 text-white hover:bg-white/10">Search</button>
      </div>
      <button type="button" onClick={onDetect} className="mt-2 text-white/90 underline">Use my location</button>
    </form>
  );
}
