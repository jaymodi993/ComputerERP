"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import DashboardCard from "@/components/DashboardCard";

export default function Home() {
  const [data, setData] = useState({
    customers: 0,
    jobs: 0,
    invoices: 0,
  });

  const [jobs, setJobs] = useState([]);

  const chartData = [
    {
      name: "Jan",
      jobs: 20,
    },

    {
      name: "Feb",
      jobs: 35,
    },

    {
      name: "Mar",
      jobs: 25,
    },

    {
      name: "Apr",
      jobs: 45,
    },

    {
      name: "May",
      jobs: 60,
    },
  ];

  useEffect(() => {
    api
      .get("/dashboard")

      .then((res) => {
        setData(res.data);
      });

    api
      .get("/repair")

      .then((res) => {
        setJobs(res.data.slice(0, 5));
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500">Computer Repair ERP Overview</p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-4 gap-6">
        <DashboardCard title="Customers" value={data.customers} icon="👥" />

        <DashboardCard title="Repair Jobs" value={data.jobs} icon="💻" />

        <DashboardCard title="Invoices" value={data.invoices} icon="🧾" />

        <DashboardCard title="Revenue" value="₹0" icon="💰" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}

        <div className="col-span-2 bg-white rounded-xl border p-6">
          <h2 className="font-bold text-xl mb-5">Repair Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="jobs" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Action */}

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-bold text-xl mb-5">Quick Actions</h2>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
              + New Repair Job
            </button>

            <button className="w-full border p-3 rounded-lg">+ Add Customer</button>

            <button className="w-full border p-3 rounded-lg">Create Invoice</button>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-bold text-xl mb-5">Recent Repair Jobs</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Job</th>

              <th className="p-3 text-left">Customer</th>

              <th className="p-3 text-left">Device</th>

              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.JobID} className="border-b">
                <td className="p-3">{job.JobNumber}</td>

                <td className="p-3">{job.Name}</td>

                <td className="p-3">
                  {job.Brand} {job.Model}
                </td>

                <td className="p-3">{job.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
