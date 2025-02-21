import { env } from './env.js';
import fastify from 'fastify';

const app = fastify();

// Criando uma rota GET
app.get('/', async (request, reply) => {
  return { message: 'Hello Fastify!' };
});

// Iniciando o servidor
const start = async () => {
  try {
    const PORT = env.PORT;
    await app.listen({ port: PORT });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();