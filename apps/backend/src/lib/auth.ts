import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../db/schema";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Load environment variables from the root directory
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../../../.env'),
  path.resolve(__dirname, '../../../.env'),
];

for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Loaded environment variables from: ${envPath}`);
    break;
  }
}

// Initialize Drizzle database connection
const db = drizzle(process.env.DATABASE_URL!, { schema });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // No email verification - email is just a username
    autoSignIn: true, // Automatically sign in after registration
  },
  hooks: {
    user: {
      created: async (user) => {
        // If no name is provided, use the email as the name
        if (!user.name || user.name.trim() === '') {
          return {
            ...user,
            name: user.email.split('@')[0], // Use the part before @ as name
          };
        }
        return user;
      },
    },
  },
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: false, // Make name optional
        defaultValue: "", // Provide default value
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  socialProviders: {
    // You can add social providers here later
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  trustedOrigins: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:4321', // Astro frontend
    'http://localhost:3000', // Alternative frontend port
    'http://localhost:8000', // Backend URL
  ],
  advanced: {
    generateId: () => {
      // Generate a custom ID format if needed
      return crypto.randomUUID();
    },
  },
});

export type Session = typeof auth.$Infer.Session;
