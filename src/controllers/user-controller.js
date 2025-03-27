import { createUser } from '../models/user-model.js';
import { getUsers } from '../models/user-model.js';

export const postUserController = async (request, reply) => {
  try {
    const { email, password } = request.body;

    // Verificação de campos obrigatórios
    if (!email || !password) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    // Expressão regular para validar o formato do email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return reply.status(400).send({ error: 'Email inválido' });
    }

    // Criação do novo usuário
    const newUser = await createUser(email, password);
    return reply.status(201).send(newUser);
  } catch (error) {
    console.error('postUserController', error);
    return reply.status(500).send({ error: 'Internal server error', details: error.message });
  }
};

export const getUsersController = async (request, reply) => {
  try {

    const users = await getUsers(); // Busca todos os usuários

    return reply.status(200).send({ users }); // Retorna a lista de usuários

  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error', details: error.message });
  };
};