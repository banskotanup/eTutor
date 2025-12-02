"use client";

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';
import PageContainer from '@/components/crud-dashboard/components/PageContainer';
import { useDialogs } from '@/components/crud-dashboard/hooks/useDialogs/useDialogs';
import useNotifications from '@/components/crud-dashboard/hooks/useNotifications/useNotifications';

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function SubjectShow() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.id;

  const dialogs = useDialogs(); // inherits current theme automatically
  const notifications = useNotifications();

  const [subject, setSubject] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  // -------- FETCH SUBJECT --------
  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/subjects/${subjectId}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });
      if (!response.ok) throw new Error("Failed to load subject");
      const data = await response.json();
      setSubject(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // -------- HANDLERS --------
  const handleBack = React.useCallback(() => router.push('/admin/subjects'), [router]);
  const handleEdit = React.useCallback(() => router.push(`/admin/subjects/${subjectId}/edit`), [router, subjectId]);

  // -------- DELETE SUBJECT WITH THEME --------
  const handleDelete = React.useCallback(async () => {
    if (!subject) return;

    const confirmed = await dialogs.confirm(
      `Do you wish to delete ${subject.title}?`,
      {
        title: 'Delete Subject?',
        severity: 'error',
        okText: 'Delete',
        cancelText: 'Cancel',
      }
    );

    if (confirmed) {
      setIsLoading(true);
      try {
        await fetch(`${API_URL}/api/v1/subjects/delete/${subjectId}`, {
          method: 'DELETE',
          credentials: 'include',
          cache: 'no-store'
        });

        router.push('/admin/subjects');

        notifications.show('Subject deleted successfully.', {
          severity: 'success',
          autoHideDuration: 3000,
        });
      } catch (deleteError) {
        notifications.show(
          `Failed to delete subject. Reason: ${(deleteError as Error).message}`,
          { severity: 'error', autoHideDuration: 3000 }
        );
      } finally {
        setIsLoading(false);
      }
    }
  }, [subject, dialogs, subjectId, router, notifications]);

  // -------- RENDER SUBJECT --------
  const renderShow = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 5 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return <Alert severity="error">{error.message}</Alert>;
    }

    if (!subject) return <Alert severity="info">Subject not found</Alert>;

    return (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">ID</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>{subject.id}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Subject Name</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>{subject.title}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Teacher</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>{subject.teacherName}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Price</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>NPR {subject.price}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Description</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {subject.description || 'No description provided'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Back
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  }, [isLoading, error, subject, handleBack, handleEdit, handleDelete]);

  return (
    <PageContainer
      title={`Subject ${subjectId}`}
      breadcrumbs={[
        { title: 'Subjects', path: '/admin/subjects' },
        { title: `Subject ${subjectId}` },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
        {renderShow}
      </Box>
    </PageContainer>
  );
}
