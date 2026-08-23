import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["backend/tests/integration/**/*.test.ts"],
    setupFiles: ["./backend/tests/setup.ts"],
    maxWorkers: 1,
    isolate: false,
  },
});
