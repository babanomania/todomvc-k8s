import Joi from 'joi';

export interface ITodoCreateDto {
  content: string;
  completed: boolean;
}

export const todoCreateSchema = Joi.object({
  content: Joi.string().required(),
  completed: Joi.boolean().required()
});
