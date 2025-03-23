import db from "../database/db.js";

export const deleteExpenseByIdRoute = async (app) => {
  app.route({
    method: 'DELETE',
    url: '/api/v1/expense/:id/',
    schema: {
      summary: 'Delete a Expenses by ID',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Expenses successfully deleted',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        400: {
          description: 'Invalid id parameter',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        404: {
          description: 'Expenses not found',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        500: {
          description: 'Internal server error',
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'string' }
          }
        }
      }
    },
    handler: async (request, reply) => {
      try {
        const { id } = request.params;

        // Validação do ID
        if (!Number.isInteger(Number(id))) {
          return reply.status(400).send({ error: 'ID inválido. Deve ser um número inteiro.' });
        }

        // Executando a exclusão
        const [result] = await db.promise().execute(
          'DELETE FROM expenses WHERE id = ?',
          [id]
        );

        return reply.status(200).send({ message: 'Despesa deletada com sucesso' });
      } catch (err) {
        console.error("Erro ao deletar despesa:", err);
        return reply.status(500).send({ error: 'Erro ao deletar despesa', details: err.message });
      }
    }
  });
};
