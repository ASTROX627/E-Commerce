import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["backend/src/**/*.test.ts", "backend/tests/integration/**/*.integration.test.ts"],
    setupFiles: ["./backend/tests/setup.ts"],
    clearMocks: true,
  },
});
