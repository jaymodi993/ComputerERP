"use client";

import { useEffect, useState, useCallback } from "react";

import api from "@/services/api";

export default function RepairList() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const loadJobs = useCallback(async () => {
    try {
      const res = await api.get("/repair");

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      await loadJobs();
    };

    fetchJobs();
  }, [loadJobs]);

  const filtered = jobs.filter(
    (job) =>
      job.JobNumber?.toLowerCase().includes(search.toLowerCase()) ||
      job.Name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Repair Jobs</h1>

          <p className="text-gray-500">Manage customer repair orders</p>
        </div>
      </div>

      <div className="card p-6">
        <input
          className="input mb-6"
          placeholder="Search job or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full">
          <thead className="table-head">
            <tr>
              <th className="p-4 text-left">Job No</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Device</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((job) => (
              <tr key={job.JobID} className="border-b hover:bg-slate-50">
                <td className="p-4 font-semibold">{job.JobNumber}</td>

                <td className="p-4">
                  <div>
                    <p className="font-medium">{job.Name}</p>

                    <p className="text-sm text-gray-500">{job.Mobile}</p>
                  </div>
                </td>

                <td className="p-4">
                  {job.Brand} {job.Model}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {job.Status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      (window.location.href = `/repair-details?id=${job.JobID}`)
                    }
                    className="text-blue-600 font-medium"
                  >
                    View
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
