"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function Repair() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    CustomerID: "",

    DeviceType: "Laptop",

    Brand: "",

    Model: "",

    SerialNumber: "",

    Problem: "",
  });

  const loadCustomers = async () => {
    const res = await api.get("/customers");

    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();

    const res = await api.post("/repair", form);

    alert("Job Created: " + res.data.JobNumber);

    setForm({
      CustomerID: "",

      DeviceType: "Laptop",

      Brand: "",

      Model: "",

      SerialNumber: "",

      Problem: "",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Repair Job</h1>

      <form
        onSubmit={createJob}
        className="bg-white shadow rounded-xl p-6 grid grid-cols-2 gap-4"
      >
        <select
          className="border p-3 rounded"
          value={form.CustomerID}
          onChange={(e) => setForm({ ...form, CustomerID: e.target.value })}
        >
          <option>Select Customer</option>

          {customers.map((c) => (
            <option key={c.CustomerID} value={c.CustomerID}>
              {c.Name}
            </option>
          ))}
        </select>

        <select
          className="border p-3 rounded"
          value={form.DeviceType}
          onChange={(e) => setForm({ ...form, DeviceType: e.target.value })}
        >
          <option>Laptop</option>

          <option>Desktop</option>

          <option>Printer</option>
        </select>

        <input
          className="border p-3 rounded"
          placeholder="Brand"
          value={form.Brand}
          onChange={(e) => setForm({ ...form, Brand: e.target.value })}
        />

        <input
          className="border p-3 rounded"
          placeholder="Model"
          value={form.Model}
          onChange={(e) => setForm({ ...form, Model: e.target.value })}
        />

        <input
          className="border p-3 rounded"
          placeholder="Serial Number"
          value={form.SerialNumber}
          onChange={(e) => setForm({ ...form, SerialNumber: e.target.value })}
        />

        <textarea
          className="border p-3 rounded col-span-2"
          placeholder="Problem"
          value={form.Problem}
          onChange={(e) => setForm({ ...form, Problem: e.target.value })}
        />

        <button className="bg-black text-white p-3 rounded col-span-2">Create Job</button>
      </form>
    </div>
  );
}
