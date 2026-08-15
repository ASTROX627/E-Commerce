import path from "node:path";
import fs from "node:fs";
import {load} from "js-yaml";
import type {JsonObject} from "swagger-ui-express"

const specPath = path.resolve(process.cwd(), "backend/openapi.generated.yaml");
const openApiSpec = load(fs.readFileSync(specPath, "utf-8")) as JsonObject;

export { openApiSpec };
