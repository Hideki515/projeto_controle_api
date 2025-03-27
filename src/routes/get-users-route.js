import { getUsersController } from '../controllers/user-controller.js'

export const getUsersRoute = async (app) => {

  app.route({
    method: 'GET',
    url: '/api/v1/users/',
    schema: {
      summary: 'List all users',
      tags: ['Users'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  UUID: { type: 'string' },
                  email: { type: 'string' },
                  created_at: { type: 'string' }
                }
              }
            }
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
    handler: getUsersController,
  });
};