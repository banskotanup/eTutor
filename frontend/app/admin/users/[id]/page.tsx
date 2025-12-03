"use client";
import UserShow from "@/components/admin-pages/user-dashboard/components/UserShow";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";

export default function UserPage() {
  return (
    <Dashboard menu={adminMenu} title="Manage Subjects">
      <NotificationsProvider>
        <DialogsProvider>
          <UserShow />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
