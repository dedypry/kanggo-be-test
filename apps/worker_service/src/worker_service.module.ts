import { Module } from '@nestjs/common';
import { WorkerServiceController } from './worker_service.controller';
import { WorkerServiceService } from './worker_service.service';
import { ObjectionConfigModule } from 'db/configs/objection.config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { WorkerModel } from 'models/Worker';

@Module({
  imports: [ObjectionConfigModule, ObjectionModule.forFeature([WorkerModel])],
  controllers: [WorkerServiceController],
  providers: [WorkerServiceService],
})
export class WorkerServiceModule {}
