import db from '../database/db.js';

export const patchUsersByIdRoute = async (app) => {

  app.route({
    method: 'PATCH',
    url: '/api/v1/users/:id/',
    schema: {
      summary: 'Update user by ID',
      tags: ['Users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['name', 'email', 'password']
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
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
    handler: async (request, reply) => {
      try {

        const { id } = request.params;
        const { name, email, password } = request.body;

        // Validação extra para evitar erro de tipo
        if (!id || Number.isNaN(id)) {
          return reply.status(400).send({ error: 'ID inválido' });
        }

        const [result] = await db.promise().execute('UPDATE users SET name = ?, username = ?, senha = ? WHERE id = ?', [name, email, password, id]);

        if (result.affectedRows === 0) {
          return reply.status(404).send({ error: 'User not found' });
        }

        return reply.status(200).send({ id, name, email });

      } catch (error) {
        console.log(error);
        reply.status(500).send({ error: 'Internal server error', details: error.message });
      }
    },
  });
};