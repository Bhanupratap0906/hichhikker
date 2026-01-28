import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { LogoutModule } from './logout/logout.module';

@Module({
  imports: [LoginModule, SignupModule, LogoutModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
