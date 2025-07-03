import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import Authorization from 'middleware/exceptions/Authorization.exception';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Authorization();
    }

    const token = authorization.replaceAll('Bearer ', '');

    const jwtService = new JwtService();
    let verify: any;
    try {
      verify = await jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new Authorization();
    }

    if (!token) {
      throw new Authorization();
    }

    if(verify?.role !== 'admin'){
      throw new Authorization("Forbidden Only Admin");
    }

    req['user'] = verify;
    return true;
  }
}
