import bcrypt from 'bcrypt';
import { loginUser } from '../models/login-user-model.js';

export const loginController = async (request, reply) => {

  try {
    // Receber email e senha do corpo da requisição
    const { email, password } = request.body;

    //  Buscar usuário pelo e-mail
    const rows = await loginUser(email);

    // Verificar se o usuário existe
    if (rows.length === 0) {
      return reply.status(404).send({ error: 'Usuário não encontrado' }); // Usuário não existe
    }

    const user = rows[0];

    // Comparar senha digitada com a senha armazenada (hashed)
    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      return reply.status(400).send({ error: 'Bad Request', details: 'Senha incorreta' });
    }

    console.log(user);

    return reply.status(200).send(user);

  } catch (error) {
    return reply.status(500).send({ error: 'Internal server error', details: error.message });
  }

};