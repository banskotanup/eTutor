"use client";

import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";
import SubjectEdit from "@/components/admin-pages/subject-dashboard/components/SubjectEdit";

export default function UserPage() {
  return (
    <Dashboard menu={adminMenu} title="Manage Subjects">
      <NotificationsProvider>
        <DialogsProvider>
          <SubjectEdit />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
