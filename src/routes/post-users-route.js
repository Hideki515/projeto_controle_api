import db from '../database/db.js';

export const postUserRoute = async (app) => {
  app.route({
    method: 'POST',
    url: '/api/v1/users',
    schema: {
      summary: 'Create a user',
      tags: ['Users'],
      body: {
        type: 'object',
        required: ['name', 'username', 'senha'],
        properties: {
          name: { type: 'string' },
          username: { type: 'string' },
          senha: { type: 'string' },
        },
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            username: { type: 'string' },
          }
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
        }
      },
    },
    handler: async (request, reply) => {

      try {
        const { name, username, senha } = request.body;

        // Verifica se os valores obrigatórios não estão vazios
        if (!name || !username || !senha) {
          return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
        }

        const [result] = await db.promise().execute(
          'INSERT INTO users (name, username, senha) VALUES (?, ?, ?)',
          [name, username, senha]
        );

        const id = result.insertId;

        return reply.status(201).send({ id, name, username, });
      } catch (error) {
        console.error('postUserRoute', error);
        return reply.status(500).send({ error: 'Internal server error', details: error.message });
      }
    },
  });
};
