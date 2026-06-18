"use client";

import { useEffect, useState, useCallback } from "react";

import api from "@/services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    Name: "",
    Mobile: "",
    Email: "",
    Address: "",
  });

  const loadCustomers = useCallback(async () => {
    try {
      const res = await api.get("/customers");

      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      await loadCustomers();
    };

    fetchCustomers();
  }, [loadCustomers]);

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers", form);

      setOpen(false);

      setForm({
        Name: "",
        Mobile: "",
        Email: "",
        Address: "",
      });

      loadCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.Name?.toLowerCase().includes(search.toLowerCase()) || c.Mobile?.includes(search),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>

          <p className="text-gray-500">Manage your customers</p>
        </div>

        <button onClick={() => setOpen(true)} className="btn-primary">
          + Add Customer
        </button>
      </div>

      <div className="card p-6">
        <input
          className="input mb-5"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full">
          <thead className="table-head">
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Mobile</th>

              <th className="p-3 text-left">Email</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.CustomerID} className="border-b hover:bg-slate-50">
                <td className="p-3 font-medium">{c.Name}</td>

                <td className="p-3">{c.Mobile}</td>

                <td className="p-3">{c.Email}</td>

                <td className="p-3">
                  <button className="text-blue-600 mr-4">Edit</button>

                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[450px]">
            <h2 className="text-xl font-bold mb-5">Add Customer</h2>

            <form onSubmit={addCustomer} className="space-y-4">
              <input
                className="input"
                placeholder="Name"
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
              />

              <input
                className="input"
                placeholder="Mobile"
                value={form.Mobile}
                onChange={(e) => setForm({ ...form, Mobile: e.target.value })}
              />

              <input
                className="input"
                placeholder="Email"
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
              />

              <input
                className="input"
                placeholder="Address"
                value={form.Address}
                onChange={(e) => setForm({ ...form, Address: e.target.value })}
              />

              <div className="flex gap-3">
                <button className="btn-primary">Save</button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
