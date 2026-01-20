import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  getProfile(@Req() request:Request) {
    const token = request.cookies.jwt; 
    return this.userService.getProfile(token);
  }
}
