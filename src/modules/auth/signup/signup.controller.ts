import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from 'src/common/dtos/auth.dto.ts/signUp.request.dto';

@Controller('auth')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post('signUp')
  async signUp(@Body() data:SignupDto){
    return this.signupService.signup(data)
  }
}
