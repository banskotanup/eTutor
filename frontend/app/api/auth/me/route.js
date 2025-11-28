// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const COOKIE_NAME = process.env.COOKIE_NAME || "token";

export async function GET(req) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ user: null }, { status: 401 });

    const resp = await axios.get(`${BACKEND}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json({ user: resp.data.user || resp.data });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
