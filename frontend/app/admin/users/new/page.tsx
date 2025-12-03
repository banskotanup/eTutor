"use client";

import UserCreate from "@/components/admin-pages/user-dashboard/components/UserCreate";
import NotificationsProvider from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/DialogsProvider";
import Dashboard from "@/components/dashboard/Dashboard";
import { adminMenu } from "@/components/dashboard/menus";

export default function UserCreatePage() {
  return (
    <Dashboard menu={adminMenu} title="Create User">
      <NotificationsProvider>
        <DialogsProvider>
          <UserCreate />
        </DialogsProvider>
      </NotificationsProvider>
    </Dashboard>
  );
}
