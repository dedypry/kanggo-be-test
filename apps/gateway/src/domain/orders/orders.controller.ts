import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, OrderServiceClient } from 'interfaces/order';
import { convertKeysToCamelCase } from 'utils/formater';
import { AuthGuard } from 'middleware/guard/Auth.guard';
import { lastValueFrom } from 'rxjs';
import { UpdateOrderDto } from './dto/update-order.dto';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  private readonly orderService: OrderServiceClient;
  constructor(@Inject('ORDER_SERVICE') private client: ClientGrpc) {
    this.orderService =
      this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
  }

  @Get()
  async list(@Req() req: any) {
    console.log(req['user']['userId']);
    const { orders } = await lastValueFrom(
      this.orderService.list({
        id: req['user']['userId'],
      }),
    );
    return {
      status: 'success',
      message: 'List Order',
      data: orders || [],
    };
  }

  @Post()
  async create(@Body() body: CreateOrderDto, @Req() req: any) {
    const payload = convertKeysToCamelCase(body) as any;
    const data = await lastValueFrom(
      this.orderService.createOrder({
        ...payload,
        userId: req['user']['userId'],
      }),
    );

    return {
      status: 'success',
      message: 'Order Created',
      data,
    };
  }

  @Put(':id')
  async cancelOrder(
    @Param('id') id: number,
    @Body() body: UpdateOrderDto,
    @Req() req: any,
  ) {
    const data = await lastValueFrom(
      this.orderService.cancelOrder({
        status: body.status,
        id,
        userId: req['user']['userId'],
      }),
    );

    return {
      status: 'success',
      message: 'Order Canceled',
      data,
    };
  }
}
