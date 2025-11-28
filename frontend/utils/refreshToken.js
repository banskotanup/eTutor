export async function refreshAccessToken() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.accessToken;
}
