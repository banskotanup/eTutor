"use client";
import SubjectShow from "@/components/admin-pages/subject-dashboard/components/SubjectShow";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";

export default function SubjectPage() {
  return (
    <Dashboard menu={adminMenu} title="Manage Subjects">
      <NotificationsProvider>
        <DialogsProvider>
          <SubjectShow />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
