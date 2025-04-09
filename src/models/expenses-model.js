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

export const updateExpenses = async (id, description, date, value, category, account) => {
  try {

    await db.promise().query(
      'UPDATE expenses SET description = ?, date = ?, value = ?, category = ?, account = ? WHERE id = ?',
      [description, date, value, category, account, id]
    );

    return { id, description, date, value, category, account };

  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }

}

export const deleteExpense = async (id) => {

  try {

    await db.promise().query(
      'DELETE FROM expenses WHERE id = ?',
      [id]
    );

    return { message: 'Expense deleted successfully' };

  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }

};