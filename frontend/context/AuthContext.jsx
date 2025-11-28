"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // -------------------------------
  // LOGIN (send rememberMe)
  // -------------------------------
  const login = async (email, password, rememberMe) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe }),
      credentials: "include",
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
  // LOGOUT
  // -------------------------------
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setAccessToken(null);
  };

  // -------------------------------
  // REFRESH TOKEN (on demand)
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
      console.log("Refresh failed:", err);
      return null;
    }
  };

  // -------------------------------
  // AUTO LOGIN USING REFRESH TOKEN (on page load)
  // -------------------------------
  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setAccessToken(data.token);
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
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
