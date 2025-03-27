import { deleteUserByUUIDController } from '../controllers/user-controller.js';

export const deleteUserByUUIDRoute = async (app) => {
  app.route({
    method: 'DELETE',
    url: '/api/v1/user/:UUID/',
    schema: {
      summary: 'Delete a user by UUID',
      tags: ['Users'],
      params: {
        type: 'object',
        properties: {
          UUID: { type: 'string' }
        },
        required: ['UUID']
      },
      response: {
        200: {
          description: 'User successfully deleted',
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        },
        400: {
          description: 'Invalid uuid parameter',
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
    handler: deleteUserByUUIDController,
  });
};
