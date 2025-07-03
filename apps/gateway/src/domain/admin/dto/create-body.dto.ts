import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class CreateBodyDto {
  @JoiSchema(Joi.string().required())
  worker_name: string;

  @JoiSchema(Joi.number().required())
  price: string;
}
