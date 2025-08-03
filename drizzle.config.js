
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
