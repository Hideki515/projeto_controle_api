import { postExpensesController } from '../controllers/expenses-controller.js'

export const postExpensesRoute = async (app) => {

  app.route({
    method: 'POST',
    url: '/api/v1/expenses/',
    schema: {
      summary: 'Create a expense',
      tags: ['Expenses'],
      body: {
        type: 'object',
        required: ['description', 'date', 'value', 'category', 'account', 'authToken'],
        properties: {
          description: { type: 'string' },
          date: { type: 'string', format: 'date' },
          value: { "type": 'string' },
          category: { type: 'string' },
          account: { type: 'string' },
          authToken: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Expense created successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            description: { type: 'string' },
            date: { type: 'string' },
            value: { type: 'string' },
            category: { type: 'string' },
            account: { type: 'string' },
            authToken: { type: 'string' },
          },
        },
        400: {
          description: 'Bad request',
          type: 'object',
          properties: {
            error: { type: 'string' },
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
    handler: postExpensesController,
  });
};