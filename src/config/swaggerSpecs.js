import dotenv from "dotenv";
dotenv.config();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes App API",
      version: "1.0.0",
      description: "An API to perform all CRUD operations for taking notes.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./src/router/*.js"],
};

export default swaggerOptions;
