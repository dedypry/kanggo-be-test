/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { WorkerServiceModule } from './worker_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'worker',
        protoPath: `${process.env.PROTO_FILE}/worker.proto`,
        url: `0.0.0.0:${process.env.WORKER_SERVICE}`,
      },
    },
  );
  await app.listen();
}
bootstrap();
