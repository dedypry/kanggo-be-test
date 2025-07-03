import { Model, ModelOptions, QueryContext } from 'objection';

export class BaseModel extends Model {
  id: string | number;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  $beforeInsert(queryContext: QueryContext): Promise<any> | void {
      this.created_at = new Date().toISOString();
  }

  $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): Promise<any> | void {
    this.updated_at = new Date().toISOString();
  }
}
