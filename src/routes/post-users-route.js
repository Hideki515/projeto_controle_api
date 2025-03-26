// import { postUserController } from '../controllers/user-controller';
import { postUserController } from '../controllers/user-controller.js';

export const postUserRoute = async (app) => {
  app.route({
    method: 'POST',
    url: '/api/v1/users/',
    schema: {
      summary: 'Create a user',
      tags: ['Users'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            uuid: { type: 'string' },
            email: { type: 'string' },
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
    handler: postUserController,
  });
};
