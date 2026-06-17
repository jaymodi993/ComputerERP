"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DashboardCard from "@/components/DashboardCard";

import api from "@/services/api";

export default function Home() {
  const [data, setData] = useState({
    customers: 0,

    jobs: 0,

    invoices: 0,
  });

  useEffect(() => {
    api
      .get("/dashboard")

      .then((res) => {
        setData(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-4 gap-6">
            <DashboardCard title="Customers" value={data.customers} />

            <DashboardCard title="Repair Jobs" value={data.jobs} />

            <DashboardCard title="Pending Repair" value="0" />

            <DashboardCard title="Invoices" value={data.invoices} />
          </div>
        </div>
      </div>
    </div>
  );
}
