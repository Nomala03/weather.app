export default function Alerts({ alerts }: { alerts: string[] }) {
  if (!alerts?.length) return null;
  return (
    <div className="rounded-lg border border-red-300/50 bg-red-500/20 text-white p-3">
      <div className="font-semibold">Severe Weather Alerts</div>
      <ul className="list-disc ml-5 mt-1">
        {alerts.map((a, i) => <li key={i} className="text-sm">{a}</li>)}
      </ul>
    </div>
  );
}
