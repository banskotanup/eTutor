"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import FormGroup from '@mui/material/FormGroup';

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Subject {
  id?: number;
  title: string;
  description?: string;
  price: number;
  teacherId: number;
  teacherName?: string;
}

export interface SubjectFormState {
  values: Partial<Subject>;
  errors: Partial<Record<keyof Subject, string>>;
}

export type FormFieldValue = string | number | null;

export interface SubjectFormProps {
  formState: SubjectFormState;
  onFieldChange: (name: keyof Subject, value: FormFieldValue) => void;
  onSubmit: (formValues: Partial<Subject>) => Promise<void>;
  submitButtonLabel: string;
  backButtonPath?: string;
}

export default function SubjectForm({
  formState,
  onFieldChange,
  onSubmit,
  submitButtonLabel,
  backButtonPath,
}: SubjectFormProps) {
  const router = useRouter();
  const { values, errors } = formState;

  const [teachers, setTeachers] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [defaultSet, setDefaultSet] = React.useState(false);

  // -----------------------------
  // FETCH TEACHERS
  // -----------------------------
  React.useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/users/teachers`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Expected array, got:", data);
          return;
        }

        const formatted = data.map((t: any) => ({
          id: t.id,
          name: `${t.firstName} ${t.lastName}`,
        }));

        setTeachers(formatted);

        // Automatically set first teacher as default (only once)
        if (!defaultSet && formatted.length > 0) {
          onFieldChange("teacherId", formatted[0].id);
          onFieldChange("teacherName", formatted[0].name);
          setDefaultSet(true);
        }
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      }
    };

    fetchTeachers();
  }, []); // DEPENDENCY ARRAY MUST ALWAYS BE CONSTANT

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(values);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange(e.target.name as keyof Subject, e.target.value);
  };

  const handleTeacherChange = (e: any) => {
    const id = Number(e.target.value);
    const selected = teachers.find((t) => t.id === id);

    if (selected) {
      onFieldChange("teacherId", selected.id);
      onFieldChange("teacherName", selected.name);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
          {/* Title */}
          <Grid size={{ xs: 12 }} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={values.title ?? ""}
              onChange={handleTextInput}
              error={!!errors.title}
              helperText={errors.title ?? " "}
              InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }}
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              minRows={2}
              value={values.description ?? ""}
              onChange={handleTextInput}
              error={!!errors.description}
              helperText={errors.description ?? " "}
              InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }}
            />
          </Grid>

          {/* Price */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Price (NPR)"
              name="price"
              value={values.price ?? ""}
              onChange={handleTextInput}
              error={!!errors.price}
              helperText={errors.price ?? " "}
              InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }}
            />
          </Grid>

          {/* Teacher */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth error={!!errors.teacherId}>
              <InputLabel sx={{ mt: "-0.5rem" }}>Teacher</InputLabel>
              <Select
                label="Teacher"
                value={values.teacherId ?? ""}
                onChange={handleTeacherChange}
              >
                {teachers.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.teacherId ?? " "}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>

      {/* Buttons */}
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(backButtonPath ?? "/admin/subjects")}
        >
          Back
        </Button>

        <Button variant="contained" type="submit">
          {submitButtonLabel}
        </Button>
      </Stack>
    </Box>
  );
}
