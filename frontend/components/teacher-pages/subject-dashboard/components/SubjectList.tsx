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
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "./PageContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { useDialogs } from "@/components/admin-pages/subject-dashboard/hooks/useDialogs/useDialogs";
import useNotifications from "@/components/admin-pages/subject-dashboard/hooks/useNotifications/useNotifications";
import { GridFilterInputValue } from "@mui/x-data-grid";

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

export interface Subject {
  id: number;
  title: string;
  description?: string;
  price: number;
}

export default function TeacherSubjectsList() {
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
    searchParams.get("sort")
      ? (JSON.parse(searchParams.get("sort")!) as GridSortModel)
      : []
  );

  const [subjects, setSubjects] = React.useState<{
    rows: Subject[];
    total: number;
  }>({ rows: [], total: 0 });

  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  // Fetch teacher subjects with server-side pagination
  const fetchSubjects = React.useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/v1/subjects/teacher?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}` +
          `&filter=${encodeURIComponent(JSON.stringify(filterModel))}` +
          `&sort=${encodeURIComponent(JSON.stringify(sortModel))}`,
        { method: "GET", credentials: "include", cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch subjects");

      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, filterModel, sortModel]);

  React.useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Pagination
  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    router.replace(
      `/teacher/subjects?page=${model.page}&pageSize=${model.pageSize}`
    );
  };

  // Filter
  const handleFilterModelChange = (model: GridFilterModel) => {
    setFilterModel(model);
    if (model.items.length > 0) {
      router.replace(
        `/teacher/subjects?filter=${encodeURIComponent(JSON.stringify(model))}`
      );
    } else {
      router.replace(`/teacher/subjects`);
    }
  };

  // Sort
  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
    if (model.length > 0) {
      router.replace(
        `/teacher/subjects?sort=${encodeURIComponent(JSON.stringify(model))}`
      );
    } else {
      router.replace(`/teacher/subjects`);
    }
  };

  // Row click navigation
  const handleRowClick: GridEventListener<"rowClick"> = ({ row }) => {
    router.push(`/teacher/subjects/${row.id}`);
  };

  const columns: GridColDef[] = [
    { field: "sno", headerName: "S.No", width: 100, filterable: false },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      filterOperators,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      filterable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      type: "number",
      filterable: false,
    },
    { field: "totalLessons", headerName: "Total Lessons", width: 200, filterable: false,  sortable: false,},
  ];

  return (
    <PageContainer
      title="My Subjects"
      breadcrumbs={[{ title: "My Subjects" }]}
      actions={
        <Stack direction="row" spacing={1}>
          <Tooltip title="Reload subjects">
            <IconButton size="small" onClick={fetchSubjects}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <Box sx={{ width: "100%", flex: 1 }}>
        {error && <Alert severity="error">{error.message}</Alert>}

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
          sx={{
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: "transparent",
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
              { outline: "none" },
            [`& .${gridClasses.row}:hover`]: { cursor: "pointer" },
            "& .MuiDataGrid-toolbarQuickFilter": { display: "none" },
          }}
          localeText={{
            noRowsLabel: isLoading
              ? "Loading subjects..."
              : "No subjects found.", // 🔹 custom empty message inside grid
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
      </Box>
    </PageContainer>
  );
}
