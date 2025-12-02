"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";
import CrudDashboard from "@/components/crud-dashboard/CrudDashboard";
import NotificationsProvider from "@/components/crud-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/crud-dashboard/hooks/useDialogs/DialogsProvider";

export default function AdminSubjectsPage() {
  return (
    <Dashboard menu={adminMenu} title="Manage Subjects">
      <NotificationsProvider>
        <DialogsProvider>
          <CrudDashboard />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
