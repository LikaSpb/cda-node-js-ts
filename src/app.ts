import express from "express";
import env from "./config/env";
import "dotenv/config";
import pokemonRoutes from "./infrastructure/web/routes/pokemonRoutes";
import trainerRoutes from "./infrastructure/web/routes/trainerRoutes";

import requestLogger from "./middlewares/requestLogger";

const app = express();
const PORT = env.PORT;

app.use(express.json());

app.use(requestLogger);

app.use(pokemonRoutes);
app.use(trainerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});


// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
