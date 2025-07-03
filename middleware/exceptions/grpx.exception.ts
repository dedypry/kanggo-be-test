import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { UniqueViolationError } from 'objection';

@Catch()
export class GRPCException implements ExceptionFilter {
  private readonly logger = new Logger(GRPCException.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    this.logger.error('GRPC Error =>', exception);

    if (exception instanceof RpcException) {
      return throwError(() => exception);
    }

    // Handle duplicate key from Objection
    if (exception instanceof UniqueViolationError) {
      return throwError(
        () =>
          new RpcException({
            code: 409,
            message: `${exception.columns.join(', ')} Has Already Exists`,
          }),
      );
    }
    
    return throwError(
      () =>
        new RpcException({
          code: 500,
          message: 'Internal server error',
        }),
    );
  }
}
