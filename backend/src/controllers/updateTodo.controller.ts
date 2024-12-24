import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';

export const updateTodo = async (
  request: FastifyRequest<{ Params: { id: number }, Body: { content: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { content } = request.body;

    const post = await prisma.todo.findUnique({ where: { id: parseInt(id.toString()) } });
    post.content = content;
    
    await prisma.todo.update({ where: { id: parseInt(id.toString()) }, data: post });
    reply.status(STANDARD.OK.statusCode).send({ data: post });

  } catch (e) {
    handleServerError(reply, e);
  }
};
