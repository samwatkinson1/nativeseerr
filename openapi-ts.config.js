import { defineConfig } from "@hey-api/openapi-ts";

/** @type {import('@hey-api/openapi-ts').UserConfig} */
export default defineConfig({
  input: { path: "./seerr/seerr-api.yml" },
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
        MediaRequest(schema) {
          schema.properties.canRemove = {
            type: "boolean",
            readOnly: true,
          };
          schema.properties.profileName = {
            type: "string",
          };
          schema.properties.type = {
            type: "string",
            enum: ["movie", "tv"],
            readOnly: true,
          };
        },
        MovieDetails(schema) {
          schema.properties.keywords = {
            type: "array",
            items: { $ref: "#/components/schemas/Keyword" },
          };
        },
        MovieResult(schema) {
          schema.properties.mediaType = {
            type: "string",
            enum: ["movie"],
            readOnly: true,
          };
        },
        TvResult(schema) {
          schema.properties.mediaType = {
            type: "string",
            enum: ["tv"],
            readOnly: true,
          };
        },
        User(schema) {
          schema.properties.displayName = {
            type: "string",
          };
        },
      },
    },
  },
});
