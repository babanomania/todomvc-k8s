import { FastifyInstance } from 'fastify';
import * as controllers from '../controllers';
import { todoCreateSchema } from '../schemas/Todo';
import { utils } from '../utils';

async function todoRouter(fastify: FastifyInstance) {

  fastify.post(
    '/create',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            content: { type: 'string' },
            completed: { type: 'boolean' },
          },
          required: ['content', 'completed'],
        },
      },
      config: {
        description: 'Create a new todo',
      },
      preValidation: utils.preValidation(todoCreateSchema),
    },
    controllers.createTodo,
  );

  fastify.patch(
    '/:id/toggle',
    {
      config: {
        description: 'Toggle a specific todo',
      }
    },
    controllers.toggleTodo,
  );

  fastify.delete(
    '/:id',
    {
      config: {
        description: 'Delete a specific todo',
      }
    },
    controllers.deleteTodo,
  );


  fastify.get(
    '/',
    {
      config: {
        description: 'List all todos',
      }
    },
    controllers.listTodos,
  );


}

export default todoRouter;
