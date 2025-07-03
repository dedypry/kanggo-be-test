/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Model } from 'objection';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          Model: Model,
          config: {
            client: 'pg',
            connection: {
              host: config.get<string>('POSTGRES_HOST', ''),
              port: config.get<number>('POSTGRES_PORT', 5432),
              database: config.get<string>('POSTGRES_DB', ''),
              user: config.get<string>('POSTGRES_USER', ''),
              password: config.get<string>('POSTGRES_PASSWORD', ''),
            },
            pool: {
              min: 2,
              max: 10,
            },
          },
        };
      },
    }),
  ],
})
export class ObjectionConfigModule {}
