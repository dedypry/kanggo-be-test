/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  welcome(@Res() res: Response){
    return res.redirect('https://kanggo.dedypry.id/');
  }
}
