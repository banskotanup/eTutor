"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";

export default function AdminDashboardPage() {
  return (
    <Dashboard menu={adminMenu} title="Admin Dashboard">
      <h1 className="text-2xl font-semibold">Welcome Admin!</h1>
    </Dashboard>
  );
}
