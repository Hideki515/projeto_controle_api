import db from '../database/db.js';

export const getRevenuesRoute = async (app) => {
  app.route({
    method: 'GET',
    url: '/revenues/list',
    schema: {
      summary: 'List all revenues',
      tags: ['Revenues'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            revenues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  descricao: { type: 'string' },
                  data: { type: 'string', format: 'date' },
                  valor: { type: 'string' },
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
    handler: async (request, reply) => {
      try {
        const [revenues] = await db.promise().execute('SELECT * FROM revenues ORDER BY data DESC');
        return reply.status(200).send({ revenues });
      } catch (err) {
        console.error('Erro ao listar receitas:', err);
        return reply.status(500).send({ error: 'Erro ao buscar receitas', details: err.message });
      }
    },
  });
};