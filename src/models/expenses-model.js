import db from '../database/db.js';

export const createExpenses = async (description, date, value, category, account, authToken) => {

  try {

    const [result] = await db.promise().query(
      'INSERT INTO expenses (description, date, value, category, account, tokenUser) VALUES (?, ?, ?, ?, ?, ?)',
      [description, date, value, category, account, authToken]
    );

    return { id: result.insertId, description, date, value, account, category, authToken };

  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }

};

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