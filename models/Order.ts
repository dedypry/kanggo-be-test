import { BaseModel } from './BaseModel';

export class OrderModel extends BaseModel {
  workers?: number[] | any;
  start_date?: string;
  end_date?: string;
  status?: string;
  user_id?: number;
  total_day?: number;
  total_price?: number;

  static get tableName() {
    return 'orders';
  }
}
