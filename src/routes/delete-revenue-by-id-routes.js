import db from "../database/db.js";

export const deleteRevenueByIdRoute = async (app) => {
  app.route({
    method: 'DELETE',
    url: '/api/v1/revenues/:id/',
    schema: {
      summary: 'Delete a revenue by ID',
      tags: ['Revenues'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Revenue successfully deleted',
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
          description: 'Revenue not found',
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
          'DELETE FROM revenues WHERE id = ?',
          [id]
        );

        // Verifica se a receita existia antes de deletar
        if (result.affectedRows === 0) {
          return reply.status(404).send({ error: 'Receita não encontrada' });
        }

        return reply.status(200).send({ message: 'Receita deletada com sucesso' });
      } catch (err) {
        console.error("Erro ao deletar receita:", err);
        return reply.status(500).send({ error: 'Erro ao deletar receita', details: err.message });
      }
    }
  });
};
