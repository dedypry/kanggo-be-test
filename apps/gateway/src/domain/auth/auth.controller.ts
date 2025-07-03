import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AUTH_SERVICE_NAME, AuthServiceClient } from 'interfaces/auth';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CamelCaseInterceptor } from 'middleware/interceptors/ConvertCamelCase.interceptor';
import { LoginDto } from './dto/login.dto';

@UseInterceptors(CamelCaseInterceptor)
@Controller()
export class AuthController {
  private readonly authService: AuthServiceClient;
  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const data = await lastValueFrom(this.authService.register(body));

    return {
      status: 'success',
      message: 'Register Success',
      data,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const data = await lastValueFrom(
      this.authService.login({
        emailCellphone: body.email_cellphone,
        password: body.password,
      }),
    );

    return {
      status: 'success',
      message: 'Login Success',
      data,
    };
  }
}
