import db from '../database/db.js';

export const getExpenseByAccountRoute = async (app) => {

  app.route({
    method: 'GET',
    url: '/expenses/account/:account',
    schema: {
      summary: 'List expenses by account',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          account: { type: 'string' }
        },
        required: ['account']
      },
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
                  conta: { type: 'string' }
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid account parameter',
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
      },
    },
    handler: async (request, reply) => {
      try {
        const { account } = request.params;

        // Validação da conta
        if (!account || typeof account !== 'string' || account.trim() === '') {
          return reply.status(400).send({ error: 'Parâmetro "account" inválido.' });
        }

        // Query otimizada
        const [expenses] = await db.promise().execute(
          'SELECT * FROM expenses WHERE conta = ? ORDER BY data DESC',
          [account]
        );

        return reply.status(200).send({ expenses });
      } catch (err) {
        console.error("Erro na consulta ao banco:", err);
        return reply.status(500).send({ error: 'Erro ao buscar receitas', details: err.message });
      }
    }
  });
}