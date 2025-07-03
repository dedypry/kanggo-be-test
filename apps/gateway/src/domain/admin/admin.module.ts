import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
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
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
