"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    Name: "",

    Mobile: "",

    Email: "",

    Address: "",
  });

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");

      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async (e) => {
    e.preventDefault();

    await api.post("/customers", form);

    setForm({
      Name: "",

      Mobile: "",

      Email: "",

      Address: "",
    });

    loadCustomers();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Customer</h2>

        <form onSubmit={addCustomer} className="grid grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Name"
            value={form.Name}
            onChange={(e) => setForm({ ...form, Name: e.target.value })}
          />

          <input
            className="border p-3 rounded"
            placeholder="Mobile"
            value={form.Mobile}
            onChange={(e) => setForm({ ...form, Mobile: e.target.value })}
          />

          <input
            className="border p-3 rounded"
            placeholder="Email"
            value={form.Email}
            onChange={(e) => setForm({ ...form, Email: e.target.value })}
          />

          <input
            className="border p-3 rounded"
            placeholder="Address"
            value={form.Address}
            onChange={(e) => setForm({ ...form, Address: e.target.value })}
          />

          <button className="bg-black text-white p-3 rounded col-span-2">
            Add Customer
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Customer List</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>

              <th className="text-left p-3">Mobile</th>

              <th className="text-left p-3">Email</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.CustomerID} className="border-b">
                <td className="p-3">{c.Name}</td>

                <td className="p-3">{c.Mobile}</td>

                <td className="p-3">{c.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
