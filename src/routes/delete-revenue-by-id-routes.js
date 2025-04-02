import { deleteRevenuController } from '../controllers/revenues-controller.js';

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
      body: {
        type: 'object',
        required: ['authToken'],
        properties: {
          authToken: { type: 'string' },
        },
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
    handler: deleteRevenuController,
  });
};
