import { generateOpenApiDocument } from "trpc-openapi";

import { serverRouter } from "./routers/index";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: "Example CRUD API",
  description: "OpenAPI compliant REST API built using tRPC with Next.js",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api",
});
