import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./schema.yaml",
  output: "./src/common/generated",
  plugins: [
    {
      name: "@hey-api/typescript", enums: true
    },
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "../config.ts",
    },
    {
      name: '@hey-api/sdk',
    },
  ],
});
