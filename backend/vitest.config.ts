import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "tests/integration/**/*.integration.test.ts"],
    setupFiles: ["./tests/setup.ts"],
    clearMocks: true,
  },
});
