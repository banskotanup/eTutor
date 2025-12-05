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
  GridDownloadIcon,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageContainer from "./PageContainer";
import { useRouter, useSearchParams } from "next/navigation";

import { useDialogs } from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/useDialogs";
import useNotifications from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/useNotifications";
import { GridFilterInputValue } from "@mui/x-data-grid";

// API URL
const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const INITIAL_PAGE_SIZE = 10;

const filterOperators = [
  {
    label: "contains",
    value: "contains",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;
      return (params) =>
        params.value
          ?.toString()
          .toLowerCase()
          .includes(filterItem.value.toString().toLowerCase());
    },
    InputComponent: GridFilterInputValue, // ✅ This shows the input box
  },
];

export const enumFilterOperators = [
  {
    label: "equals",
    value: "equals",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;
      return (params) => params.value === filterItem.value;
    },
    InputComponent: (props: any) => {
      const { item, applyValue } = props;

      const options = ["student", "teacher", "admin"];

      return (
        <Select
          value={item.value || ""}
          size="small"
          onChange={(e) => applyValue({ ...item, value: e.target.value })}
          sx={{
            width: "100%",
            minWidth: 120,
            "& .MuiSelect-select": {
              display: "flex",
              justifyContent: "center",
              padding: "4px 8px",
            },
          }}
          displayEmpty
          renderValue={(v) =>
            v ? (
              <Chip
                label={v.charAt(0).toUpperCase() + v.slice(1)}
                size="small"
                sx={{ width: "100%", justifyContent: "center" }}
              />
            ) : (
              "--Select--"
            )
          }
        >
          <MenuItem value="">
            <em>--Select--</em>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </MenuItem>
          ))}
        </Select>
      );
    },
  },
];

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
        `${API_URL}/api/v1/users?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}` +
          `&filter=${encodeURIComponent(JSON.stringify(filterModel))}` +
          `&sort=${encodeURIComponent(JSON.stringify(sortModel))}`,
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
  }, [paginationModel, notifications, filterModel, sortModel]);

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
    if (model.length > 0) {
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
    { field: "sno", headerName: "S.No", width: 80, filterable: false },
    { field: "userName", headerName: "Name", width: 200, filterOperators },
    { field: "email", headerName: "Email", width: 220, filterOperators },
    { field: "phone", headerName: "Phone", width: 150, filterOperators },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      filterOperators: enumFilterOperators,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      filterOperators,
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
    {
      field: "createdAt",
      headerName: "Created",
      width: 160,
      filterable: false,
    },
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

          <Tooltip title="Export Users">
            <IconButton
              size="small"
              onClick={() => {
                const csvContent =
                  "data:text/csv;charset=utf-8," +
                  ["ID,Name,Email,Phone,Role,Status"]
                    .concat(
                      users.rows.map(
                        (u) =>
                          `${u.id},${u.fullName},${u.email},${u.phone || ""},${
                            u.role
                          },${u.status || "pending"}`
                      )
                    )
                    .join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "users.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <GridDownloadIcon />{" "}
              {/* You can replace with a FileDownloadIcon */}
            </IconButton>
          </Tooltip>
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
            showToolbar
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            pageSizeOptions={[5, 10, 25]}
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: "transparent",
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
              [`& .${gridClasses.row}:hover`]: {
                cursor: "pointer",
              },
              "& .MuiDataGrid-toolbarQuickFilter": { display: "none" },
            }}
            localeText={{
              noRowsLabel: isLoading
                ? "Loading subjects..."
                : "No users found.", // 🔹 custom empty message inside grid
            }}
            slotProps={{
              loadingOverlay: {
                variant: "circular-progress",
                noRowsVariant: "circular-progress",
              },
              baseIconButton: {
                size: "small",
              },
            }}
          />
        )}
      </Box>
    </PageContainer>
  );
}
