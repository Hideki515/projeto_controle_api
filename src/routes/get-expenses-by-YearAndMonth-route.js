import db from '../database/db.js';

export async function getExpensesByYearAndMonthRoute(app) {
  app.route({
    method: 'GET',
    url: '/api/v1/expenses/:year/:month/',
    schema: {
      summary: 'Get expenses by year and month',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          year: { type: 'integer' },
          month: { type: 'integer', minimum: 1, maximum: 12 }
        },
        required: ['year', 'month']
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
                  data: { type: 'string', format: 'date' },
                  valor: { type: 'number' },
                  categoria: { type: 'string' },
                  conta: { type: 'string' }
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
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
        const { year, month } = request.params;

        // Validação de entrada
        if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
          reply.code(400).send({ error: 'Invalid parameters' });
          return;
        }

        // Consulta ao banco de dados
        const [expenses] = await db.promise().execute(
          'SELECT * FROM expenses WHERE YEAR(data) = ? AND MONTH(data) = ? ORDER BY data DESC',
          [year, month]
        );

        console.log('Despesas encontradas:', expenses);

        return reply.status(200).send({ expenses });
      } catch (error) {
        console.error('Erro na consulta ao banco:', err);

        reply.status(500).send({ error: 'Internal server error', details: error.message });

      }
    }
  });
}