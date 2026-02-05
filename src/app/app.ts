import "reflect-metadata";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import routes from "../application/routes/v1";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Load pre-generated swagger.json from docs folder
const swaggerPath = path.join(__dirname, "..", "..", "docs", "swagger.json");
let swaggerSpec;
try {
  const swaggerFile = fs.readFileSync(swaggerPath, "utf8");
  swaggerSpec = JSON.parse(swaggerFile);
  console.log("Swagger spec loaded successfully");
} catch (error) {
  console.error("Error loading swagger.json:", error);
  swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Sistema Financeiro API",
      version: "1.0.0",
      description: "API para gerenciar documentação de Sistema Financeiro",
    },
    paths: {},
  };
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1", routes);

export default app;
