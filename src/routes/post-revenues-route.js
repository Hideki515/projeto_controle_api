import { postRevenueController } from '../controllers/revenues-controller.js';

export const postRevenuesRoute = async (app) => {
  app.route({
    method: 'POST',
    url: '/api/v1/revenues/',
    schema: {
      summary: 'Create a revenue',
      tags: ['Revenues'],
      body: {
        type: 'object',
        required: ['description', 'date', 'value', 'account', 'authToken'],
        properties: {
          description: { type: 'string' },
          date: { type: 'string', format: 'date' }, // Formato de data
          value: { type: 'string' }, // Melhor se armazenado como DECIMAL/NUMERIC no banco
          account: { type: 'string' },
          authToken: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'Revenue created successfully',
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
    handler: postRevenueController,
  });
};
