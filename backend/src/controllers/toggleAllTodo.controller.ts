import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';

export const toggleAllTodo = async (
  request: FastifyRequest<{ Body: { completed: boolean } }>,
  reply: FastifyReply
) => {
  try {
    const { completed } = request.body;

    await prisma.todo.updateMany({ data: { completed } });
    const posts = await prisma.todo.findMany();
    reply.status(STANDARD.OK.statusCode).send({ data: posts });

  } catch (e) {
    handleServerError(reply, e);
  }
};
