import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Cookies } from 'src/common/decorators/cookies';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  getProfile(@Cookies('jwt') token: string) {
    return this.userService.getProfile(token);
  }
}
