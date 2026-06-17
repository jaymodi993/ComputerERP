"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function RepairList() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    try {
      const res = await api.get("/repair");

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const updateStatus = async (jobID, status) => {
    try {
      await api.put(`/status/${jobID}`, {
        Status: status,
      });

      loadJobs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Repair Jobs</h1>

      <div className="bg-white shadow rounded-xl p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Job No</th>

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

                <td className="p-3">
                  <select
                    className="border rounded p-2"
                    value={job.Status || "Received"}
                    onChange={(e) =>
                      updateStatus(
                        job.JobID,

                        e.target.value,
                      )
                    }
                  >
                    <option>Received</option>

                    <option>Checking</option>

                    <option>Waiting Approval</option>

                    <option>Repairing</option>

                    <option>Ready</option>

                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
