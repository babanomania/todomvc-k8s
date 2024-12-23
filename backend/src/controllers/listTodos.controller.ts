import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';

export const listTodos = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const posts = await prisma.todo.findMany();
    reply.status(STANDARD.OK.statusCode).send({ data: posts });

  } catch (e) {
    handleServerError(reply, e);
  }
};
