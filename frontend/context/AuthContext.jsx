"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Invalid credentials");

    // Handle pending user
    if (data.status === "pending") {
      return { status: "pending" };
    }

    // Handle rejected user
    if (data.status === "rejected") {
      return { status: "rejected" };
    }

    // APPROVED – save user
    setUser(data.user);
    return { status: "approved", user: data.user };
  };

  const register = async (payload) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to register");
    }
    const data = await res.json();
    return data.user;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
