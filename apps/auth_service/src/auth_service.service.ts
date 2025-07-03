import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import {
  LoginBody,
  loginResponse,
  RegisterBody,
  RegisterResponse,
} from 'interfaces/auth';
import { IErrorGrpc } from 'interfaces/global';
import { UserModel } from 'models/User';
import { UniqueViolationError } from 'objection';
import { comparePassword, hashPassword } from 'utils/bcrypt';

@Injectable()
export class AuthServiceService {
  constructor(
    @Inject(UserModel) private userModel: typeof UserModel,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterBody): Promise<RegisterResponse> {
    body.password = hashPassword(body.password);

    const result = await this.userModel.query().insert(body);
    return {
      userId: result.id as number,
      email: result.email!,
      fullname: result.fullname!,
      createdAt: result.created_at,
    };
  }

  async login(body: LoginBody): Promise<loginResponse> {
    const user = await this.userModel
      .query()
      .where('email', body.emailCellphone)
      .orWhere('cellphone', body.emailCellphone)
      .first();

    if (!user) {
      throw new RpcException({
        code: 404,
        message: 'User not found',
      });
    }

    const isMatch = comparePassword(body.password, user.password!);
    if (!isMatch) {
      throw new RpcException({
        code: 401,
        message: 'Password Not match',
      });
    }

    const payload = {
      userId: user.id as number,
      email: user.email!,
      role: user.role
    };

    const token = this.jwtService.sign(payload);
    return {
      ...payload,
      token,
    };
  }
}
