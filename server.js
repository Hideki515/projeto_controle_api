import { env } from './env.js';
import fastify from 'fastify';
import { getRevenuesRoute } from './src/routes/get-revenues-routes.js';

const app = fastify();

app.register(getRevenuesRoute);

const start = async () => {
  try {
    const PORT = env.PORT || 3000;
    await app.listen({ port: PORT });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error('Error starting server:', err);
    app.log.error(err);
    process.exit(1);
  }
};

start();