import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { WORKER_SERVICE_NAME, WorkerServiceClient } from 'interfaces/worker';
import { ClientGrpc } from '@nestjs/microservices';
import { AdminGuard } from 'middleware/guard/Admin.guard';
import { lastValueFrom } from 'rxjs';
import { CreateBodyDto } from './dto/create-body.dto';
import { CamelCaseInterceptor } from 'middleware/interceptors/ConvertCamelCase.interceptor';

@UseInterceptors(CamelCaseInterceptor)
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  private workerService: WorkerServiceClient;
  constructor(@Inject('WORKER_SERVICE') private client: ClientGrpc) {
    this.workerService =
      this.client.getService<WorkerServiceClient>(WORKER_SERVICE_NAME);
  }

  @Get('workers')
  async listWorker() {
    const data = await lastValueFrom(this.workerService.list({}));
    return {
      status: 'success',
      message: 'List Of Workers',
      ...data,
    };
  }

  @Post('workers')
  async create(@Body() body: CreateBodyDto, @Req() req: any) {
    const data = await lastValueFrom(
      this.workerService.create({
        price: +body.price,
        workerName: body.worker_name,
        user: req['user'],
      }),
    );
    return {
      status: 'success',
      message: 'New Worker Created!',
      data,
    };
  }

  @Put('workers/:id')
  async update(
    @Body() body: CreateBodyDto,
    @Req() req: any,
    @Param('id') id: number,
  ) {
    const data = await lastValueFrom(
      this.workerService.update({
        price: +body.price,
        workerName: body.worker_name,
        user: req['user'],
        id,
      }),
    );
    return {
      status: 'success',
      message: `Worker With ID ${id} Updated!`,
      data,
    };
  }

  @Delete('workers/:id')
  async destroy(@Req() req: any, @Param('id') id: number) {
    await lastValueFrom(
      this.workerService.delete({
        user: req['user'],
        id,
      }),
    );
    return {
      status: 'success',
      message: `Worker With ID ${id} Deleted!`,
    };
  }
}
