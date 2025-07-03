import { Module } from '@nestjs/common';
import { OrderServiceController } from './order_service.controller';
import { OrderServiceService } from './order_service.service';
import { ObjectionConfigModule } from 'db/configs/objection.config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { OrderModel } from 'models/Order';
import { UserModel } from 'models/User';
import { WorkerModel } from 'models/Worker';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ObjectionConfigModule,
    ObjectionModule.forFeature([OrderModel, WorkerModel]),
    ScheduleModule.forRoot(),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
