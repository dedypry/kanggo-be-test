import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { convertKeysToSnakeCase } from 'utils/formater';
@Injectable()
export class CamelCaseInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return convertKeysToSnakeCase(data);
      }),
    );
  }
}
