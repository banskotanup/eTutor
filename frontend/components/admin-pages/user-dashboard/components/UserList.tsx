"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Select, MenuItem, Chip } from "@mui/material";
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

import { useDialogs } from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/useDialogs";
import useNotifications from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/useNotifications";

// API URL
const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const INITIAL_PAGE_SIZE = 10;

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

interface UserResponse {
  rows: User[];
  total: number;
}

export default function UserList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: Number(searchParams.get("page")) || 0,
      pageSize: Number(searchParams.get("pageSize")) || INITIAL_PAGE_SIZE,
    });

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>(
    searchParams.get("filter")
      ? (JSON.parse(searchParams.get("filter")!) as GridFilterModel)
      : { items: [] }
  );

  const [sortModel, setSortModel] = React.useState<GridSortModel>(
    searchParams.get("sort")
      ? (JSON.parse(searchParams.get("sort")!) as GridSortModel)
      : []
  );

  const [users, setUsers] = React.useState<UserResponse>({
    rows: [],
    total: 0,
  });

  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  // Fetch Users
  const fetchUsers = React.useCallback(async () => {
    setError(null);
    setLoading(true);

    const { page, pageSize } = paginationModel;

    try {
      const res = await fetch(
        `${API_URL}/api/v1/users?page=${page}&pageSize=${pageSize}`,
        { method: "GET", credentials: "include", cache: "no-store" }
      );

      if (!res.ok) {
        let message = `Failed: ${res.status}`;
        try {
          const body = await res.json();
          if (body?.message) message = body.message;
        } catch {}
        throw new Error(message);
      }

      const data = await res.json();

      const normalized: UserResponse = Array.isArray(data.rows)
        ? {
            rows: data.rows.map((u: User) => ({
              ...u,
              fullName: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
            })),
            total: data.total ?? data.rows.length,
          }
        : { rows: [], total: 0 };

      setUsers(normalized);
    } catch (err) {
      setError(err as Error);
      notifications.show(`Failed: ${(err as Error).message}`, {
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [paginationModel, notifications]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Pagination
  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    router.replace(
      `/admin/users?page=${model.page}&pageSize=${model.pageSize}`
    );
  };

  // Filter
  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);
    if (model.items.length) {
      router.replace(
        `/admin/users?filter=${encodeURIComponent(JSON.stringify(model))}`
      );
    } else {
      router.replace("/admin/users");
    }
  };

  // Sort
  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
    if (model.length) {
      router.replace(
        `/admin/users?sort=${encodeURIComponent(JSON.stringify(model))}`
      );
    } else {
      router.replace("/admin/users");
    }
  };

  // Row click
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    if (params.row?.id) router.push(`/admin/users/${params.row.id}`);
  };

  const handleCreateClick = () => router.push("/admin/users/new");

  // Columns
  const columns: GridColDef<User>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "userName", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const status = params.row.status || "pending";
        const color =
          status === "approved"
            ? "success"
            : status === "rejected"
            ? "error"
            : "warning";

        const disabled =
          (params.row.status === "approved" && status !== "approved") ||
          (params.row.status === "rejected" && status !== "rejected");

        return (
          <Select
            value={status}
            size="small"
            disabled={disabled}
            sx={{
              minWidth: 140,
              width: "100%",
              "& .MuiSelect-select": {
                display: "flex",
                justifyContent: "center",
              },
            }}
            renderValue={(v) => (
              <Chip
                label={v}
                color={color as any}
                size="small"
                sx={{ width: "100%", justifyContent: "center" }}
              />
            )}
            onChange={async (e) => {
              const newStatus = e.target.value;
              try {
                const res = await fetch(
                  `${API_URL}/api/v1/users/status/${params.row.id}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ status: newStatus }),
                  }
                );
                if (!res.ok) throw new Error("Failed to update status");

                notifications.show(`Status updated to ${newStatus}`, {
                  severity: "success",
                });
                fetchUsers(); // refresh after change
              } catch (err) {
                notifications.show((err as Error).message, {
                  severity: "error",
                });
              }
            }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        );
      },
    },
    { field: "createdAt", headerName: "Created", width: 160 },
    {
      field: "actions",
      type: "actions",
      width: 120,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => router.push(`/admin/users/${row.id}/edit`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={async () => {
            const confirm = await dialogs.confirm(
              `Delete user ${row.firstName}?`,
              {
                title: "Confirm Delete",
                severity: "error",
                okText: "Delete",
              }
            );
            if (!confirm) return;

            const res = await fetch(
              `${API_URL}/api/v1/users/delete/${row.id}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            );

            if (!res.ok) {
              notifications.show("Delete failed", { severity: "error" });
              return;
            }

            notifications.show("User deleted", { severity: "success" });
            fetchUsers();
          }}
        />,
      ],
    },
  ];

  return (
    <PageContainer
      title="Users"
      breadcrumbs={[{ title: "Users" }]}
      actions={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Reload">
            <IconButton size="small" onClick={fetchUsers}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Create
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        {error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <DataGrid
            rows={users.rows}
            columns={columns}
            rowCount={users.total}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            paginationMode="server"
            filterModel={filterModel}
            onFilterModelChange={handleFilterModelChange}
            filterMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            sortingMode="server"
            loading={isLoading}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            pageSizeOptions={[5, 10, 25]}
            sx={{
              [`& .${gridClasses.row}:hover`]: {
                cursor: "pointer",
              },
            }}
          />
        )}
      </Box>
    </PageContainer>
  );
}
