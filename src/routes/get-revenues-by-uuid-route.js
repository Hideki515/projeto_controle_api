import { getRevenusByUUIDController } from '../controllers/revenues-controller.js'

export const getRevenusByUUIDRoute = async (app) => {

  app.route({
    method: 'GET',
    url: '/api/v1/revenues/:UUID/',
    schema: {
      summary: 'List revenues by UUID of user',
      tags: ['Revenues'],
      params: {
        type: 'object',
        properties: {
          UUID: { type: 'string' }
        },
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
                  description: { type: 'string' },
                  date: { type: 'string' },
                  value: { type: 'number' },
                  account: { type: 'string' },
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid UUID parameter',
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
    handler: getRevenusByUUIDController,
  });
};