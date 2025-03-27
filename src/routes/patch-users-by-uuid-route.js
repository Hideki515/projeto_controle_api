import { patchUserByUUIDController } from '../controllers/user-controller.js';

export const patchUsersByUUIDRoute = async (app) => {

  app.route({
    method: 'PATCH',
    url: '/api/v1/users/:UUID/',
    schema: {
      summary: 'Update user by UUID',
      tags: ['Users'],
      params: {
        type: 'object',
        properties: {
          UUID: { type: 'string' }
        },
        required: ['UUID']
      },
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            UUID: { type: 'string' },
            email: { type: 'string' }
          }
        },
        400: {
          description: 'Invalid user data',
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        404: {
          description: 'User not found',
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
    handler: patchUserByUUIDController,
  });
};