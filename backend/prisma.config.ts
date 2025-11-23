import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  engine: "classic",

  datasource: {
    provider: "postgresql",
    url: env("DATABASE_URL"), // ✅ REQUIRED for migrate dev
  },

  migrations: {
    path: "prisma/migrations",
    // url: env("DATABASE_URL"), // optional, can remove
  },
});
