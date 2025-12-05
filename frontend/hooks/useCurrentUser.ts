"use client";
import { useState, useEffect } from "react";

interface User {
  role: "admin" | "teacher" | "student";
}

const API_URL =
  typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
    ? "http://192.168.1.73:8080"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function useCurrentUser() {
  const [user, setUser] = useState<User>({ role: "student" }); // default role

  useEffect(() => {
    fetch(`${API_URL}/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ role: data.user?.role });
      })
      .catch(() => setUser({ role: "student" }));
  }, []);

  return user;
}
