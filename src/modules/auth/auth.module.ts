import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';

@Module({
  imports:[ LoginModule, SignupModule] , 
  controllers: [],
  providers: [],
})
export class AuthModule {}
