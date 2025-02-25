import db from '../database/db.js';

export const getExpensesByCategoryRoute = async (app) => {

  app.route({
    method: 'GET',
    url: '/expenses/category/:category',
    schema: {
      summary: 'List expenses by category',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          category: { type: 'string' }
        },
        required: ['category']
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
        const { category } = request.params;

        if (!category || typeof category !== 'string' || category.trim() === '') {
          reply.code(400).send({ error: 'Invalid category parameter' });
          return;
        }

        const [expenses] = await db.promise().execute(
          'SELECT * FROM expenses WHERE categoria = ?',
          [category]
        );

        return reply.status(200).send({ expenses });
      } catch (error) {
        console.error('Error on getExpenseByCategoryRoute', error);
        reply.status(500).send({ error: 'Internal server error' });
      }
    }
  })
}