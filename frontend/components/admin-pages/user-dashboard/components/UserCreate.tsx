"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import UserForm, { type FormFieldValue, type UserFormState } from "./UserForm";
import PageContainer from "./PageContainer";
import useNotifications from "../../subject-dashboard/hooks/useNotifications/useNotifications";
import { useRouter } from "next/navigation";

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// API helper
async function createUser(data: Partial<UserFormState["values"]>) {
  const res = await fetch(`${API_URL}/api/v1/auth/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create user");
  }

  return res.json();
}

export default function UserCreate() {
  const router = useRouter();
  const notifications = useNotifications();

  const INITIAL_FORM_VALUES: Partial<UserFormState["values"]> = {
    firstName: "",
    lastName: "",
    email: "",
    role: "student",
    status: "pending",
  };

  const [formState, setFormState] = React.useState<UserFormState>({
    values: INITIAL_FORM_VALUES,
    errors: {},
  });

  const setFormValues = React.useCallback(
    (newValues: Partial<UserFormState["values"]>) => {
      setFormState((prev) => ({ ...prev, values: newValues }));
    },
    []
  );

  const setFormErrors = React.useCallback(
    (newErrors: Partial<UserFormState["errors"]>) => {
      setFormState((prev) => ({ ...prev, errors: newErrors }));
    },
    []
  );

  const handleFieldChange = React.useCallback(
    (name: keyof UserFormState["values"], value: FormFieldValue) => {
      setFormValues({ ...formState.values, [name]: value });
    },
    [formState.values, setFormValues]
  );

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createUser(formState.values);
      notifications.show("User created successfully.", { severity: "success" });
      router.push("/admin/users");
    } catch (err: any) {
      setSubmitError(err.message);
      notifications.show(`Failed to create user: ${err.message}`, { severity: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }, [formState.values, notifications, router]);

  return (
    <PageContainer
      title="Create User"
      breadcrumbs={[{ title: "Users", path: "/admin/users" }, { title: "New" }]}
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <UserForm
          formState={formState}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitButtonLabel={isSubmitting ? "Creating..." : "Create"}
          disableSubmit={isSubmitting}
        />
      </Box>
    </PageContainer>
  );
}
