import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LoginService } from './login.service';
import { LoginDto } from 'src/common/dtos/auth.dto.ts/login.request.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  async login(@Body() data: LoginDto, @Res({ passthrough: true }) response: Response) {
    const token = await this.loginService.login(data);
    response.cookie('jwt', token);
    return 'logged in successfully';
  }
}
