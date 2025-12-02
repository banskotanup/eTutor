"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  CircularProgress, // <-- Add this
} from "@mui/material";

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
}

interface Subject {
  id: number;
  title: string;
  description: string;
  price: number;
  teacher: Teacher;
}

export default function SubjectsList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
      ? "http://192.168.1.73:8080"
      : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/subjects`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        setSubjects(data || []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [API_URL]);

 const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this subject?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/v1/subjects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete subject");

      // Remove from UI
      setSubjects((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete subject");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (subjects.length === 0)
    return (
      <Typography mt={4} align="center">
        No subjects found.
      </Typography>
    );

  return (
    <Stack spacing={2} mt={2}>
      {subjects.map((subject) => (
        <Paper key={subject.id} sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6">{subject.title}</Typography>
            <Typography variant="body2">{subject.description}</Typography>
            <Typography variant="body2">
              Price: ₹{subject.price} | Teacher: {subject.teacher.firstName}{" "}
              {subject.teacher.lastName}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              // TODO: Add edit logic
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDelete(subject.id)}
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

    