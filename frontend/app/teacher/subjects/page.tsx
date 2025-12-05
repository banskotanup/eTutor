"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import SubjectDashboard from "../../../components/teacher-pages/subject-dashboard/SubjectDashboard";

export default function AdminSubjectsPage() {
  return (
    <Dashboard menu={adminMenu} title="Manage Subjects">
      <NotificationsProvider>
        <DialogsProvider>
          <SubjectDashboard />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
