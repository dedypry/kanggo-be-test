import 'dotenv/config'
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'order',
          protoPath: `${process.env.PROTO_FILE}/order.proto`,
          url: `order:${process.env.ORDER_SERVICE}`,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
