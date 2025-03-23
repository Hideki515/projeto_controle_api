import db from '../database/db.js';

export const patchRevenuesRoute = async (app) => {
  app.route({
    method: 'PATCH',
    url: '/api/v1/revenues/:id/',
    schema: {
      summary: 'Update a revenue',
      tags: ['Revenues'],
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
          data: { type: 'string' }, // Pode ser ajustado conforme a necessidade
          valor: { type: 'string' }, // Se for número no banco
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
      const { id } = request.params;
      const { descricao, data, valor, conta } = request.body;

      // Validação extra para evitar erro de tipo
      if (!id || Number.isNaN(id)) {
        return reply.status(400).send({ error: 'ID inválido' });
      }

      try {
        const [result] = await db.promise().execute(
          'UPDATE revenues SET descricao = ?, data = ?, valor = ?, conta = ? WHERE id = ?',
          [descricao, data, valor, conta, id]
        );

        if (result.affectedRows === 0) {
          return reply.status(404).send({ error: 'Receita não encontrada' });
        }

        return reply.status(200).send({ id, descricao, data, valor, conta });
      } catch (err) {
        console.error('Erro ao atualizar receita:', err);
        return reply.status(500).send({ error: 'Erro ao atualizar receita' });
      }
    },
  });
};
