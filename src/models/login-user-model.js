import db from '../database/db.js';

export const loginUser = async (email, password) => {
  try {
    // Buscar usuário pelo e-mail
    const [rows] = await db.promise().execute(
      'SELECT UUID, email, admin, password, created_at FROM users WHERE email = ?',
      [email]
    );

    // Retornar dados do usuário (sem expor a senha)
    return rows;

  } catch (error) {
    console.error('Erro no login:', error.message);
    throw error;
  }
};
