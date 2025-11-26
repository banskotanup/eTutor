// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function POST(req) {
  try {
    const body = await req.json();
    const resp = await axios.post(`${BACKEND}/api/v1/auth/register`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(resp.data);
  } catch (err) {
    const message = err?.response?.data?.message || err.message || "Register failed";
    return NextResponse.json({ message }, { status: err?.response?.status || 500 });
  }
}
