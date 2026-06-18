import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-[#0F172A] text-white p-6">
      <h1 className="text-3xl font-bold mb-10">⚡ Computer ERP</h1>

      <div className="space-y-3">
        <Link className="block p-3 rounded-xl hover:bg-slate-800" href="/">
          Dashboard
        </Link>

        <Link className="block p-3 rounded-xl hover:bg-slate-800" href="/customers">
          Customers
        </Link>

        <Link className="block p-3 rounded-xl hover:bg-slate-800" href="/repair-list">
          Repair Jobs
        </Link>

        <Link className="block p-3 rounded-xl hover:bg-slate-800" href="/invoices">
          Invoices
        </Link>

        <Link className="block p-3 rounded-xl hover:bg-slate-800" href="/products">
          Products
        </Link>

        <Link className="block p-3 rounded-xl hover:bg-slate-800" href="/stock">
          Stock
        </Link>
      </div>
    </div>
  );
}
