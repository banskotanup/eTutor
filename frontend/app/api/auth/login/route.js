// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE || "604800", 10);

export async function POST(req) {
  try {
    const body = await req.json();

    const resp = await axios.post(`${BACKEND}/api/v1/auth/login`, body, {
      headers: { "Content-Type": "application/json" },
    });

    const data = resp.data;

    // Handle pending users
    if (data.status === "pending") {
      return NextResponse.json({ status: "pending", message: data.message }, { status: 200 });
    }

    // Handle rejected users
    if (data.status === "rejected") {
      return NextResponse.json({ status: "rejected", message: data.message }, { status: 200 });
    }

    // Approved users must have token
    const { token, user } = data;

    if (!token) {
      return NextResponse.json({ message: "No token from backend" }, { status: 500 });
    }

    const res = NextResponse.json({ message: "Logged in", user });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    const message = err?.response?.data?.message || err.message || "Login failed";
    return NextResponse.json({ message }, { status: err?.response?.status || 500 });
  }
}
