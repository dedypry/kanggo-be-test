import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
export class UpdateOrderDto {
     @JoiSchema(Joi.string().required().valid('cancel'))
     status: string
}
