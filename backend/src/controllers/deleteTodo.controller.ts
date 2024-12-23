import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';

export const deleteTodo = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const post = await prisma.todo.findUnique({ where: { id: parseInt(id.toString()) } });
    await prisma.todo.delete({ where: { id: parseInt(id.toString()) } });

    reply.status(STANDARD.OK.statusCode).send({ data: post });

  } catch (e) {
    handleServerError(reply, e);
  }
};
