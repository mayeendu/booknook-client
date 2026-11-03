"use client";

import { createAuthClient } from "better-auth/react";

// The authentication API is hosted by this Next.js app at /api/auth.
export const authClient = createAuthClient();
