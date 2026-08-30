import { createServerFn } from "@tanstack/react-start";
import { checkDatabaseConnection } from "@/lib/database.server";

export const getDatabaseHealth = createServerFn({ method: "GET" }).handler(async () => {
  try {
    return await checkDatabaseConnection();
  } catch (error) {
    console.error("[database] Health check failed", error);
    return { ok: false as const };
  }
});
