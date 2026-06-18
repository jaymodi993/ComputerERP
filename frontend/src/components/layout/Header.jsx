export default function Header() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold">Dashboard</div>
      </div>

      <div className="flex items-center gap-5">
        <input
          className="w-72 px-4 py-2 rounded-lg border bg-slate-50"
          placeholder="Search..."
        />

        <button className="relative">🔔</button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">Admin</p>

            <p className="text-sm text-gray-500">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
