import fs from "fs";
import "reflect-metadata";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sistema Financeiro API",
      version: "1.0.0",
      description: "API para gerenciar documentação de Sistema Financeiro",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/application/routes/v1.ts", "./src/application/routes/enumRoutes.ts"],
});

// Salva o JSON
fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));
console.log("swagger.json gerado com sucesso!");
