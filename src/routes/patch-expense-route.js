import db from '../database/db.js';

export const patchExpensesRoute = async (app) => {

  app.route({
    method: 'PATCH',
    url: '/expenses/:id',
    schema: {
      summary: 'Update an expense',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['descricao', 'data', 'valor', 'conta'],
        properties: {
          descricao: { type: 'string' },
          data: { type: 'string' },
          valor: { type: 'string' },
          categoria: { type: 'string' },
          conta: { type: 'string' },
        },
      },
      response: {
        200: {
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
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {

      try {
        const { id } = request.params;
        const { descricao, data, valor, categoria, conta } = request.body;

        // Atualizar a Despesa
        const [result] = await db.promise().execute(
          'UPDATE expenses SET descricao = ?, data = ?, valor = ?, categoria = ?, conta = ? WHERE id = ?',
          [descricao, data, valor, categoria, conta, id]
        );

        if (result.affectedRows === 0) {
          return reply.status(404).send({ error: 'Despesa não encontrada' });
        }

        return reply.status(200).send({ id, descricao, data, valor, categoria, conta });

      } catch (err) {
        console.error('Erro ao atualizar despesa:', err);
        return reply.status(500).send({ error: 'Erro ao atualizar despesa' });
      }
    },
  });
};