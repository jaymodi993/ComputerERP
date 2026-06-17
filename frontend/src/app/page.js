import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DashboardCard from "@/components/DashboardCard";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-4 gap-6">
            <DashboardCard title="Customers" value="0" />

            <DashboardCard title="Repair Jobs" value="0" />

            <DashboardCard title="Pending Repair" value="0" />

            <DashboardCard title="Invoices" value="0" />
          </div>
        </div>
      </div>
    </div>
  );
}
