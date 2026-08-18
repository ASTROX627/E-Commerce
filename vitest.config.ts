import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["backend/src/**/*.{test,spec}.ts"],
    coverage: {
      provider: "v8",
      include: ["backend/src/**/*.ts"],
      exclude: ["backend/src/generated/**", "backend/src/**/*.types.ts"],
    },
    setupFiles: ["./backend/tests/setup.ts"],
  },
});
