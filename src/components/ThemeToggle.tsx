export default function ThemeToggle({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-3 py-1 rounded border text-white border-white/60 hover:bg-white/10">
      Settings
    </button>
  );
}
