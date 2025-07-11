const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from the root directory
// Try multiple possible locations for the .env file
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
];

console.log('Current working directory:', process.cwd());
console.log('Script directory (__dirname):', __dirname);
console.log('\nTrying to load .env file from:');

for (const envPath of possibleEnvPaths) {
  console.log(`- ${envPath}: ${fs.existsSync(envPath) ? '✓ EXISTS' : '✗ NOT FOUND'}`);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded environment variables from: ${envPath}`);
    break;
  }
}

console.log('\nEnvironment variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ LOADED' : '✗ NOT FOUND');
console.log('PORT:', process.env.PORT ? '✓ LOADED' : '✗ NOT FOUND');
console.log('NODE_ENV:', process.env.NODE_ENV ? '✓ LOADED' : '✗ NOT FOUND');
console.log('CORS_ORIGINS:', process.env.CORS_ORIGINS ? '✓ LOADED' : '✗ NOT FOUND');

// Show first few characters of DATABASE_URL for verification (hide sensitive data)
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  console.log('DATABASE_URL preview:', url.substring(0, 20) + '...');
}
