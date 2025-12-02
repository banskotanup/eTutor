"use client";
import SubjectShow from "@/components/crud-dashboard/components/SubjectShow";
import NotificationsProvider from "@/components/crud-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/crud-dashboard/hooks/useDialogs/DialogsProvider";
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
