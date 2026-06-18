"use client";

import { useEffect, useState, useCallback } from "react";

import api from "@/services/api";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const [search, setSearch] = useState("");

  const loadInvoices = useCallback(async () => {
    try {
      const res = await api.get("/invoice");

      setInvoices(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      await loadInvoices();
    };

    fetchInvoices();
  }, [loadInvoices]);

  const filtered = invoices.filter((i) =>
    i.InvoiceNumber?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>

          <p className="text-gray-500">GST Billing & Payment Management</p>
        </div>

        <div className="bg-white border rounded-xl px-6 py-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Invoice</p>

          <h2 className="text-2xl font-bold">{invoices.length}</h2>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <input
          className="input mb-6"
          placeholder="Search invoice number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full">
          <thead className="table-head">
            <tr>
              <th className="p-4 text-left">Invoice No</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Taxable</th>

              <th className="p-4 text-left">CGST</th>

              <th className="p-4 text-left">SGST</th>

              <th className="p-4 text-left">Total</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((inv) => (
              <tr key={inv.InvoiceID} className="border-b hover:bg-slate-50">
                <td className="p-4 font-semibold">{inv.InvoiceNumber}</td>

                <td className="p-4">Customer</td>

                <td className="p-4">₹ {inv.TaxableAmount}</td>

                <td className="p-4">₹ {inv.CGST}</td>

                <td className="p-4">₹ {inv.SGST}</td>

                <td className="p-4 font-bold">₹ {inv.GrandTotal}</td>

                <td className="p-4">
                  <button
                    className="text-blue-600 font-medium"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/uploads/invoice/Invoice_${inv.InvoiceNumber}.pdf`,
                      )
                    }
                  >
                    View PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
