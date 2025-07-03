import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth_service.controller';
import { AuthServiceService } from './auth_service.service';
import { ObjectionConfigModule } from 'db/configs/objection.config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from 'models/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ObjectionConfigModule,
    ObjectionModule.forFeature([UserModel]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
