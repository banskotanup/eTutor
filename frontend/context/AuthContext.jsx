"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // -------------------------------
  // LOGIN
  // -------------------------------
  const login = async (email, password, rememberMe = false) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");

    if (data.status === "pending") return { status: "pending" };
    if (data.status === "rejected") return { status: "rejected" };

    setAccessToken(data.token);
    setUser(data.user);

    return { status: "approved", user: data.user };
  };

  // -------------------------------
  // REGISTER (SEND OTP)
  // -------------------------------
  const register = async (payload) => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      return { otpSent: true, email: payload.email };
    } catch (err) {
      throw new Error(err.message || "Registration failed");
    }
  };

  // -------------------------------
  // VERIFY OTP & COMPLETE REGISTRATION
  // -------------------------------
  const verifyOtp = async (email, otp) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      setUser(data.user);

      return { success: true, user: data.user };
    } catch (err) {
      throw new Error(err.message || "OTP verification failed");
    }
  };

  // -------------------------------
  // LOGOUT
  // -------------------------------
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // -------------------------------
  // REFRESH ACCESS TOKEN
  // -------------------------------
  const refreshAccessToken = async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return null;

      const data = await res.json();
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (err) {
      console.error("Refresh failed:", err);
      return null;
    }
  };

  // -------------------------------
  // AUTO LOGIN ON PAGE LOAD
  // -------------------------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) return;

        const data = await res.json();
        setUser(data.user);
        setAccessToken(data.token || null);
      } catch (err) {
        console.error("Failed to auto-login:", err);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        register,
        verifyOtp,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// -------------------------------
// CUSTOM HOOK
// -------------------------------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
