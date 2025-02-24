import { env } from './env.js';
import fastify from 'fastify';
import { getRevenuesRoute } from './src/routes/get-revenues-routes.js';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { getRevenuesByAccountRoute } from './src/routes/get-revenues-by-account-route.js';
import { getRevenuesByYearAndMonthRoute } from './src/routes/get-revenues-by-yearAndMonth-route.js';
import { postRevenuesRoute } from './src/routes/post-revenues-route.js';
import { patchRevenuesRoute } from './src/routes/patch-revenues-route.js';
import { deleteRevenueByIdRoute } from './src/routes/delete-revenue-by-id-routes.js';

const app = fastify();

// Configurar Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'API de Controle Financeiro',
      description: 'Documentação da API para controle de receitas e gastos.',
      version: '1.0.0'
    },
    host: 'localhost:2222',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

// UI do Swagger (documentação visual)
app.register(swaggerUi, {
  routePrefix: '/docs',
});

// Registrar rotas
// Receitas
app.register(postRevenuesRoute);
app.register(getRevenuesRoute);
app.register(getRevenuesByAccountRoute);
app.register(getRevenuesByYearAndMonthRoute);
app.register(patchRevenuesRoute);
app.register(deleteRevenueByIdRoute);

const start = async () => {
  try {
    const PORT = env.PORT || 3000;
    await app.listen({ port: PORT });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
  } catch (err) {
    console.error('Error starting server:', err);
    app.log.error(err);
    process.exit(1);
  }
};

start();
