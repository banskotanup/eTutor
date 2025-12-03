"use client";

import UserEdit from "@/components/admin-pages/user-dashboard/components/UserEdit";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";

export default function UserEditPage() {
  return (
    <Dashboard menu={adminMenu} title="Edit User">
      <NotificationsProvider>
        <DialogsProvider>
          <UserEdit />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
