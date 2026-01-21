import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { LogoutService } from './logout.service';
import type { Response } from 'express';

@Controller('auth')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
