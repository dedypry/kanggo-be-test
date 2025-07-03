import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth_service.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  LoginBody,
  loginResponse,
  RegisterBody,
  RegisterResponse,
} from 'interfaces/auth';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'register')
  async register(body: RegisterBody): Promise<RegisterResponse> {
    const result = await this.authServiceService.register(body);
    return result;
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'login')
  async login(body: LoginBody): Promise<loginResponse> {
    const result = await this.authServiceService.login(body);
    return result;
  }
}
