import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Optional if frontend and backend are on the same domain
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// Use the same client instance
export const { signIn, signUp, useSession } = authClient;

