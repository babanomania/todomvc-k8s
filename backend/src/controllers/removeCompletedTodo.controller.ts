import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';

export const removeCompletedTodo = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } });
    const posts = await prisma.todo.findMany();
    reply.status(STANDARD.OK.statusCode).send({ data: posts});

  } catch (e) {
    handleServerError(reply, e);
  }
};
