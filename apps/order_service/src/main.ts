import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order_service.module';
import { Transport } from '@nestjs/microservices';
import { GRPCException } from 'middleware/exceptions/grpx.exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: `${process.env.PROTO_FILE}/order.proto`,
      url: `0.0.0.0:${process.env.ORDER_SERVICE}`,
    },
  });
  await app.useGlobalFilters(new GRPCException())
  await app.listen();
}
bootstrap();
