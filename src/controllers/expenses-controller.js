import { createExpenses, listExpenses, updateExpenses } from '../models/expenses-model.js';

export const postExpensesController = async (req, resp) => {

  try {

    const { description, date, value, category, account, authToken } = req.body;

    if (!description || !date || !value || !category || !account || !authToken) {
      return resp.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    const newExpenses = await createExpenses(description, date, value, category, account, authToken);

    resp.status(201).send(newExpenses);

  } catch (error) {
    console.error('Error creating expense:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }

};

export const getExpensesController = async (req, resp) => {

  try {

    const { authToken } = req.params;

    const [expenses] = await listExpenses(authToken);

    resp.status(200).send({ expenses });

  } catch (error) {
    console.error('Error listing expenses:', error);
    resp.status(500).send({ error: 'Internal Server Error' });
  }

};

export const updateExpensesController = async (req, reply) => {

  try {

    const { id } = req.params;
    const { description, date, value, category, account } = req.body;

    if (!description || !date || !value || !category || !account) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    const updatedExpense = await updateExpenses(id, description, date, value, category, account);

    reply.status(200).send(updatedExpense);

  } catch (error) {
    console.error('Error updating expense:', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }

};