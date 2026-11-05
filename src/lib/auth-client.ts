"use client";

import { createAuthClient } from "better-auth/react";

import { jwtClient } from "better-auth/client/plugins";

// The authentication API is hosted by this Next.js app at /api/auth.
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});
