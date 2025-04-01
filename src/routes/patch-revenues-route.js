import { patchRevenueController } from '../controllers/revenues-controller.js';

export const patchRevenuesRoute = async (app) => {
  app.route({
    method: 'PATCH',
    url: '/api/v1/revenues/:id/',
    schema: {
      summary: 'Update a revenue',
      tags: ['Revenues'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
        required: ['id'],
      },
      body: {
        type: 'object',
        required: ['description', 'date', 'value', 'account', 'authToken'],
        properties: {
          description: { type: 'string' },
          date: { type: 'string' },
          value: { type: 'string' },
          account: { type: 'string' },
          authToken: { type: 'string' },
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
            account: { type: 'string' },
            authToken: { type: 'string' },
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
    handler: patchRevenueController,
  });
};
