import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User]) , JwtModule.register({
      global: true,
      secret: 'shaktiman',
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
