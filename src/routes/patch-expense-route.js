import { updateExpensesController } from '../controllers/expenses-controller.js';

export const patchExpensesRoute = async (app) => {

  app.route({
    method: 'PATCH',
    url: '/api/v1/expenses/:id/',
    schema: {
      summary: 'Update an expense',
      tags: ['Expenses'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['description', 'date', 'value', 'category', 'account'],
        properties: {
          description: { type: 'string' },
          date: { type: 'string' },
          value: { type: 'string' },
          category: { type: 'string' },
          account: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            description: { type: 'string' },
            date: { type: 'string' },
            value: { type: 'string' },
            category: { type: 'string' },
            account: { type: 'string' },
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
    handler: updateExpensesController,
  });
};