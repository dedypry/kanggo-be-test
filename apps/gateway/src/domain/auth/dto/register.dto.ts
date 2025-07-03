import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
export class RegisterDto{
    @JoiSchema(Joi.string().required())
    fullname: string;

    @JoiSchema(Joi.string().required())
    cellphone: string;

    @JoiSchema(Joi.string().email().required())
    email: string;
  
    @JoiSchema(Joi.string().required())
    password: string;
  
    @JoiSchema(Joi.string().required())
    role: string;
}