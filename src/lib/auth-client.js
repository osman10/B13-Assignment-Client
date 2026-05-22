import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Optional if frontend and backend are on the same domain
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// Extract helpers from the SAME client instance
export const { signIn, signUp, useSession } = authClient;

// Example Google sign-in
const handleGoogleSignIn = async () => {
  const data = await signIn.social({
    provider: "google",
  });

//   console.log(data);
};