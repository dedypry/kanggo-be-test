import 'dotenv/config';
import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'worker',
          protoPath: `${process.env.PROTO_FILE}/worker.proto`,
          url: `workers:${process.env.WORKER_SERVICE}`,
        },
      },
    ]),
  ],
  controllers: [WorkerController],
  providers: [],
})
export class WorkerModule {}
