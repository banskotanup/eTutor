"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";
import UserDashboard from "@/components/admin-pages/user-dashboard/UserDashboard";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";

export default function AdminSubjectsPage() {
  return (
    <Dashboard menu={adminMenu} title="Manage Subjects">
      <NotificationsProvider>
        <DialogsProvider>
          <UserDashboard />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
