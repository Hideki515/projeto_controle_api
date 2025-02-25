import { env } from './env.js';
import fastify from 'fastify';
import { getRevenuesRoute } from './src/routes/get-revenues-routes.js';
import swagger from '@fastify/swagger';
import fastifyCors from '@fastify/cors';
import swaggerUi from '@fastify/swagger-ui';
import { getRevenuesByAccountRoute } from './src/routes/get-revenues-by-account-route.js';
import { getRevenuesByYearAndMonthRoute } from './src/routes/get-revenues-by-yearAndMonth-route.js';
import { postRevenuesRoute } from './src/routes/post-revenues-route.js';
import { patchRevenuesRoute } from './src/routes/patch-revenues-route.js';
import { deleteRevenueByIdRoute } from './src/routes/delete-revenue-by-id-routes.js';
import { postExpensesRoute } from './src/routes/post-expenses-route.js';
import { getExpensesRoute } from './src/routes/get-expenses-route.js';
import { getExpenseByAccountRoute } from './src/routes/get-expenses-by-account.js';
import { getExpensesByYearAndMonthRoute } from './src/routes/get-expenses-by-YearAndMonth-route.js';

const app = fastify();

// Register CORS plugin
app.register(fastifyCors, {
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});


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

// Gastos
app.register(postExpensesRoute);
app.register(getExpensesRoute);
app.register(getExpenseByAccountRoute);
app.register(getExpensesByYearAndMonthRoute);

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
