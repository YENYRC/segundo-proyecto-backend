import app from "./src/app.js";
import { connectMongo } from "./src/config/mongo.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();