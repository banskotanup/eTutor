"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PageContainer from "./PageContainer";
import useNotifications from "../../subject-dashboard/hooks/useNotifications/useNotifications";
import { useParams, useRouter } from "next/navigation";

import SubjectForm, {
  type SubjectFormState,
  type FormFieldValue,
} from "./SubjectForm";

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

//
// ------------------ API HELPERS ------------------
//

// Get subject by ID
async function getSubject(id: string) {
  const res = await fetch(`${API_URL}/api/v1/subjects/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch subject");
  return res.json();
}

// Update subject
async function updateSubject(
  id: string,
  data: Partial<SubjectFormState["values"]>
) {
  const res = await fetch(`${API_URL}/api/v1/subjects/update/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update subject");
  }

  return res.json();
}

//
// ------------------ MAIN COMPONENT ------------------
//

export default function SubjectEdit() {
  const { id } = useParams();
  const router = useRouter();
  const notify = useNotifications();

  const [subject, setSubject] =
    React.useState<SubjectFormState["values"] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  //
  // Fetch Subject on load
  //
  React.useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    getSubject(id)
      .then((data) => setSubject(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  //
  // Handle submit (save)
  //
  const handleSubmit = React.useCallback(
    async (formValues: Partial<SubjectFormState["values"]>) => {
      if (!id) return;

      try {
        const updated = await updateSubject(id, formValues);
        setSubject(updated);

        notify.show("Subject updated successfully!", {
          severity: "success",
          autoHideDuration: 2500,
        });

        router.push("/admin/subjects");
      } catch (err: any) {
        notify.show(err.message, {
          severity: "error",
          autoHideDuration: 5000,
        });
      }
    },
    [id, notify, router]
  );

  //
  // For controlled form field editing
  //
  const handleFieldChange = React.useCallback(
    (name: keyof SubjectFormState["values"], value: FormFieldValue) => {
      setSubject((prev) =>
        prev
          ? {
              ...prev,
              [name]:
                name === "price" || name === "teacherId"
                  ? Number(value)
                  : value,
            }
          : prev
      );
    },
    []
  );

  //
  // Render Form UI
  //
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
          }}
        >
          <CircularProgress />
        </Box>
      );

    if (error) return <Alert severity="error">{error}</Alert>;

    return subject ? (
      <SubjectForm
        formState={{ values: subject, errors: {} }}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        submitButtonLabel="Save"
      />
    ) : null;
  }, [isLoading, error, subject, handleFieldChange, handleSubmit]);

  //
  // Final Page
  //
  return (
    <PageContainer
      title={`Edit Subject ${id}`}
      breadcrumbs={[
        { title: "Subjects", path: "/admin/subjects" },
        { title: `Subject ${id}`, path: `/admin/subjects/${id}` },
        { title: "Edit" },
      ]}
    >
      <Box sx={{ display: "flex", flex: 1 }}>{renderForm}</Box>
    </PageContainer>
  );
}
