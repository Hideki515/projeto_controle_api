import db from "../database/db.js";

export const getRevenuesByAccountRoute = async (app) => {

  app.get('/revenues/:account', {
    schema: {
      summary: 'List subscriber revenues by account',
      tags: ['Revenues'],
      params: {
        type: 'object',
        properties: {
          account: { type: 'string' }
        },
        required: ['account']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            revenues: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  descricao: { type: 'string' },
                  data: { type: 'string' },
                  valor: { type: 'string' },
                  conta: { type: 'string' }
                },
              }
            }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'object' }
          }
        }
      }
    }
  }, async (request, reply) => {  // ✅ Handler movido para dentro de app.get()
    try {
      const { account } = request.params;  // ✅ Pegando o valor correto do parâmetro

      const [revenues] = await db.promise().query('SELECT * FROM revenues WHERE conta = ?', [account]); // ✅ Passando um array corretamente

      reply.send({ revenues });
    } catch (err) {
      console.error("Erro na consulta ao banco:", err);
      reply.status(500).send({ error: 'Database query failed', details: err.message });
    }
  });

};
