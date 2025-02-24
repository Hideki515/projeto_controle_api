import db from '../database/db.js';

export const getExpensesRoute = async (app) => {
  app.route({
    method: 'GET',
    url: '/expenses/list',
    schema: {
      summery: 'List all expenses',
      tags: ['Expenses'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            expenses: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  descricao: { type: 'string' },
                  data: { type: 'string' },
                  valor: { type: 'string' },
                  categoria: { type: 'string' },
                  conta: { type: 'string' },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'string' },
          },
        },
      },
    },
    handler: async (_request, reply) => {
      try {
        const [expenses] = await db.promise().execute('SELECT * FROM expenses ORDER BY data DESC');
        return reply.status(200).send({ expenses });
      } catch (err) {
        console.error('Erro ao listar gastos:', err);
        return reply.status(500).send({ error: 'Erro ao buscar gastos', details: err.message });
      }
    },
  });
};