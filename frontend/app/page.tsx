"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import LandingPage from "../components/landing-page/LandingPage";
import AppTheme from "../components/shared-theme/AppTheme";

export default function LandingPageHome() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect logged-in users to their respective dashboards
      if (user.role === "admin") router.replace("/admin/dashboard");
      else if (user.role === "teacher") router.replace("/teacher/dashboard");
      else if (user.role === "student") router.replace("/student/dashboard");
    }
  }, [user, router]);

  // Prevent showing landing page to logged-in users
  if (user !== undefined && user !== null) return null;

  return (
    <AppTheme>
      <LandingPage />
    </AppTheme>
  );
}
