import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-white border-r p-5">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">⚡ Computer ERP</h1>

      <nav className="space-y-2">
        <Link href="/" className="block p-3 rounded-lg hover:bg-blue-50">
          Dashboard
        </Link>

        <Link href="/customers" className="block p-3 rounded-lg hover:bg-blue-50">
          Customers
        </Link>

        <Link href="/repair-list" className="block p-3 rounded-lg hover:bg-blue-50">
          Repair Jobs
        </Link>

        <Link href="/invoices" className="block p-3 rounded-lg hover:bg-blue-50">
          Invoices
        </Link>

        <Link href="/stock" className="block p-3 rounded-lg hover:bg-blue-50">
          Stock
        </Link>
      </nav>
    </div>
  );
}
