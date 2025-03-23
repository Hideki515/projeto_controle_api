import db from '../database/db.js';

export async function getRevenuesByYearAndMonthRoute(app) {
  app.route({
    method: 'GET',
    url: '/api/v1/revenues/:year/:month/',
    schema: {
      summary: 'Get revenues by month and year',
      tags: ['Revenues'],
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
            revenues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  descricao: { type: 'string' },
                  data: { type: 'string', format: 'date' },
                  valor: { type: 'number' },
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
          return reply.status(400).send({ error: 'Parâmetros inválidos. Ano e mês devem ser números inteiros válidos.' });
        }

        // Query SQL mais eficiente
        const [revenues] = await db.promise().execute(
          'SELECT * FROM revenues WHERE YEAR(data) = ? AND MONTH(data) = ? ORDER BY data DESC',
          [year, month]
        );

        return reply.status(200).send({ revenues });
      } catch (err) {
        console.error('Erro na consulta ao banco:', err);
        return reply.status(500).send({ error: 'Erro ao buscar receitas', details: err.message });
      }
    }
  });
}
