export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">儀表板</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-zinc-600 mb-2">今日預約</h3>
          <p className="text-2xl font-bold text-zinc-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-zinc-600 mb-2">待確認</h3>
          <p className="text-2xl font-bold text-zinc-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-zinc-600 mb-2">本月營收</h3>
          <p className="text-2xl font-bold text-zinc-900">$0</p>
        </div>
      </div>
    </div>
  );
}






