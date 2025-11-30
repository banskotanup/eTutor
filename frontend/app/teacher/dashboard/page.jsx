"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { teacherMenu } from "@/components/dashboard/menus";

export default function TeacherDashboardPage() {
  return (
    <Dashboard menu={teacherMenu} title="Teacher Dashboard">
      <h1 className="text-2xl font-semibold">Welcome Teacher!</h1>
    </Dashboard>
  );
}
