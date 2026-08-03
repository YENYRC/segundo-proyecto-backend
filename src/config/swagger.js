import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Segundo Proyecto Backend - API",
      version: "1.0.0",
      description: "API REST con Auth, Productos, Reviews, Wishlist, Cart y Checkout",
    },
    servers: [
      {
        url: "https://segundo-proyecto-backend.onrender.com",
        description: "Producción (Render)",
      },
      {
        url: "http://localhost:3000",
        description: "Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;