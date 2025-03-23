import db from '../database/db.js';

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
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  username: { type: 'string' }
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
    handler: async (request, reply) => {
      try {
        const [users] = await db.promise().execute('SELECT id, name, username FROM users');

        return reply.status(200).send({ users });
      } catch (error) {
        reply.status(500).send({ error: 'Internal server error', details: error.message });
      }
    }
  })

}