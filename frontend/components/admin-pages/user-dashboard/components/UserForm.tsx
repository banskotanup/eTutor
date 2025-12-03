"use client";

import * as React from "react";
import PropTypes from "prop-types";
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

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  status?: string;
  createdAt: string;
  fullName?: string;
}

export interface UserFormState {
  values: Partial<User>;
  errors: Partial<Record<keyof User, string>>;
}

export type FormFieldValue = string | number | null;

export interface UserFormProps {
  formState: UserFormState;
  onFieldChange: (name: keyof User, value: FormFieldValue) => void;
  onSubmit: (formValues: Partial<User>) => Promise<void>;
  onReset?: (formValues: Partial<User>) => void;
  submitButtonLabel: string;
  backButtonPath?: string;
}

export default function UserForm(props: UserFormProps) {
  const {
    formState,
    onFieldChange,
    onSubmit,
    onReset,
    submitButtonLabel,
    backButtonPath,
  } = props;

  const formValues = formState.values;
  const formErrors = formState.errors;

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(formValues);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValues, onSubmit]
  );

  const handleTextFieldChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFieldChange(event.target.name as keyof User, event.target.value);
    },
    [onFieldChange]
  );

  const handleSelectFieldChange = React.useCallback(
    (event: any) => {
      onFieldChange(event.target.name as keyof User, event.target.value);
    },
    [onFieldChange]
  );

  const handleBack = React.useCallback(() => {
    router.push(backButtonPath ?? "/admin/users");
  }, [router, backButtonPath]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{ width: "100%" }}
    >
      <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={formValues.firstName ?? ""}
            onChange={handleTextFieldChange}
            name="firstName"
            label="First Name"
            error={!!formErrors.firstName}
            helperText={formErrors.firstName ?? " "}
            fullWidth
            InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={formValues.lastName ?? ""}
            onChange={handleTextFieldChange}
            name="lastName"
            label="Last Name"
            error={!!formErrors.lastName}
            helperText={formErrors.lastName ?? " "}
            fullWidth
            InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={formValues.email ?? ""}
            onChange={handleTextFieldChange}
            name="email"
            label="Email"
            error={!!formErrors.email}
            helperText={formErrors.email ?? " "}
            fullWidth
            InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            value={formValues.phone ?? ""}
            onChange={handleTextFieldChange}
            name="phone"
            label="Phone"
            error={!!formErrors.phone}
            helperText={formErrors.phone ?? " "}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: { marginTop: "-9px" }, // Adds spacing
            }} // outlined ensures floating label
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl error={!!formErrors.role} fullWidth>
            <InputLabel id="user-role-label" sx={{ mt: "-0.5rem" }}>
              Role
            </InputLabel>
            <Select
              value={formValues.role ?? ""}
              onChange={handleSelectFieldChange}
              labelId="user-role-label"
              name="role"
              label="Role"
              fullWidth
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
            <FormHelperText>{formErrors.role ?? " "}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl error={!!formErrors.status} fullWidth>
            <InputLabel id="user-status-label" sx={{ mt: "-0.5rem" }}>
              Status
            </InputLabel>
            <Select
              value={formValues.status ?? ""}
              onChange={handleSelectFieldChange}
              labelId="user-status-label"
              name="status"
              label="Status"
              fullWidth
            >
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
            <FormHelperText>{formErrors.status ?? " "}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" size="large">
          {submitButtonLabel}
        </Button>
      </Stack>
    </Box>
  );
}

UserForm.propTypes = {
  backButtonPath: PropTypes.string,
  formState: PropTypes.shape({
    errors: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string,
    }).isRequired,
    values: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.oneOf(["admin", "teacher", "student"]),
      status: PropTypes.oneOf(["approved", "pending", "rejected"]),
    }).isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
};
