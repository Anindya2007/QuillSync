import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from the workspace root (4 levels up from apps/server/src/config/env.ts)
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '8000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/quillsync',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-here',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-here',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '1h',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '1d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SOCKET_CORS_ORIGIN: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:3000',
};
