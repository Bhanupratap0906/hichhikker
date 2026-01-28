import {
  Controller,
  Get,
  NotFoundException,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/decorators/authguard';
import { CurrentUser } from 'src/common/decorators/currentUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@CurrentUser() userId: string) {
    if (!userId) {
      throw new NotFoundException('Need to be logged in');
    }
    return this.userService.getProfile(userId);
  }
}
