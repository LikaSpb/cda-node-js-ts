import express from "express";
import env from "./config/env";
import "dotenv/config";
import pokemonRoutes from "./infrastructure/web/routes/pokemonRoutes";
import trainerRoutes from "./infrastructure/web/routes/trainerRoutes";
import typeRoutes from "./infrastructure/web/routes/typeRoutes";
import requestLogger from "./middlewares/requestLogger";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http"; // Import nécessaire pour le serveur HTTP
import { initializeSocketServer } from "./infrastructure/web/sockets/server";

const app = express();
const PORT = env.PORT;
const FRONTEND_URL = env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL, // url de l'application front
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // on peut permettre le transfert de cookies
  })
);

app.use(requestLogger);

app.use(pokemonRoutes);
app.use(trainerRoutes);
app.use(typeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation de Socket.io
initializeSocketServer(server);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
