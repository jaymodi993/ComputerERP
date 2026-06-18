export default function Header() {
  return (
    <div className="h-20 bg-[#0F172A] text-white shadow-sm flex items-center justify-between px-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
          A
        </div>

        <span className="font-medium">Admin</span>
      </div>
    </div>
  );
}
