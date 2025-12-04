"use client";

import SubjectCreate from "@/components/admin-pages/subject-dashboard/components/SubjectCreate";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";

export default function SubjectCreatePage() {
  return (
    <Dashboard menu={adminMenu} title="Create Subject">
      <NotificationsProvider>
        <DialogsProvider>
          <SubjectCreate />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
