import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function POST(req) {
  try {
    const body = await req.json();
    const resp = await fetch(`${BACKEND}/api/v1/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.message || "Failed to send OTP");

    return NextResponse.json(data);
  } catch (err) {
    const message = err?.message || "Failed to send OTP";
    return NextResponse.json({ message }, { status: 500 });
  }
}
