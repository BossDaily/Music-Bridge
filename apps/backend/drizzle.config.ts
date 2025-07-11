import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from the root directory
// Try multiple possible locations for the .env file
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
];

for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Loaded environment variables from: ${envPath}`);
    break;
  }
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});