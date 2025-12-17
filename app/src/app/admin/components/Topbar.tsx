export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-zinc-200 px-6 py-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-zinc-900">Beauty Admin</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-zinc-100" aria-label="Notifications">
          🔔
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
            A
          </div>
          <span className="text-sm text-zinc-700">Admin</span>
        </div>
      </div>
    </header>
  );
}






