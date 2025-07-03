import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  WorkerBody,
  WorkerBodyUpdate,
  WorkerCreateResponse,
  WorkerDelete,
  WorkerResponse,
  WorkerUpdateResponse,
} from 'interfaces/worker';
import { WorkerModel } from 'models/Worker';
import { formatDate } from 'utils/formater';

@Injectable()
export class WorkerServiceService {
  constructor(@Inject(WorkerModel) private workerModel: typeof WorkerModel) {}
  async getList(): Promise<WorkerResponse> {
    const worker = await this.workerModel
      .query()
      .select('id as workerId', 'name as workerName', 'price');

    return {
      data: worker as any,
    };
  }

  async create(body: WorkerBody): Promise<WorkerCreateResponse> {
    const findWorker = await this.workerModel.query().where('name', body.workerName).first()

    if(findWorker){
      throw new RpcException({
        code: 403,
        message: 'Worker Is Already Exist',
      });
    }

    const worker = await this.workerModel.query().insert({
      name: body.workerName,
      price: body.price,
      created_by: body.user
    });

    return {
      workerId: worker.id as number,
      workerName: worker.name!,
      price: worker.price!,
      createdAt: formatDate(worker.created_at),
    };
  }

  async update(body: WorkerBodyUpdate): Promise<WorkerUpdateResponse> {
    const worker = await this.workerModel.query().findById(body.id);

    if (!worker) {
      throw new RpcException({
        code: 404,
        message: 'Worker Not Found',
      });
    }

    await worker.$query().update({
      name: body.workerName,
      price: body.price,
      created_by: body.user
    });

    return {
      workerId: worker.id as number,
      workerName: worker.name!,
      price: worker.price!,
      createdAt: formatDate(worker.created_at),
      updatedAt: formatDate(worker.updated_at),
    };
  }

  async deleteWorker(body: WorkerDelete) {
    const worker = await this.workerModel.query().findById(body.id);

    if (!worker) {
      throw new RpcException({
        code: 404,
        message: 'Worker Not Found',
      });
    }

    await worker.$query().delete();

    return true;
  }
}
