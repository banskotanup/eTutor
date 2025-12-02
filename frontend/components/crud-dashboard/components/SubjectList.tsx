"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  GridEventListener,
  gridClasses,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "./PageContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { useDialogs } from "@/components/crud-dashboard/hooks/useDialogs/useDialogs";
import useNotifications from "@/components/crud-dashboard/hooks/useNotifications/useNotifications";

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const INITIAL_PAGE_SIZE = 10;

export interface Subject {
  id: number;
  title: string;
  description?: string;
  price: number;
  teacherName: string;
}

export default function SubjectList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
      pageSize: searchParams.get("pageSize")
        ? Number(searchParams.get("pageSize"))
        : INITIAL_PAGE_SIZE,
    });

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>(
    searchParams.get("filter")
      ? JSON.parse(searchParams.get("filter")!)
      : { items: [] }
  );

  const [sortModel, setSortModel] = React.useState<GridSortModel>(
    searchParams.get("sort") ? JSON.parse(searchParams.get("sort")!) : []
  );

  const [subjects, setSubjects] = React.useState<{
    rows: Subject[];
    total: number;
  }>({
    rows: [],
    total: 0,
  });

  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  // Fetch subjects from backend
  const fetchSubjects = React.useCallback(async () => {
    setError(null);
    setLoading(true);

    const { page, pageSize } = paginationModel;

    try {
      const res = await fetch(
        `${API_URL}/api/v1/subjects?page=${page}&pageSize=${pageSize}`,
        { method: "GET", credentials: "include", cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch subjects");

      const data = await res.json(); // { rows: [...], total: number }
      setSubjects(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [paginationModel]);

  React.useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Pagination
  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    router.replace(
      `/admin/subjects?page=${model.page}&pageSize=${model.pageSize}`
    );
  };

  // Filter
  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);
    if (model.items.length > 0) {
      router.replace(
        `/admin/subjects?filter=${encodeURIComponent(JSON.stringify(model))}`
      );
    } else {
      router.replace(`/admin/subjects`);
    }
  };

  // Sort
  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
    if (model.length > 0) {
      router.replace(
        `/admin/subjects?sort=${encodeURIComponent(JSON.stringify(model))}`
      );
    } else {
      router.replace(`/admin/subjects`);
    }
  };

  // Row click navigation
  const handleRowClick: GridEventListener<"rowClick"> = ({ row }) => {
    router.push(`/admin/subjects/${row.id}`);
  };

  const handleCreateClick = () => router.push("/admin/subjects/new");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "price", headerName: "Price", width: 120, type: "number" },
    { field: "teacherName", headerName: "Teacher", width: 180 },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      align: "right",
      getActions: ({ row }) => [
        <GridActionsCellItem
          key="edit-item"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => router.push(`/admin/subjects/${row.id}/edit`)}
        />,
        <GridActionsCellItem
          key="delete-item"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={async () => {
            const confirmed = await dialogs.confirm(
              `Do you wish to delete ${row.title}?`,
              {
                title: "Delete Subject?",
                severity: "error",
                okText: "Delete",
                cancelText: "Cancel",
              }
            );

            if (!confirmed) return;

            try {
              await fetch(`${API_URL}/api/v1/subjects/delete/${row.id}`, {
                method: "DELETE",
                credentials: "include",
                cache: "no-store",
              });

              notifications.show("Subject deleted successfully.", {
                severity: "success",
                autoHideDuration: 3000,
              });

              // Refresh list after deletion
              fetchSubjects();
            } catch (err) {
              notifications.show(
                `Failed to delete subject. Reason: ${(err as Error).message}`,
                { severity: "error", autoHideDuration: 3000 }
              );
            }
          }}
        />,
      ],
    },
  ];

  return (
    <PageContainer
      title="Subjects"
      breadcrumbs={[{ title: "Subjects" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data">
            <IconButton size="small" onClick={fetchSubjects}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
      }
    >
      <Box sx={{ width: "100%", flex: 1 }}>
        {error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <DataGrid
            rows={subjects.rows}
            columns={columns}
            rowCount={subjects.total}
            paginationMode="server"
            sortingMode="server"
            filterMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            filterModel={filterModel}
            onFilterModelChange={handleFilterModelChange}
            loading={isLoading}
            showToolbar
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            pageSizeOptions={[5, 10, 25]}
            sx={{ [`& .${gridClasses.row}:hover`]: { cursor: "pointer" } }}
          />
        )}
      </Box>
    </PageContainer>
  );
}
