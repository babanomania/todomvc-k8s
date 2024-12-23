import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { FastifyReply, FastifyRequest } from 'fastify';

export const prisma = new PrismaClient();

export const utils = {
  isJSON: (data: string) => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  },

  getTime: (): number => {
    return new Date().getTime();
  },


  healthCheck: async (): Promise<void> => {
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (e) {
      throw new Error(`Health check failed: ${e.message}`);
    }
  },

  validateSchema: (schema: Joi.ObjectSchema) => {
    return (data: any) => {
      const { error } = schema.validate(data);
      if (error) {
        throw new Error(error.details[0].message);
      }
    };
  },

  preValidation: (schema: Joi.ObjectSchema) => {
    return (
      request: FastifyRequest,
      reply: FastifyReply,
      done: (err?: Error) => void,
    ) => {
      const { error } = schema.validate(request.body);
      if (error) {
        return done(error);
      }
      done();
    };
  },
};
