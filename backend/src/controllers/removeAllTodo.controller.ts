import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';

export const removeAllTodo = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await prisma.todo.deleteMany();
    reply.status(STANDARD.OK.statusCode).send({ data: [] });

  } catch (e) {
    handleServerError(reply, e);
  }
};
