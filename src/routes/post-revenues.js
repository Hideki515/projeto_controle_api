import db from '../database/db.js';

export const postRevenuesRoute = async (app) => {
  app.post('/revenues', {
    schema: {
      summary: 'Create a revenues',
      tags: ['Revenues'],
      body: {
        type: 'object',
        required: ['descricao', 'data', 'valor', 'conta'],
        properties: {
          descricao: { type: 'string' },
          data: { type: 'string' },
          valor: { type: 'string' },
          conta: { type: 'string' },
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            descricao: { type: 'string' },
            data: { type: 'string' },
            valor: { type: 'string' },
            conta: { type: 'string' },
          }
        },
      }
    }
  },
    async (request, reply) => {
      const { descricao, data, valor, conta } = request.body;
      try {
        const [result] = await db.promise().query(
          'INSERT INTO revenues (descricao, data, valor, conta) VALUES (?, ?, ?, ?)',
          [descricao, data, valor, conta]
        );
        const id = result.insertId;
        reply.send({ id, descricao, data, valor, conta });
      } catch (err) {
        reply.status(500).send({ error: 'Database query failed', details: err });

      }
    }
  );
}