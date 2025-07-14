import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:4321", // Use Astro's dev server URL
});

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession,
  getSession,
} = authClient;
