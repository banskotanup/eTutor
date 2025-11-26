"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import SignInSide from "../../components/sign-in-side/SignInSide";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect logged-in users away from login page
      if (user.role === "admin") router.replace("/admin/dashboard");
      else if (user.role === "teacher") router.replace("/teacher/dashboard");
      else if (user.role === "student") router.replace("/student/dashboard");
    }
  }, [user, router]); 

  // Prevent flicker while checking auth
  if (user !== undefined && user !== null) return null;

  return <SignInSide />;
}
