import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './domain/worker/worker.module';
import { AuthModule } from './domain/auth/auth.module';
import { JoiPipeModule } from 'nestjs-joi';
import { OrdersModule } from './domain/orders/orders.module';
import { AdminModule } from './domain/admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    JoiPipeModule.forRoot({
      pipeOpts: {
        usePipeValidationException: true,
      },
    }),
    ScheduleModule.forRoot(),
    WorkerModule,
    AuthModule,
    OrdersModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
