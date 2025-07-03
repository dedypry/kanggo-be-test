/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { WORKER_SERVICE_NAME, WorkerServiceClient } from 'interfaces/worker';
import { CamelCaseInterceptor } from 'middleware/interceptors/ConvertCamelCase.interceptor';
import { lastValueFrom } from 'rxjs';

@UseInterceptors(CamelCaseInterceptor)
@Controller('workers')
export class WorkerController {
  private workerService: WorkerServiceClient;
  constructor(@Inject('WORKER_SERVICE') private client: ClientGrpc) {
    this.workerService =
      this.client.getService<WorkerServiceClient>(WORKER_SERVICE_NAME);
  }

  @Get()
  async getList() {
    const data = await lastValueFrom(this.workerService.list({}));
    return {
      status: 'success',
      message: 'List Of Workers',
      ...data,
    };
  }
}
