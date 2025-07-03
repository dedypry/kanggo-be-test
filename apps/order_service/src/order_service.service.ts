import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ListOrder,
  ListOrderResponse,
  OrderBody,
  OrderCancelBody,
  OrderCancelResponse,
  OrderResponse,
  UpdateStatus,
} from 'interfaces/order';
import { OrderModel } from 'models/Order';
import { UserModel } from 'models/User';
import { WorkerModel } from 'models/Worker';
import { formatDate, totalDay } from 'utils/formater';

@Injectable()
export class OrderServiceService {
  constructor(
    @Inject(WorkerModel) private readonly workerModel: typeof WorkerModel,
    @Inject(OrderModel) private readonly orderModel: typeof OrderModel,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async handleActive() {
    await this.orderModel
      .query()
      .where('status', 'paid')
      .whereRaw('start_date::date = CURRENT_DATE')
      .update({
        status: 'active',
      });
  }

  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async handleComplete() {
    await this.orderModel
      .query()
      .whereRaw('end_date::date = CURRENT_DATE')
      .where('status', 'active')
      .update({
        status: 'completed',
      });
  }

  async list(body: ListOrder): Promise<ListOrderResponse> {
    const orders = await this.orderModel
      .query()
      .select(
        'id as orderId',
        'status',
        'start_date as startDate',
        'end_date as endDate',
        'total_day as totalDay',
        'total_price as totalPrice',
        'workers',
      )
      .where('user_id', body.id)
      .orderBy('id', 'desc');

    const result: any[] = [];
    for (const item of orders) {
      const workers = await this.workerModel
        .query()
        .whereIn('id', item.workers)
        .select('id as workerId', 'name as workerName', 'price')
        .orderBy('id', 'desc');

      result.push({
        ...item,
        startDate: formatDate(item.start_date),
        endDate: formatDate(item.end_date),
        workers,
      });
    }

    return {
      orders: result,
    };
  }

  async create(body: OrderBody): Promise<OrderResponse> {
    const day = totalDay(body.startDate, body.endDate);
    let price = 0;

    // Check Worker by Date
    const conflict = await this.orderModel
      .query()
      .whereIn('status', ['paid', 'active'])
      .whereRaw('workers && ?::int[]', [body.workers])
      .andWhere((qb) => {
        qb.where('start_date', '<=', new Date(body.endDate)).andWhere(
          'end_date',
          '>=',
          new Date(body.startDate),
        );
      })
      .first();

    let message = '';
    if (conflict) {
      const worker = await this.workerModel
        .query()
        .whereIn('id', conflict.workers);
      message = `${worker.map((e) => e.name).join(', ')} already has schedule at ${formatDate(conflict.start_date)}`;
    }

    if (message.length > 0) {
      throw new RpcException({
        code: 409,
        message,
      });
    }

    const worker = await this.workerModel.query().whereIn('id', body.workers);
    for (const item of worker) {
      price += item.price! * day;
    }

    const order = await this.orderModel.query().insert({
      workers: body.workers,
      status: 'paid',
      start_date: body.startDate,
      end_date: body.endDate,
      total_day: day,
      total_price: price,
      user_id: body.userId,
    });

    return {
      orderId: order.id as number,
      workers: body.workers,
      createdAt: order.created_at,
      totalDay: order.total_day!,
      totalPrice: order.total_price!,
      status: order.status!,
    };
  }

  async updateStatus(body: UpdateStatus) {
    await this.orderModel
      .query()
      .whereRaw('start_date::date = CURRENT_DATE')
      .update({
        status: body.status,
      });
  }

  async cancel(body: OrderCancelBody): Promise<OrderCancelResponse> {
    const order = await this.orderModel
      .query()
      .where('user_id', body.userId)
      .where('id', body.id)
      .first();

    if (!order) {
      throw new RpcException({
        code: 404,
        message: 'Order Not Found',
      });
    }

    await order.$query().update({
      status: body.status,
    });

    return {
      orderId: order.id as number,
      status: order.status!,
      createdAt: formatDate(order.created_at),
      updatedAt: formatDate(order.updated_at),
    };
  }
}
