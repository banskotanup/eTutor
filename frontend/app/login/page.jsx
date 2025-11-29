"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import SignInSide from "../../components/sign-in-side/SignInSide";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const successMsg = searchParams?.get("success") || null; // ← e.g., "Registration successful! Login to continue."

  useEffect(() => {
    if (user) {
      if (user.role === "admin") router.replace("/admin/dashboard");
      else if (user.role === "teacher") router.replace("/teacher/dashboard");
      else if (user.role === "student") router.replace("/student/dashboard");
    }
  }, [user, router]);

  if (user !== undefined && user !== null) return null;

  return <SignInSide successMsg={successMsg} />; // ← pass to SignInSide
}
