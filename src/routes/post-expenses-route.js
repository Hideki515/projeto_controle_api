import db from '../database/db.js';

export const postExpensesRoute = async (app) => {

  app.route({
    method: 'POST',
    url: '/expenses',
    schema: {
      summary: 'Create a expense',
      tags: ['Expenses'],
      body: {
        type: 'object',
        required: ['descricao', 'data', 'valor', 'categoria', 'conta'],
        properties: {
          descricao: { type: 'string' },
          data: { type: 'string', format: 'date' },
          valor: { type: 'string' },
          categoria: { type: 'string' },
          conta: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Expense created successfully',
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
      const { descricao, data, valor, categoria, conta } = request.body;

      // Vweiwrfica se os valores obrigatórios não estão vazios
      if (!descricao || !data || !valor || !categoria || !conta) {
        return reply.status(400).send({ error: 'All fields are required' });
      }

      try {
        const [result] = await db.promise().execute(
          'INSERT INTO expenses (descricao, data, valor, categoria, conta) VALUES (?, ?, ?, ?, ?)',
          [descricao, data, valor, categoria, conta]
        );

        const id = result.insertId;

        reply.status(201).send({ id, descricao, data, valor, categoria, conta });
      } catch (error) {
        console.error('postExpensesRoute', error);
        reply.status(500).send({ error: 'Internal server error', details: error.message });
      }
    },
  });
};