import "reflect-metadata"; 
import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import routes from "./application/routes/v1";
import { HttpException } from "./infrastruture/exception/types";
import { registerDependencies } from "./infrastruture/config/dependencyInjection";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
const swaggerDocument = require("../docs/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use((err: Error | HttpException<unknown>, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    console.error("Unhandled error:", err);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// Health check root endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Sistema Financeiro API está rodando",
    docs: "/api-docs",
    version: process.env.APP_VERSION || "1.0.0",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Swagger UI disponível em: http://localhost:${port}/api-docs`);
  console.log(`API base: http://localhost:${port}/api/v1`);
});

export default app;

