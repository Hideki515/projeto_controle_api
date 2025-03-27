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

export const getUsers = async () => {

  try {

    const [users] = await db.promise().execute('SELECT UUID, email, admin,created_at FROM users'); // Busca todos os usuários

    return users; // Retorna todos os usuários

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  };

};

export const patchUserByUUID = async (UUID, email, password) => {

  try {
    const saltRounds = 10; // Definição de segurança
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash da senha

    const result = await db.promise().execute('UPDATE users SET email = ?, password = ?  WHERE UUID = ?', [email, hashedPassword, UUID]);

    return result;

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  };

};

export const deleteUserByUUID = async (UUID) => {

  try {

    // Deleta usuário
    await db.promise().execute('DELETE FROM users WHERE UUID = ?', [UUID]);

  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  };

}

export const verifyUUIDExists = async (UUID) => {

  try {

    const result = await db.promise().execute('SELECT UUID FROM users WHERE UUID = ?', [UUID]); // Verifica se UUID existe

    return result; // Retorna resultado da verificação

  } catch (error) {
    console.error('Erro ao verificar UUID:', error);
    throw error;
  }

};

