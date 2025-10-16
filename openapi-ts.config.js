import { defineConfig } from "@hey-api/openapi-ts";

const openapi =
  "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/main/jellyseerr-api.yml";

export default defineConfig({
  input: openapi,
  output: "./http/gen",
  plugins: [
    { dates: true, name: "@hey-api/transformers" },
    { enums: "javascript", name: "@hey-api/typescript" },
    { name: "@hey-api/sdk", transformer: true },
    { name: "@hey-api/client-fetch", runtimeConfigPath: "@/http/config" },
    "@tanstack/react-query",
  ],
});
