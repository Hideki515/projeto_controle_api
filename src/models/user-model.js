import db from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const createUser = async (email, password) => {
  try {
    const uuid = uuidv4(); // Gerando UUID
    const saltRounds = 10; // Definição de segurança
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash da senha

    const [result] = await db.promise().execute(
      'INSERT INTO users (uuid, email, password) VALUES (?, ?, ?)',
      [uuid, email, hashedPassword]
    );

    return { uuid, email }; // Retorna ID e email (sem expor senha)
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};
