"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function TeacherDashboard() {

  const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, [user, router]);
  
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST",
    credentials: "include", });
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Teacher Dashboard</h1>

      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
