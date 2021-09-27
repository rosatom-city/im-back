import { Operation } from "express-openapi";

export const GET: Operation = [
  async (req, res, next) => {
    try {
      res.status(200).json({ status: 'OK' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
];
GET.apiDoc = {
  description: 'Возврат статуса API',
  operationId: 'status',
  tags: ['status'],
  responses: {
    default: {
      description: 'Статус работы API',
      schema: {
        properties: {
          status: {
            type: 'string',
            default: 'OK'
          }
        }
      },
    },
  },
};