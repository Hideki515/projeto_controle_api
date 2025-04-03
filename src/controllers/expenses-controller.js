import { listExpenses } from '../models/expenses-model.js';

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