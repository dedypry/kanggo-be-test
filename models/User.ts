import { Modifiers, AnyQueryBuilder } from 'objection';
import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel {
  fullname?: string;
  cellphone?: string;
  email?: string;
  role?: string;
  password?: string;

  static get tableName() {
    return 'users';
  }

  static modifiers: Modifiers<AnyQueryBuilder> = {
    list(query) {
      query.select('id as worker_id', 'name as worker_name', 'price');
    },
  };
}
