"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import api from "@/services/api";

export default function RepairDetails() {
  const params = useSearchParams();

  const jobID = params.get("id");

  const [job, setJob] = useState(null);

  const [charges, setCharges] = useState([]);

  const [status, setStatus] = useState("");

  const [charge, setCharge] = useState({
    Description: "",
    Amount: "",
    GSTPercent: 18,
  });

  const loadData = useCallback(async () => {
    try {
      const jobRes = await api.get(`/repair/${jobID}`);

      setJob(jobRes.data);

      setStatus(jobRes.data.Status);

      const chargeRes = await api.get(`/charges/${jobID}`);

      setCharges(chargeRes.data);
    } catch (error) {
      console.log(error);
    }
  }, [jobID]);

  useEffect(() => {
    if (jobID) {
      const fetchData = async () => {
        await loadData();
      };

      fetchData();
    }
  }, [jobID, loadData]);

  const updateStatus = async () => {
    try {
      await api.put(`/status/${jobID}`, {
        Status: status,
      });

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const addCharge = async (e) => {
    e.preventDefault();

    try {
      await api.post("/charges", {
        JobID: jobID,

        Description: charge.Description,

        Amount: charge.Amount,

        GSTPercent: charge.GSTPercent,
      });

      setCharge({
        Description: "",

        Amount: "",

        GSTPercent: 18,
      });

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  if (!job) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{job.JobNumber}</h1>

        <p className="text-gray-500">Repair Details</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card p-5">
          <h3 className="font-bold mb-3">Customer</h3>

          <p>{job.Name}</p>

          <p>{job.Mobile}</p>
        </div>

        <div className="card p-5">
          <h3 className="font-bold mb-3">Device</h3>

          <p>
            {job.Brand} {job.Model}
          </p>

          <p>{job.SerialNumber}</p>
        </div>

        <div className="card p-5">
          <h3 className="font-bold mb-3">Status</h3>

          <select
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Received</option>

            <option>Checking</option>

            <option>Repairing</option>

            <option>Ready</option>

            <option>Delivered</option>
          </select>

          <button onClick={updateStatus} className="btn-primary mt-3">
            Update
          </button>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Problem</h2>

        <p>{job.Problem}</p>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-5">Charges</h2>

        <form onSubmit={addCharge} className="grid grid-cols-4 gap-4 mb-6">
          <input
            className="input"
            placeholder="Description"
            value={charge.Description}
            onChange={(e) => setCharge({ ...charge, Description: e.target.value })}
          />

          <input
            className="input"
            placeholder="Amount"
            value={charge.Amount}
            onChange={(e) => setCharge({ ...charge, Amount: e.target.value })}
          />

          <input
            className="input"
            placeholder="GST %"
            value={charge.GSTPercent}
            onChange={(e) => setCharge({ ...charge, GSTPercent: e.target.value })}
          />

          <button className="btn-primary">Add</button>
        </form>

        <table className="w-full">
          <thead className="table-head">
            <tr>
              <th className="p-3 text-left">Description</th>

              <th className="p-3 text-left">Amount</th>

              <th className="p-3 text-left">GST</th>
            </tr>
          </thead>

          <tbody>
            {charges.map((c) => (
              <tr key={c.ChargeID} className="border-b">
                <td className="p-3">{c.Description}</td>

                <td className="p-3">₹ {c.Amount}</td>

                <td className="p-3">{c.GSTPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button className="btn-primary">Generate Job Sheet PDF</button>

        <button className="btn-primary">Create Invoice</button>
      </div>
    </div>
  );
}
