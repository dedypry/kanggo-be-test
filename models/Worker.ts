import { Modifiers, AnyQueryBuilder } from 'objection';
import { BaseModel } from './BaseModel';

export class WorkerModel extends BaseModel {
  name?: string;
  price?: number;
  created_by?: object;

  static get tableName() {
    return 'workers';
  }

  static modifiers: Modifiers<AnyQueryBuilder> = {
    list(query) {
      query.select('id as worker_id', 'name as worker_name', 'price');
    },
  };
}
