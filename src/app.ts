import express from "express";
import env from "./config/env";
import "dotenv/config";
import pokemonRoutes from "./infrastructure/web/routes/pokemonRoutes";
import trainerRoutes from "./infrastructure/web/routes/trainerRoutes";
import requestLogger from "./middlewares/requestLogger";
import cookieParser from "cookie-parser";
import typeRoutes from "./infrastructure/web/routes/typeRoutes";
import cors from "cors";

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

export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
