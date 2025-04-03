import db from '../database/db.js';

export const listExpenses = async (authToken) => {

  try {

    const expenses = await db.promise().query(
      'SELECT * FROM expenses WHERE tokenUser = ?',
      [authToken]
    );

    return expenses;

  } catch (error) {
    console.error('Error listing expenses:', error);
    throw error;
  }

};