import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth_service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GRPCException } from 'middleware/exceptions/grpx.exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: `${process.env.PROTO_FILE}/auth.proto`,
        url: `0.0.0.0:${process.env.AUTH_SERVICE}`,
      },
    },
  );
  await app.useGlobalFilters(new GRPCException())
  await app.listen();
}
bootstrap();
