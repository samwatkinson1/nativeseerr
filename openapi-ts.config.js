import { defineConfig } from "@hey-api/openapi-ts";

const openapi =
  "https://raw.githubusercontent.com/seerr-team/seerr/refs/heads/main/jellyseerr-api.yml";

/** @type {import('@hey-api/openapi-ts').UserConfig} */
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
  parser: {
    patch: {
      schemas: {
        MediaInfo(schema) {
          schema.properties.mediaType = {
            type: "string",
            enum: ["movie", "tv"],
            readOnly: true,
          };
        },
      },
    },
  },
});
