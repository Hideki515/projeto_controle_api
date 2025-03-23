import db from '../database/db.js';

export const postRevenuesRoute = async (app) => {
  app.route({
    method: 'POST',
    url: '/api/v1/revenues/',
    schema: {
      summary: 'Create a revenue',
      tags: ['Revenues'],
      body: {
        type: 'object',
        required: ['descricao', 'data', 'valor', 'conta'],
        properties: {
          descricao: { type: 'string' },
          data: { type: 'string', format: 'date' }, // Formato de data
          valor: { type: 'string' }, // Melhor se armazenado como DECIMAL/NUMERIC no banco
          conta: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Revenue created successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            descricao: { type: 'string' },
            data: { type: 'string' },
            valor: { type: 'string' },
            conta: { type: 'string' },
          },
        },
        400: {
          description: 'Bad request',
          type: 'object',
          properties: {
            error: { type: 'string' },
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
      const { descricao, data, valor, conta } = request.body;

      // Verifica se os valores obrigatórios não estão vazios
      if (!descricao || !data || !valor || !conta) {
        return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
      }

      try {
        const [result] = await db.promise().execute(
          'INSERT INTO revenues (descricao, data, valor, conta) VALUES (?, ?, ?, ?)',
          [descricao, data, valor, conta]
        );

        const id = result.insertId;
        return reply.status(201).send({ id, descricao, data, valor, conta });
      } catch (err) {
        console.error('Erro ao inserir receita:', err);
        return reply.status(500).send({ error: 'Erro ao inserir receita', details: err.message });
      }
    },
  });
};
