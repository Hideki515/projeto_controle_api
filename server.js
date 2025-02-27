import { env } from './env.js';
import fastify from 'fastify';
import swagger from '@fastify/swagger';
import fastifyCors from '@fastify/cors';
import swaggerUi from '@fastify/swagger-ui';

// Importação das rotas
import { getRevenuesRoute } from './src/routes/get-revenues-routes.js';
import { getRevenuesByAccountRoute } from './src/routes/get-revenues-by-account-route.js';
import { getRevenuesByYearAndMonthRoute } from './src/routes/get-revenues-by-yearAndMonth-route.js';
import { postRevenuesRoute } from './src/routes/post-revenues-route.js';
import { patchRevenuesRoute } from './src/routes/patch-revenues-route.js';
import { deleteRevenueByIdRoute } from './src/routes/delete-revenue-by-id-routes.js';
import { postExpensesRoute } from './src/routes/post-expenses-route.js';
import { getExpensesRoute } from './src/routes/get-expenses-route.js';
import { getExpenseByAccountRoute } from './src/routes/get-expenses-by-account-route.js';
import { getExpensesByYearAndMonthRoute } from './src/routes/get-expenses-by-YearAndMonth-route.js';
import { getExpensesByCategoryRoute } from './src/routes/get-expenses-by-category-route.js';
import { patchExpensesRoute } from './src/routes/patch-expense-route.js';
import { deleteExpenseByIdRoute } from './src/routes/delete-expense-by-id-route.js';
import { postUserRoute } from './src/routes/post-users-route.js';
import { getUsersRoute } from './src/routes/get-users-route.js';
import { patchUsersByIdRoute } from './src/routes/patch-users-by-id-route.js';
import { deleteUserByIdRoute } from './src/routes/delete-user-by-id-route.js';

// Criando o servidor Fastify
const app = fastify();
const PORT = process.env.PORT || env.PORT || 3000;
const BASE_URL = 'https://projeto-controle-api.onrender.com';

console.log(`🔧 Inicializando servidor na porta: ${PORT}`);

// Configuração do CORS para permitir requisições do frontend
app.register(fastifyCors, {
  origin: '*', // Ou defina seu frontend específico: ['https://meu-frontend.com']
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Configurar Swagger com URL correta
app.register(swagger, {
  swagger: {
    info: {
      title: 'API de Controle Financeiro',
      description: 'Documentação da API para controle de receitas e gastos.',
      version: '1.0.0',
    },
    host: BASE_URL.replace('https://', ''), // Corrigido para a URL pública
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

// UI do Swagger
app.register(swaggerUi, {
  routePrefix: '/docs',
});

// Registrar rotas
app.register(postRevenuesRoute);
app.register(getRevenuesRoute);
app.register(getRevenuesByAccountRoute);
app.register(getRevenuesByYearAndMonthRoute);
app.register(patchRevenuesRoute);
app.register(deleteRevenueByIdRoute);
app.register(postExpensesRoute);
app.register(getExpensesRoute);
app.register(getExpenseByAccountRoute);
app.register(getExpensesByYearAndMonthRoute);
app.register(getExpensesByCategoryRoute);
app.register(patchExpensesRoute);
app.register(deleteExpenseByIdRoute);
app.register(postUserRoute);
app.register(getUsersRoute);
app.register(patchUsersByIdRoute);
app.register(deleteUserByIdRoute);

// Iniciar o servidor
const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando em ${BASE_URL}`);
    console.log(`📄 Documentação disponível em ${BASE_URL}/docs`);
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

start();
