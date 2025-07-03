import { HttpException, HttpStatus } from '@nestjs/common';

export default class Authorization extends HttpException {
  msg: string;

  constructor(message = 'UNAUTHORIZED', status = HttpStatus.UNAUTHORIZED) {
    super(message, status);

    this.msg = message;
  }
}
