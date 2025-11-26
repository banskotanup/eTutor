// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.COOKIE_NAME || "token";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Set cookie with same attributes as original
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",  // match your original cookie
    path: "/",            // must match original cookie path
    maxAge: 0,
  });

  return res;
}
