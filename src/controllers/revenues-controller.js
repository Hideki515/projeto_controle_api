import { createRevenue } from '../models/revenues-model.js'

// Controlador para criar uma nova receita
export const postRevenueController = async (request, reply) => {

  try {

    const { description, date, value, account, authToken } = request.body;

    // Verificação de campos obrigatórios
    if (!description || !date || !value || !account || !authToken) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    // Criação da nova receita
    const newRevenue = await createRevenue(description, date, value, account, authToken);

    return reply.status(201).send(newRevenue);

  } catch (error) {
    console.error('postRevenueController', error);
    return reply.status(500).send({ error: 'Internal server error', details: error.message });
  }

};