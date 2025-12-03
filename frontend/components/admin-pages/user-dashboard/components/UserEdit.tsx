"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import UserForm, { type FormFieldValue, type UserFormState } from "./UserForm";
import PageContainer from "./PageContainer";
import useNotifications from "../../subject-dashboard/hooks/useNotifications/useNotifications";
import { useRouter, useParams } from "next/navigation";

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// API helpers
async function getUser(id: string) {
  const res = await fetch(`${API_URL}/api/v1/users/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

async function updateUser(id: string, data: Partial<UserFormState["values"]>) {
  const res = await fetch(`${API_URL}/api/v1/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update user");
  }

  return res.json();
}

export default function UserEdit() {
  const { id } = useParams();
  const router = useRouter();
  const notifications = useNotifications();

  const [user, setUser] = React.useState<UserFormState["values"] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch user
  React.useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    getUser(id)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  // Handle form submit
  const handleSubmit = React.useCallback(
    async (formValues: Partial<UserFormState["values"]>) => {
      if (!id) return;
      try {
        const updatedUser = await updateUser(id, formValues);
        setUser(updatedUser);
        notifications.show("User updated successfully.", {
          severity: "success",
          autoHideDuration: 3000,
        });
        router.push("/admin/users");
      } catch (err: any) {
        notifications.show(`Failed to update user: ${err.message}`, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }
    },
    [id, notifications, router]
  );

  // Handle field change (for editable form)
  const handleFieldChange = React.useCallback(
    (name: keyof UserFormState["values"], value: FormFieldValue) => {
      setUser((prev) => (prev ? { ...prev, [name]: value } : prev));
    },
    []
  );

  // Render form
  const renderForm = React.useMemo(() => {
    if (isLoading)
      return (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            m: 1,
          }}
        >
          <CircularProgress />
        </Box>
      );

    if (error) return <Alert severity="error">{error}</Alert>;

    return user ? (
      <UserForm
        formState={{ values: user, errors: {} }}
        onFieldChange={handleFieldChange} // ✅ Editable
        onSubmit={handleSubmit}
        submitButtonLabel="Save"
      />
    ) : null;
  }, [isLoading, error, user, handleFieldChange, handleSubmit]);

  return (
    <PageContainer
      title={`Edit User ${id}`}
      breadcrumbs={[
        { title: "Users", path: "/admin/users" },
        { title: `User ${id}`, path: `/admin/users/${id}` },
        { title: "Edit" },
      ]}
    >
      <Box sx={{ display: "flex", flex: 1 }}>{renderForm}</Box>
    </PageContainer>
  );
}
