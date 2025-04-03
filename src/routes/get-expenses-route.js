import { getExpensesController } from '../controllers/expenses-controller.js';

export const getExpensesRoute = async (app) => {
  app.route({
    method: 'GET',
    url: '/api/v1/expenses/list/:authToken',
    schema: {
      summary: 'List all expenses for a user',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          authToken: { type: 'string' }
        },
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
                  description: { type: 'string' },
                  date: { type: 'string' },
                  category: { type: 'string' },
                  value: { type: 'string' },
                  account: { type: 'string' },
                  tokenUser: { type: 'string' },
                },
              },
            },
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
    handler: getExpensesController,
  });
};