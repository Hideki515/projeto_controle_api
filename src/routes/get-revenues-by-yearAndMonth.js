import db from '../database/db.js';

export async function getRevenuesByYearAndMonthRoute(app) {
  app.get('/revenues/:year/:month', {
    schema: {
      summary: 'Get revenues by month and year',
      tags: ['Revenues'],
      params: {
        type: 'object',
        properties: {
          year: { type: 'string' },
          month: { type: 'string' }
        },
        required: ['year', 'month']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            revenues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  descricao: { type: 'string' },
                  data: { type: 'string' },
                  valor: { type: 'number' },
                  conta: { type: 'string' }
                }
              }
            }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'object' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { year, month } = request.params;

      // Convertendo para número
      const yearNumber = Number.parseInt(year, 10);
      const monthNumber = Number.parseInt(month, 10);

      // Query para obter receitas
      const [revenues] = await db.promise().query(
        'SELECT * FROM revenues WHERE YEAR(data) = ?',
        [yearNumber]
      );

      // Filtrar os resultados corretamente no JavaScript
      const filteredRevenues = revenues.filter(revenue => {
        const revenueMonth = new Date(revenue.data).getMonth() + 1; // 🔹 Ajuste correto do mês
        return revenueMonth === monthNumber;
      });

      reply.send({ revenues: filteredRevenues });
    } catch (err) {
      console.error('Erro na consulta ao banco:', err);
      reply.status(500).send({ error: 'Database query failed', details: err.message });
    }
  });
}
