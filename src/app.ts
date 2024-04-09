// Dans app.ts

import express from 'express';
import requestLogger from './middlewares/requestLogger'; 
import env from './config/env';
import 'dotenv/config';
import pokemonRoutes from './infrastructure/web/routes/pokemonRoutes'; 

const app = express();
app.use(requestLogger);
const PORT = env.PORT;

app.use(express.json()); 

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api', pokemonRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
