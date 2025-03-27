import { loginController } from '../controllers/login-user-controller.js';

export const loginUserRoute = async (app) => {

  app.route({
    method: 'POST',
    url: '/api/v1/user/login/',
    schema: {
      summary: 'Login an user',
      tags: ['Users'],
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['email', 'password'],
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            UUID: { type: 'string' },
            email: { type: 'string' },
            admin: { type: 'string' },
            created_at: { type: 'string' }
          }
        },
        400: {
          description: 'Bad request',
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'string' },
          }
        },
        404: {
          description: 'Bad request',
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
    handler: loginController,
  });
};