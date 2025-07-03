import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
export class LoginDto {
  @JoiSchema(Joi.string().required())
  email_cellphone: string;

  @JoiSchema(Joi.string().required())
  password: string;
}