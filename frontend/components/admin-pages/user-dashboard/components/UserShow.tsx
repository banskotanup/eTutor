"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter, useParams } from "next/navigation";
import PageContainer from "@/components/admin-pages/subject-dashboard/components/PageContainer";
import { useDialogs } from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/useDialogs";
import useNotifications from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/useNotifications";

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function UserShow() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/users/${userId}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to load user");
      const data = await response.json();
      setUser(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBack = () => router.push("/admin/users");
  const handleEdit = () => router.push(`/admin/users/${userId}/edit`);

  const handleDelete = async () => {
    if (!user) return;
    const confirmed = await dialogs.confirm(`Delete user ${user.firstName}?`, {
      title: "Delete User?",
      severity: "error",
      okText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    try {
      setIsLoading(true);
      await fetch(`${API_URL}/api/v1/users/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      });
      notifications.show("User deleted successfully.", { severity: "success" });
      router.push("/admin/users");
    } catch (err) {
      notifications.show(`Failed: ${err.message}`, { severity: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderShow = () => {
    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error.message}</Alert>;
    if (!user) return <Alert severity="info">User not found</Alert>;

    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">ID</Typography>
              <Typography>{user.id}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Full Name</Typography>
              <Typography>{user.firstName} {user.lastName}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Email</Typography>
              <Typography>{user.email}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Phone</Typography>
              <Typography>{user.phone || "N/A"}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Role</Typography>
              <Typography>{user.role}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Status</Typography>
              <Typography>{user.status}</Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12}}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Created At</Typography>
              <Typography>{new Date(user.createdAt).toLocaleString()}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" justifyContent="space-between">
          <Button startIcon={<ArrowBackIcon />} onClick={handleBack} variant="contained">Back</Button>

          <Stack direction="row" spacing={2}>
            <Button startIcon={<EditIcon />} onClick={handleEdit} variant="contained">Edit</Button>
            <Button startIcon={<DeleteIcon />} onClick={handleDelete} variant="contained" color="error">Delete</Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  return (
    <PageContainer
      title={`User ${userId}`}
      breadcrumbs={[
        { title: "Users", path: "/admin/users" },
        { title: `User ${userId}` },
      ]}
    >
      <Box sx={{ width: "100%" }}>{renderShow()}</Box>
    </PageContainer>
  );
}
