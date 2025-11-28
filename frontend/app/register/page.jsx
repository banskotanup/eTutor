"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [payload, setPayload] = useState({ firstName: "", lastName: "", email: "", password: "", role: "student" });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setPayload({ ...payload, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      await register(payload);
      router.push("/login");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-[520px] p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <div className="grid grid-cols-2 gap-2">
          <input name="firstName" value={payload.firstName} onChange={handleChange} placeholder="First name" className="p-2 border rounded" />
          <input name="lastName" value={payload.lastName} onChange={handleChange} placeholder="Last name" className="p-2 border rounded" />
        </div>
        <input name="email" value={payload.email} onChange={handleChange} placeholder="Email" className="w-full my-2 p-2 border rounded" />
        <input name="password" value={payload.password} onChange={handleChange} placeholder="Password" type="password" className="w-full my-2 p-2 border rounded" />
        <select name="role" value={payload.role} onChange={handleChange} className="w-full my-2 p-2 border rounded">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button disabled={loading} className="w-full p-2 bg-green-600 text-white rounded">{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
