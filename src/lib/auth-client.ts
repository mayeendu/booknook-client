"use client";

import { createAuthClient } from "better-auth/react";

import { jwtClient } from "better-auth/client/plugins";

// The authentication API is hosted by this Next.js app at /api/auth.
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  fetchOptions: { credentials: "include" },
  plugins: [jwtClient()],
});

export async function getBearerAuthHeaders(): Promise<Record<string, string>> {
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error("Please sign in to continue.");
  }
  return { authorization: `Bearer ${data.token}` };
}
