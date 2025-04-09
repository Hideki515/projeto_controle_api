import { deleteExpensesController } from '../controllers/expenses-controller.js';

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
    handler: deleteExpensesController,
  });
};
