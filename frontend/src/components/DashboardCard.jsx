export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h1 className="text-3xl font-bold mt-2">{value}</h1>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
