/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  WORKER_PACKAGE_NAME,
  WORKER_SERVICE_NAME,
  WorkerBody,
  WorkerBodyUpdate,
  WorkerCreateResponse,
  WorkerDelete,
  WorkerResponse,
  WorkerUpdateResponse,
} from 'interfaces/worker';

interface Worker {
  worker_id: number;
  worker_name: string;
  price: number;
}

interface Response {
  status: string;
  message: string;
  data: Worker[];
}

@Controller()
export class WorkerServiceController {
  constructor(private readonly workerServiceService: WorkerServiceService) {}

  @GrpcMethod(WORKER_SERVICE_NAME, 'list')
  async list(_: any, __: any): Promise<WorkerResponse> {
    const data = await this.workerServiceService.getList();

    return data;
  }

  @GrpcMethod(WORKER_SERVICE_NAME, 'create')
  async create(body: WorkerBody): Promise<WorkerCreateResponse> {
    const data = await this.workerServiceService.create(body);

    return data;
  }

  @GrpcMethod(WORKER_SERVICE_NAME, 'update')
  async update(body: WorkerBodyUpdate): Promise<WorkerUpdateResponse> {
    const data = await this.workerServiceService.update(body);

    return data;
  }

  @GrpcMethod(WORKER_SERVICE_NAME, 'delete')
  async deleteWorker(body: WorkerDelete) {
    const data = await this.workerServiceService.deleteWorker(body);

    return data;
  }
}
