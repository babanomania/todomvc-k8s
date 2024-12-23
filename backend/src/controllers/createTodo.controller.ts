import { FastifyReply, FastifyRequest } from 'fastify';
import { handleServerError } from '../helpers/errors.helper';
import { prisma } from '../utils';
import { STANDARD } from '../constants/request';
import { ITodoCreateDto } from '../schemas/Todo';

export const createTodo = async (
  request: FastifyRequest<{
    Body: ITodoCreateDto;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { content, completed } = request.body;
    const post = await prisma.todo.create({
      data: {
        content,
        completed
      },
    });
    
    reply.status(STANDARD.OK.statusCode).send({ data: post });

  } catch (e) {
    handleServerError(reply, e);
  }
};
