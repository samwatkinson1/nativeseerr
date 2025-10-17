import { CreateClientConfig } from "@/http/gen/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  parseAs: "json",
  credentials: "same-origin",
});
