import db from '../database/db.js';

export const getRevenuesRoute = async (app) => {
  app.get('/revenues/list', {
    schema: {
      summary: 'List all revenues',
      tags: ['Revenues'],
      response: {
        200: {
          type: 'object',
          properties: {
            revenues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  descricao: { type: 'string' },
                  data: { type: 'string' },
                  valor: { type: 'string' },
                  conta: { type: 'string' },
                },
              }
            }
          }
        },
      }
    }
  },
    async (request, reply) => {
      try {
        const [revenues] = await db.promise().query('SELECT * FROM revenues');
        reply.send({ revenues });
      } catch (err) {
        reply.status(500).send({ error: 'Database query failed', details: err });
      }
    }
  );
};
