import db from '../database/db.js';

export const createRevenue = async (description, date, value, account, authToken) => {

  try {
    const [result] = await db.promise().execute(
      'INSERT INTO revenues (description, date, value, account, tokenUser) VALUES (?, ?, ?, ?, ?)',
      [description, date, value, account, authToken]
    );
    return { id: result.insertId, description, date, value, account, authToken };
  } catch (error) {
    console.error('Erro ao criar receita:', error);
    throw error;
  };

};

export const getRevenuesByUUID = async (authToken) => {

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM revenues WHERE tokenUser = ?',
      [authToken]
    );

    return rows;

  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    throw error;
  };

}