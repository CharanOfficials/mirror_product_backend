import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/router/index.router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./src/config/swaggerSpecs.js";
import { connectUsingMongoose } from "./src/config/mongoose.js";
dotenv.config();
const app = express();
const swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(cors());
app.use(express.json());
app.use("/", router);
const startServer = async () => {
  try {
    await connectUsingMongoose();
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port no. ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};
startServer();
