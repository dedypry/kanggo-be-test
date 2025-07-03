import { Controller, Get } from '@nestjs/common';
import { OrderServiceService } from './order_service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ListOrder, ORDER_SERVICE_NAME, OrderBody, OrderCancelBody, OrderResponse, UpdateStatus } from 'interfaces/order';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @GrpcMethod(ORDER_SERVICE_NAME, 'list')
  list(body: ListOrder) {
    return this.orderServiceService.list(body);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  createOrder(body: OrderBody) {
    return this.orderServiceService.create(body);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'CancelOrder')
  cancelOrder(body: OrderCancelBody) {
    return this.orderServiceService.cancel(body);
  }

  @GrpcMethod(ORDER_SERVICE_NAME, 'Status')
  updateStatus(body: UpdateStatus) {
    return this.orderServiceService.updateStatus(body);
  }
}
