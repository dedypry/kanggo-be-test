/* eslint-disable @typescript-eslint/no-floating-promises */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandlerException } from 'middleware/exceptions/handler.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalFilters(new HandlerException(app.get(HttpAdapterHost)))
  await app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
