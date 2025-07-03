/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { JoiPipeValidationException } from 'nestjs-joi';
import { UniqueViolationError } from 'objection';

@Catch()
export class HandlerException implements ExceptionFilter {
  constructor(private readonly httpAdapter: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapter;
    const ctx = host.switchToHttp();
    // const req = ctx.getRequest();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resBody = {
      status: 'failed',
      message: exception.msg || 'Internal Server Error',
    };

    const statusCode = (exception as any).code;
    const detail = (exception as any).details;

    if (statusCode < 400) {
      httpStatus = 500;
    }

    if (detail) {
      resBody.message = detail;
    }

    if (exception.type) {
      resBody['type'] = exception.type;
    }

    if (exception.data) {
      resBody['data'] = exception.data;
    }

    if (exception instanceof JoiPipeValidationException) {
      httpStatus = 400;
      resBody['type'] = 'validation';

      resBody.message = exception.joiValidationError.details.map((e) => {
        const key = e.context && typeof e.context.key === 'string' ? e.context.key : 'unknown';
        return {
          [key]: e.message.replaceAll('"', ''),
        };
      });
    }

    if (exception instanceof BadRequestException) {
      const { message, statusCode }: any = exception.getResponse();
      resBody.message = message;
      resBody.status = statusCode;
    }

    if (exception instanceof UniqueViolationError) {
      httpStatus = 409;
      resBody.message = `${exception.columns} Has Already Exists`;
    }

    if (exception instanceof NotFoundException) {
      resBody.message = exception.message;
    }

    if (exception.code == 13) {
      httpStatus = HttpStatus.SERVICE_UNAVAILABLE;
      resBody.status = 'UNAVAILABLE';
      resBody.message = 'Service Offline';
    }

    if (exception instanceof BadRequestException) {
      httpStatus = HttpStatus.BAD_REQUEST;
      resBody.status = 'BAD_REQUEST';
      resBody.message = 'BAD REQUEST';
    }

    console.error('EXCEPTION => ', exception);

    httpAdapter.reply(ctx.getResponse(), resBody, httpStatus);
  }
}
