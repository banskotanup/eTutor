"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import PageContainer from "./PageContainer";
import useNotifications from "../../subject-dashboard/hooks/useNotifications/useNotifications";
import { useRouter } from "next/navigation";
import SubjectForm, { SubjectFormState, FormFieldValue } from "./SubjectForm";

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// API call
async function createSubject(data: any) {
  const res = await fetch(`${API_URL}/api/v1/subjects/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create subject");
  }

  return res.json();
}

export default function SubjectCreate() {
  const router = useRouter();
  const notify = useNotifications();

  // Initialize form state with correct types
  const [formState, setFormState] = React.useState<SubjectFormState>({
    values: {
      title: "",
      description: "",
      price: 0,      // number
      teacherId: 0,  // number
    },
    errors: {},
  });

  // Handle field changes
  const handleFieldChange = (name: keyof SubjectFormState["values"], value: FormFieldValue) => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        // Convert numeric fields
        [name]: name === "price" || name === "teacherId" ? Number(value) : value,
      },
    }));
  };

  // Handle form submit
  const handleSubmit = async (values: SubjectFormState["values"]) => {
    try {
      await createSubject(values);
      notify.show("Subject created successfully!", { severity: "success" });
      router.push("/admin/subjects");
    } catch (err: any) {
      notify.show(err.message, { severity: "error" });
    }
  };

  return (
    <PageContainer
      title="Create Subject"
      breadcrumbs={[
        { title: "Subjects", path: "/admin/subjects" },
        { title: "New" },
      ]}
    >
      <Box sx={{ flex: 1 }}>
        <SubjectForm
          formState={formState}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
          submitButtonLabel="Create"
        />
      </Box>
    </PageContainer>
  );
}
