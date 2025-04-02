import { createRevenue } from '../models/revenues-model.js';
import { getRevenuesByUUID } from '../models/revenues-model.js';
import { updateRevenue } from '../models/revenues-model.js';
import { deleteRevenu } from '../models/revenues-model.js';

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

export const getRevenusByUUIDController = async (request, reply) => {

  try {

    const { UUID } = request.params;

    if (!UUID) {
      return reply.status(400).send({ error: 'UUID é obrigatório' });
    }

    const revenues = await getRevenuesByUUID(UUID);

    console.log(revenues);

    return reply.status(200).send({ revenues });

  } catch (error) {
    console.error('getRevenusByUUIDController', error);
    return reply.status(500).send({ error: 'Internal server error', details: error.message });
  }

};

export const patchRevenueController = async (request, reply) => {

  try {

    const { id } = request.params;
    const { description, date, value, account, authToken } = request.body;

    if (!id || !description || !date || !value || !account || !authToken) {
      return reply.status(400).send({ error: 'Todos os campos são obrigatórios' });
    }

    const updatedRevenue = await updateRevenue(id, description, date, value, account, authToken);

    return reply.status(200).send(updatedRevenue);

  } catch (error) {
    console.error('patchRevenueController', error);
    return reply.status(500).send({ error: 'Internal server error', details: error.message });
  }

};

export const deleteRevenuController = async (request, reply) => {

  try {

    const { id } = request.params;
    const { authToken } = request.body;

    if (!id || !authToken) {
      return reply.status(400).send({ error: 'ID e token de autenticação são obrigatórios' });
    }

    const result = await deleteRevenu(id, authToken);

    return reply.status(200).send(result);

  } catch (error) {

    console.error('deleteRevenuController', error);
    return reply.status(500).send({ error: 'Internal server error', details: error.message });

  };

};