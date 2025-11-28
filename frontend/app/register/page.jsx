"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import SignUp from "../../components/sign-up/SignUp";

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect logged-in users away from register page
      router.replace("/"); // You can send them to homepage or dashboard
    }
  }, [user, router]);

  // Prevent flicker while checking auth
  if (user !== undefined && user !== null) return null;

  return <SignUp />;
}
